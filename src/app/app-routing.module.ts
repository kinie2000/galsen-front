import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

import { PagesComponent } from "./pages/pages.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { LockScreenComponent } from "./pages/lock-screen/lock-screen.component";
import { TestradiogroupComponent } from "./pages/testradiogroup/testradiogroup.component";

const routes: Routes = [
  { 
    path: '', 
    component: PagesComponent, children: [
        //{ path: '', redirectTo: '/landing', pathMatch: 'full' },
        { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
        { path: 'about', loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule) },
        { path: 'contact', loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule) },
        { path: 'vehicules-disponibles', loadChildren: () => import('./pages/menu/menu.module').then(m => m.MenuModule) },
        { path: 'chefs', loadChildren: () => import('./pages/chefs/chefs.module').then(m => m.ChefsModule) },
        { path: 'reservation', loadChildren: () => import('./pages/reservation/reservation.module').then(m => m.ReservationModule) },
        { path: 'account', loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule) },
        { path: 'cart', loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartModule) },
        { path: 'checkout', loadChildren: () => import('./pages/checkout/checkout.module').then(m => m.CheckoutModule) },
        { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
        { path: 'reset', loadChildren: () => import('./pages/login/reset-password/reset-password.module').then(m => m.ResetPasswordModule) },
        { path: 'newpass', loadChildren: () => import('./pages/login/newpassword/newpassword.module').then(m => m.NewpasswordModule) },
	      { path: 'verif', loadChildren: () => import('./pages/login/verifcode/verifcode.module').then(m => m.VerifdModule) },
        { path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule) },

        { path: 'create-utilisateurs', loadChildren: () => import('./pages/create-utilisateurs/create-utilisateurs.module').then(m => m.CreateUtilisateursModule) },
        { path: 'social-login', loadChildren: () => import('./pages/social-login-google/social-login-google.module').then(m => m.LoginSocialGoogleModule) },
       // { path: 'login-google', loadChildren: () => import('./pages/login-google/login-google.module').then(m => m.LoginGoogleModule) },
       // { path: 'login-facebook', loadChildren: () => import('./pages/login-facebook/login-facebook.module').then(m => m.LoginFacebookModule) },




        { path: 'registerPro', loadChildren: () => import('./pages/registerPro/registerPro.module').then(m => m.RegisterProModule) },
        { path: 'faq', loadChildren: () => import('./pages/faq/faq.module').then(m => m.FaqModule) },
        { path: 'terms-conditions', loadChildren: () => import('./pages/terms-conditions/terms-conditions.module').then(m => m.TermsConditionsModule) },
        { path: 'search-car', loadChildren: () => import('./pages/search-car/search-car.module').then(m => m.SearchCarModule) },

    ],
  },
  { path: 'landing', loadChildren: () => import('./pages/landing/landing.module').then(m => m.LandingModule) },
  { path: 'radioTest', component:TestradiogroupComponent },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'compte-utilisateur', loadChildren: () => import('./compte-utilisateur/compte-utilisateur.module').then(m => m.CompteUtilisateurModule) },
  { path: 'lock-screen', component: LockScreenComponent },
  { path: '**', component: NotFoundComponent } 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules, // <- comment this line for activate lazy load
      initialNavigation: "enabledBlocking", // for one load page, without reload
      relativeLinkResolution: "legacy",
      // useHash: true
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
