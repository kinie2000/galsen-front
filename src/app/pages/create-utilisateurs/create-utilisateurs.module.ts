import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CreateUtilisateursComponent } from './create-utilisateurs.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
export const routes: Routes = [
  { path: '', component: CreateUtilisateursComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [CreateUtilisateursComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    // SocialLoginModule,
    ToastrModule.forRoot(),
  ]
})
export class CreateUtilisateursModule { }
