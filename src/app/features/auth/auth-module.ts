import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing-module';
import { Register } from './register/register';

@NgModule({
  imports: [CommonModule, AuthRoutingModule, Register],
})
export class AuthModule {}
