import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {HttpClient,HttpClientModule,HTTP_INTERCEPTORS,} from "@angular/common/http";
import { DatePipe } from "@angular/common";

import { NgProgressModule } from "ngx-progressbar";
import { NgProgressHttpModule } from "ngx-progressbar/http";
import { AgmCoreModule } from "@agm/core";

import { environment } from "src/environments/environment";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(
    httpClient,environment.url + "/assets/i18n/",".json");
}
import { MatPaginatorIntl } from "@angular/material/paginator";
import { MatPaginatorI18nService } from "./theme/utils/mat-paginator-i18n.service";

import { OverlayContainer } from "@angular/cdk/overlay";
import { CustomOverlayContainer } from "./theme/utils/custom-overlay-container";
import { AppInterceptor } from "./theme/utils/app-interceptor";

import { AppRoutingModule } from "./app-routing.module";
import { SharedModule } from "./shared/shared.module";

import { AppComponent } from "./app.component";
import { AppSettings } from "./app.settings";

import { PagesComponent } from "./pages/pages.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { Toolbar1Component } from "./theme/components/toolbar1/toolbar1.component";
import { UserMenuComponent } from "./theme/components/user-menu/user-menu.component";
import { ContactsComponent } from "./theme/components/contacts/contacts.component";
import { HorizontalMenuComponent } from "./theme/components/menu/horizontal-menu/horizontal-menu.component";
import { VerticalMenuComponent } from "./theme/components/menu/vertical-menu/vertical-menu.component";
import { FooterComponent } from "./theme/components/footer/footer.component";
import { LockScreenComponent } from "./pages/lock-screen/lock-screen.component";
// import { ChatComponent } from "./chat/chat.component";
//import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";
import {
  FacebookLoginProvider,
  SocialLoginModule,
  SocialAuthServiceConfig,
  GoogleLoginProvider,
} from "angularx-social-login";
import { SocialAuthService } from "angularx-social-login";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { ToastrModule } from "ngx-toastr";
import { MaterialModule } from "./material/material.module";
import { TestradiogroupComponent } from "./pages/testradiogroup/testradiogroup.component";

@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    NotFoundComponent,
    UserMenuComponent,
    ContactsComponent,
    Toolbar1Component,
    HorizontalMenuComponent,
    VerticalMenuComponent,
    FooterComponent,
    LockScreenComponent,
    TestradiogroupComponent
    // ChatComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }), 
    BrowserAnimationsModule,
    HttpClientModule, 
    SocialLoginModule,
    NgProgressModule,
    PerfectScrollbarModule,
    MatDialogModule,
    MaterialModule,
  	MatSlideToggleModule,
    ToastrModule.forRoot(),
    MatFormFieldModule,
    NgProgressHttpModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyB76qIj0I7XKmrBsU4Z16DLVXy7Neh-dFQ",
      libraries: ["places"],
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    AppRoutingModule,
    SharedModule 
  ],
  providers: [
    AppSettings,
    { provide: OverlayContainer, useClass: CustomOverlayContainer },
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
    DatePipe,
    { provide: MatPaginatorIntl, useClass: MatPaginatorI18nService },
    {
      provide: "SocialAuthServiceConfig",
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider("608557360343119"),
          },
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              "1012153973581-8loq6qfut7ju4b93aj01ms0sd7mfbc9v"
            ),
          },
        ],
        /** [
          
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '821295946221-lphcru5u8i9d5oou1r1g18lalm8flceo.apps.googleusercontent.com'
            )
          
        ]
       as SocialAuthServiceConfig, */
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
