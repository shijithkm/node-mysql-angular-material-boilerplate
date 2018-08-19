import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { UsersComponent } from './users.component';
import { AddUserComponent } from './add-user/add-user.component';


@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ],
  declarations: [UsersComponent, AddUserComponent],
  entryComponents: [AddUserComponent]
})
export class UsersModule { }
