import { Component, OnInit } from '@angular/core';
import { PeriodicElement } from 'src/app/Model/periodicElement';
import { CrudService } from 'src/app/services/crud.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-element',
  templateUrl: './view-element.component.html',
  styleUrls: ['./view-element.component.css']
})
export class ViewElementComponent implements OnInit {
  constructor(private CrudService: CrudService, private route: ActivatedRoute) { }

  ELEMENT_DATA: PeriodicElement = {}
  elementId: number = 0;


  ngOnInit(): void {
    this.route.paramMap.subscribe(x =>
      this.elementId = Number(x.get('id')))
    this.getElement();
  }

  get getTableData() {
    return this.ELEMENT_DATA
  }

  getElement() {
    this.CrudService.getElement(this.elementId)
      .subscribe(elementData => {
        console.log(elementData);
        var element: PeriodicElement = {
          id: elementData.id,
          name: elementData.name,
          atomicNumber: elementData.atomicNumber,
          symbol: elementData.symbol,
          weight: elementData.weight,
          imgHref: elementData.imgHref
        }
        this.ELEMENT_DATA = element
      })
  }

  getData(){
    return this.ELEMENT_DATA
  }
}

