import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './Components/main/main.component';
import { ViewElementComponent } from './Components/view-element/view-element.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'element/:id', component: ViewElementComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
