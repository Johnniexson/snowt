import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/modules/material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NoteListingComponent } from './components/note-listing/note-listing.component';
import { NoteFormComponent } from './components/note-form/note-form.component';
import { TokenInterceptorService } from '../../services/token-interceptor.service';
import { QuillModule } from 'ngx-quill';
import { NoteService } from './services/note.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    QuillModule
  ],
  declarations: [NoteListingComponent, NoteFormComponent],
  exports: [NoteListingComponent],
  providers: [
    NoteService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ]
})
export class NotesModule {}
