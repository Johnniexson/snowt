import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ContactListingComponent } from './contacts/components/contact-listing/contact-listing.component';
import { NoteListingComponent } from './notes/components/note-listing/note-listing.component';
import { ContactFormComponent } from './contacts/components/contact-form/contact-form.component';
import { NoteFormComponent } from './notes/components/note-form/note-form.component';
import { AutoContactComponent } from './contacts/components/auto-contact/auto-contact.component';
import { CategoryComponent } from './contacts/components/category/category.component';
import { CategoryFormComponent } from './contacts/components/category/category.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'contacts',
        component: ContactListingComponent
      },
      {
        path: 'contacts/new',
        component: ContactFormComponent
      },
      {
        path: 'contacts/:id',
        component: ContactFormComponent
      },
      {
        path: 'auto-contact',
        component: AutoContactComponent
      },
      {
        path: 'categories',
        component: CategoryComponent
      },
      {
        path: 'categories/:id',
        component: CategoryFormComponent
      },
      {
        path: 'notes',
        component: NoteListingComponent
      },
      {
        path: 'notes/new',
        component: NoteFormComponent
      },
      {
        path: 'notes/:id',
        component: NoteFormComponent
      },
      {
        path: '**',
        redirectTo: 'contacts'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
