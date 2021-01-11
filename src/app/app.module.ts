import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MainComponent } from './components/main/main.component';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { WineEditDialogComponent } from './components/dialog-components/wine-edit-dialog/wine-edit-dialog.component';
import { MatSortModule } from '@angular/material/sort';
import { CameraDialogComponent } from './components/dialog-components/camera-component/camera-dialog.component';
import { WebcamModule } from 'ngx-webcam';
import { MatGridListModule } from '@angular/material/grid-list';
import { HeaderComponent } from './components/header/header.component';
import { ActionBarComponent } from './components/action-bar/action-bar.component';
import { WineTableComponent } from './components/wine-table/wine-table.component';
import { FooterComponent } from './components/footer/footer.component';
import { ModalComponent } from './components/modal/modal.component';
import { WineDetailsViewComponent } from './components/wine-details-view/wine-details-view.component';
import { MatCardModule } from '@angular/material/card';


import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './components/login/login.component';
import { BasicAuthInterceptor } from './guard/basic-auth.interceptor';
import { ErrorInterceptor } from './guard/error-interceptor';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import { ConfirmDialogComponent } from './components/dialog-components/confirm-dialog/confirm-dialog.component';
import { DetailsViewSectionComponent } from './components/wine-details-view/details-view-section/details-view-section.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AutocompleteBoxComponent } from './components/autocomplete-box/autocomplete-box.component';
import { SelectListComponent } from './components/dropdown/select-list.component';
import { PictureComponent } from './components/picture/picture.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

const MY_FORMATS = {
  parse: {
    dateInput: 'dd.MM.yyyy HH:mm:ss.SSS',
  },
  display: {
    dateInput: 'DD.MM.yyyy',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'dd.MM.yyyy HH:mm:ss.SSS',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    MainComponent, WineEditDialogComponent, CameraDialogComponent, HeaderComponent,
    ActionBarComponent, WineTableComponent, FooterComponent, ModalComponent,
    WineDetailsViewComponent, LoginComponent, HomeComponent, ConfirmDialogComponent, DetailsViewSectionComponent, AutocompleteBoxComponent, SelectListComponent, PictureComponent, PictureComponent,
  ],
  imports: [
    MatAutocompleteModule,
    MatProgressBarModule,
    MatProgressSpinnerModule, BrowserModule,
    BrowserAnimationsModule, MatInputModule, MatNativeDateModule, MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule, HttpClientXsrfModule,
    BrowserModule,
    MatSliderModule,
    BrowserAnimationsModule,
    MatTableModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatSortModule,
    WebcamModule,
    MatGridListModule,
    MatCardModule, MatIconModule, ReactiveFormsModule,
    RouterModule.forRoot(routes), MatMomentDateModule],
  providers: [MatDatepickerModule, DatePipe, {
    provide: MatDialogRef,
    useValue: {},
  },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [MainComponent]
})
export class AppModule {
}
