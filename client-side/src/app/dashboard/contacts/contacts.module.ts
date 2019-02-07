import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/modules/material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ContactService } from './services/contact.service';
import { ContactListingComponent } from './components/contact-listing/contact-listing.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { TokenInterceptorService } from '../../services/token-interceptor.service';
import { QuillModule } from 'ngx-quill';
import { NgxPaginationModule } from 'ngx-pagination';
import { AutoContactComponent } from './components/auto-contact/auto-contact.component';
import {
  CategoryComponent,
  CategoryFormComponent
} from './components/category/category.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    QuillModule,
    NgxPaginationModule
  ],
  declarations: [
    ContactListingComponent,
    ContactFormComponent,
    AutoContactComponent,
    CategoryComponent,
    CategoryFormComponent
  ],
  exports: [
    ContactListingComponent,
    AutoContactComponent,
    CategoryComponent,
    CategoryFormComponent,
    ContactFormComponent
  ],
  providers: [
    ContactService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ]
})
export class ContactsModule {}
