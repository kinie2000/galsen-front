import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module'; 
import { CompteUtilisateurComponent } from './compte-utilisateur.component';
import { MenuComponent } from './components/menu/menu.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { FullScreenComponent } from './components/fullscreen/fullscreen.component'; 
import { MessagesComponent } from './components/messages/messages.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { LitigeComponent } from './litige/litige.component'; 
import { SinistreComponent } from './sinistre/sinistre.component';
import { ConstatComponent } from './constat/constat.component';
import { SinitreNewComponent } from './sinitre-new/sinitre-new.component';
import { AddconstatComponent } from './addconstat/addconstat.component';
import { ShowconstatComponent } from './showconstat/showconstat.component';


export const routes = [ 
  { 
    path: '', 
    
    component: CompteUtilisateurComponent, children: [
      { path: 'litige', component: LitigeComponent, data: { breadcrumb: 'Verification' }},
      { path: 'sinistre', component: SinistreComponent, data: { breadcrumb: 'Verification' }},
      { path: 'ajoute-sinistre', component: SinitreNewComponent, data: { breadcrumb: 'Verification' }},
      { path: 'constat', component: ConstatComponent, data: { breadcrumb: 'Verification' }},
      { path: 'ajoute-constat', component: AddconstatComponent, data: { breadcrumb: 'Verification' }},
       { path: 'voir-constat', component: ShowconstatComponent, data: { breadcrumb: 'Verification' }},
      { path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) }, 
      { path: 'mon-compte', loadChildren: () => import('./mon-compte/mon-compte.module').then(m => m.MenuItemsModule) },
      { path: 'mes-vehicules', loadChildren: () => import('./mes-vehicules/mes-vehicules.module').then(m => m.MenuItemsModule) },
      { path: 'mes-locations', loadChildren: () => import('./mes-locations/mes-locations.module').then(m => m.MenuItemsModule) },
      { path: 'mes-paiements', loadChildren: () => import('./mes-paiements/mes-paiements.module').then(m => m.MenuItemsModule) },
      
      
      { path: 'sales', loadChildren: () => import('./sales/sales.module').then(m => m.SalesModule) },
      { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule), data: { breadcrumb: 'Users' } },
      { path: 'reservations', loadChildren: () => import('./reservations/reservations.module').then(m => m.ReservationsModule), data: { breadcrumb: 'Reservations' } },
      { path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule), data: { breadcrumb: 'Customers' } },
      { path: 'coupons', loadChildren: () => import('./coupons/coupons.module').then(m => m.CouponsModule), data: { breadcrumb: 'Coupons' } },
      { path: 'withdrawal', loadChildren: () => import('./withdrawal/withdrawal.module').then(m => m.WithdrawalModule), data: { breadcrumb: 'Withdrawal Requests' } },
      { path: 'analytics', loadChildren: () => import('./analytics/analytics.module').then(m => m.AnalyticsModule), data: { breadcrumb: 'Analytics' } },
      { path: 'refund', loadChildren: () => import('./refund/refund.module').then(m => m.RefundModule), data: { breadcrumb: 'Refund Requests' } },
      { path: 'followers', loadChildren: () => import('./followers/followers.module').then(m => m.FollowersModule), data: { breadcrumb: 'Followers' } },
      { path: 'support', loadChildren: () => import('./support/support.module').then(m => m.SupportModule), data: { breadcrumb: 'Support' } },
      { path: 'reviews', loadChildren: () => import('./reviews/reviews.module').then(m => m.ReviewsModule), data: { breadcrumb: 'Reviews' } }  
    ]
  } 
];


@NgModule({
  declarations: [
    CompteUtilisateurComponent,
    MenuComponent,
    UserMenuComponent,
    FullScreenComponent,
    MessagesComponent,
    BreadcrumbComponent,
    LitigeComponent,
    ConstatComponent,
    SinistreComponent,
    SinitreNewComponent,
    AddconstatComponent,
    ShowconstatComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class CompteUtilisateurModule {}
