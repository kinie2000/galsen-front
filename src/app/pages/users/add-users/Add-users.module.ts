import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddUsersComponent } from './add-users.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';

export const routes: Routes = [
  { path: '', component: AddUsersComponent, pathMatch: 'full'  }
];

@NgModule({
  declarations: [AddUsersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,

  ]
})
export class AddUserModule { }
