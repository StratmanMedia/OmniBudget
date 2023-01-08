import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLayoutComponent } from './modules/user-layout/components/user-layout/user-layout.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/guest/guest.module').then(m => m.GuestModule)
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
