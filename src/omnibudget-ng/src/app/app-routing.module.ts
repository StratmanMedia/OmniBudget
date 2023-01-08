import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuestLayoutComponent } from './modules/guest-layout/components/guest-layout/guest-layout.component';
import { UserLayoutComponent } from './modules/user-layout/components/user-layout/user-layout.component';

const routes: Routes = [
  {
    path: '',
    component: GuestLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/guest-layout/guest-layout.module').then(m => m.GuestLayoutModule)
      }
    ]
  },
  {
    path: 'app',
    component: UserLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/user-layout/user-layout.module').then(m => m.UserLayoutModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
