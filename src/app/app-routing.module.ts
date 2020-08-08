import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentsComponent } from './students/students.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'Home', component: HomeComponent },
  { path: 'Students', component: StudentsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
