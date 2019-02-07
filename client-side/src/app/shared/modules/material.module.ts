import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatIconModule, MatRadioModule, MatTabsModule, MatSidenavModule, MatToolbarModule, MatListModule, MatCardModule, MatTableModule, MatMenuModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSnackBarModule, MatOptionModule, MatSelectModule, MatCheckboxModule, MatDialogModule, MatPaginatorModule, MatTooltipModule} from '@angular/material';
const exportedMatModules = [
    CommonModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatRadioModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatTableModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDialogModule,
    MatCardModule
]
@NgModule({
  imports: [
    CommonModule,
    ...exportedMatModules
  ],
  exports : [
    ...exportedMatModules
  ],
  declarations: []
})
export class MaterialModule { }
