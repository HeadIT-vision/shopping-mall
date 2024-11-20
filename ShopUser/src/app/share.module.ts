import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from "@angular/material/dialog";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";

@NgModule({
  declarations: [],
  imports: [
    FlexLayoutModule,
    MatCardModule,
    MatCheckboxModule,
    HttpClientModule,
    MatTableModule,
    MatIconModule,
    CKEditorModule,
    MatChipsModule,
    MatButtonToggleModule,
    FormsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    FlexLayoutModule,
    MatCardModule,
    MatCheckboxModule,
    MatCheckboxModule,
    HttpClientModule,
    MatTableModule,
    MatIconModule,
    CKEditorModule,
    MatChipsModule,
    MatButtonToggleModule,
    FormsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class ShareModule { }