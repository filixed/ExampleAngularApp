import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PeriodicElement } from 'src/app/Model/periodicElement';
import { CrudService } from 'src/app/services/crud.service'
import { MatDialog } from '@angular/material/dialog';
import { AddFormComponent } from '../add-form/add-form.component';
import { DeleteElementCommand } from 'src/app/Model/DeleteElementCommand';
import { UpdateFormComponent } from '../update-form/update-form.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {
  constructor(private CrudService: CrudService, private ref: ChangeDetectorRef, private _dialog: MatDialog) { }

  ELEMENT_DATA: PeriodicElement[] = [];

  ngOnInit(): void {
    this.getElements();
  }

  get getTableData (){
    return this.ELEMENT_DATA
  }

  getElements(){
    this.CrudService.getElements()
    .subscribe(data => {
      console.log(data);
      this.ELEMENT_DATA = []
      data.forEach( (elementData) => {
        var element: PeriodicElement = {
          id: elementData.id,
          name: elementData.name,
          atomicNumber: elementData.atomicNumber,
          symbol: elementData.symbol,
          weight: elementData.weight,
          imgHref: elementData.imgHref
        }         
        this.ELEMENT_DATA.push(element)
      })
    })
  }

  openAddElementForm(){
    const dialogRef = this._dialog.open(AddFormComponent);
    dialogRef.afterClosed().subscribe({
      next: (value) => {
        if(value){
          this.getElements();
        }
      }
    })
  }

  openUpdateElementForm(element: PeriodicElement){
    const dialogRef = this._dialog.open(UpdateFormComponent, {
      data: element
    });
    dialogRef.afterClosed().subscribe({
      next: (value) => {
        if(value){
          this.getElements();
        }
      }
    })
  }

  deleteElement(id: number){
    console.log(id);
    const elementIdToDelete : DeleteElementCommand = {
      id: id
    }
    this.CrudService.deleteElement(elementIdToDelete).subscribe({
      next: (res) => {
        if(res){
          this.getElements();
        }
      },
      error: console.log
    })
  }

  displayedColumns: string[] = ['atomicNumber', 'symbol', 'name', 'weight','details' , 'actions'];
  
  dataSource = this.ELEMENT_DATA;
}
