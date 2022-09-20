import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'; 
import { SharedModule } from '../../shared/shared.module';
import { VerificationCompteComponent } from './verification-compte/verification-compte.component';

import { PermisComponent } from './permis/permis.component';
import { PermisValideComponent } from './permis-valide/permis-valide.component';


import { CoordonneesComponent } from './coordonnees/coordonnees.component';
import { CoordonneesValideComponent } from './coordonnees-valide/coordonnees-valide.component';
import { PreferenceComponent } from './preference/preference.component';
import { PreferenceValideComponent } from './preference-valide/preference-valide.component';
import { EmailChangeComponent } from './change-email/change-email.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { NumeroTelephoneComponent } from './numero-telephone/numero-telephone.component';
import { CodeValidationNumeroTelephoneComponent } from './code-validation-numero-telephone/code-validation-numero-telephone.component';
import { CategoryDialogComponent } from './categories/category-dialog/category-dialog.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';



export const routes: Routes = [ 
  { path: '', redirectTo: 'list', pathMatch: 'full'},
  { path: 'verification-compte', component: VerificationCompteComponent, data: { breadcrumb: 'Verification' }},
  { path: 'mes-coodonnees', component: CoordonneesComponent, data: { breadcrumb: 'Coordonnées' }},
  { path: 'mes-coodonnees-valide', component: CoordonneesValideComponent, data: { breadcrumb: 'Coordonnées valide' }},
  { path: 'mes-parametres', component: PreferenceComponent, data: { breadcrumb: 'Mes Paramètres' }},
  { path: 'mes-parametres-valide', component: PreferenceValideComponent, data: { breadcrumb: 'Mes Paramètres valide' }},
  { path: 'change-email', component: EmailChangeComponent, data: { breadcrumb: 'Changer mon Email' }},
  { path: 'changer-password', component: PasswordChangeComponent, data: { breadcrumb: 'Changer password' }},
  
  { path: 'permis', component: PermisComponent, data: { breadcrumb: 'Identification' }},
  { path: 'permis-valide', component: PermisValideComponent, data: { breadcrumb: 'Identification Valide' }},
 

  { path: 'numero-telephone', component: NumeroTelephoneComponent, data: { breadcrumb: 'Numero de Téléphone' }},
  { path: 'code-validation-numero-telephone', component: CodeValidationNumeroTelephoneComponent, data: { breadcrumb: 'code Validation Numero de Téléphone' }},

];

@NgModule({
  declarations: [
    VerificationCompteComponent,
    CoordonneesComponent,
    CoordonneesValideComponent,
    PasswordChangeComponent,
    PermisComponent,
    PermisValideComponent,

    EmailChangeComponent,
    PreferenceComponent,
    PreferenceValideComponent,
    NumeroTelephoneComponent,
    CodeValidationNumeroTelephoneComponent,
    CategoryDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ToastrModule.forRoot(),
    SharedModule,
  ],
})
export class MenuItemsModule {}