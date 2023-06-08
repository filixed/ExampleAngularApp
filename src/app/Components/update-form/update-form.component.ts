import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { first } from 'rxjs';
import { elementDto } from 'src/app/Model/elementDto';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.css']
})
export class UpdateFormComponent implements OnInit {
  elementFrom: FormGroup;
  elementData: elementDto = {}

  constructor(
    private formBuilder: FormBuilder, 
    private crudService: CrudService,
    private _dialogRef: MatDialogRef<UpdateFormComponent>,
    @Inject(MAT_DIALOG_DATA) public  data: any) {
      this.elementFrom = this.formBuilder.group({
        name: '',
        weight: '',
        symbol: '',
        atomicNumber: '',
        imgHref: ""
      })
  }

  ngOnInit(): void {
    this.elementData.id = this.data.id
    this.elementFrom.patchValue(this.data)
    console.log(this.elementFrom.value)
  }
  
  async OnFormSubbmission() {
    if(this.elementFrom.valid){
      this.uppdateElementDto()
      const value = (await this.crudService.updateElement(this.elementData)).pipe(first()).subscribe({
        next: (value: any) => {
          this._dialogRef.close(true);
        },
        error: (error) => {
          console.error(error)
        }
      })
    }    
  }

  uppdateElementDto(){
    const elementDto : elementDto = this.elementFrom.value;
    this.elementData.atomicNumber = elementDto.atomicNumber
    this.elementData.name = elementDto.name
    this.elementData.symbol = elementDto.symbol
    this.elementData.weight = elementDto.weight
    this.elementData.imgHref  = elementDto.imgHref
  }

  getData(){
    return this.elementData
  }
}
