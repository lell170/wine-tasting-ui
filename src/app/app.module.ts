import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MainComponent } from './components/main/main.component';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { WineEditDialogComponent } from './components/wine-edit-dialog/wine-edit-dialog.component';
import { MatSortModule } from '@angular/material/sort';
import { CameraComponent } from './components/camera-component/camera.component';
import { WebcamModule } from 'ngx-webcam';
import { MatGridListModule } from '@angular/material/grid-list';
import { HeaderComponent } from './components/header/header.component';
import { ActionBarComponent } from './components/action-bar/action-bar.component';
import { WineTableComponent } from './components/wine-table/wine-table.component';
import { FooterComponent } from './components/footer/footer.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [
    MainComponent, WineEditDialogComponent, CameraComponent, HeaderComponent, ActionBarComponent, WineTableComponent, FooterComponent, ModalComponent
  ],
  imports: [
    BrowserModule,
    MatSliderModule,
    BrowserAnimationsModule,
    MatTableModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatSortModule,
    WebcamModule,
    MatGridListModule
  ],
  providers: [     {
    provide: MatDialogRef,
    useValue: {}
  }],
  bootstrap: [MainComponent]
})
export class AppModule {
}
