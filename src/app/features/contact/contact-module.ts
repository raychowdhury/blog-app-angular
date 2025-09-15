import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactRoutingModule } from './contact-routing-module';
import { Contact } from './contact/contact';

@NgModule({
  imports: [
    CommonModule,
    ContactRoutingModule,
    Contact, // Import the standalone component
  ],
})
export class ContactModule {}
