import { MaterialModule } from '../shared/modules/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ContactsModule } from './contacts/contacts.module';
import { NotesModule } from './notes/notes.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  imports: [
    CommonModule,
    ContactsModule,
    NotesModule,
    SharedModule,
    MaterialModule,
    DashboardRoutingModule
  ],
  declarations: [DashboardComponent, SideNavComponent, ToolbarComponent, ProfileComponent],
  exports: [DashboardComponent, SideNavComponent, ToolbarComponent]
})
export class DashboardModule {}
