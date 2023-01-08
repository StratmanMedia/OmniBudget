import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLayoutRoutingModule } from './user-layout-routing.module';
import { UserLayoutComponent } from './components/user-layout/user-layout.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    UserLayoutComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    UserLayoutRoutingModule
  ]
})
export class UserLayoutModule { }
