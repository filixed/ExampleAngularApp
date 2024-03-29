import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { first } from 'rxjs';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent{
  elementFrom: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private crudService: CrudService,
    private _dialogRef: MatDialogRef<AddFormComponent>) {
    this.elementFrom = this.formBuilder.group({
      name: '',
      weight: '',
      symbol: '',
      atomicNumber: '',
      imgHref: ""
    });
    //public crudService: CrudService
  }
  
 async OnFormSubbmission() {
    if(this.elementFrom.valid){
      const value = (await this.crudService.addElement(this.elementFrom.value)).pipe(first()).subscribe({
        next: (value: any) => {
          this._dialogRef.close(true);
        },
        error: (error) => {
          console.error(error)
        }
      })    
    }
  }  
}
