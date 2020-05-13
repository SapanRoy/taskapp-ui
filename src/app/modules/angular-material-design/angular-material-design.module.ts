import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
  MatProgressBarModule,
  MatPaginatorModule,
  MatSnackBarModule,
  MatSelectModule,
  MatSortModule,
  MatChipsModule,
  MatFormFieldModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatAutocompleteModule,
  MatCardModule,
  MatTooltipModule
} from '@angular/material';


@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatInputModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatSortModule,
    MatChipsModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatCardModule,
    MatTooltipModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatInputModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatSortModule,
    MatChipsModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatCardModule,
    MatTooltipModule
  ],
})
export class AngularMaterialModule { }
