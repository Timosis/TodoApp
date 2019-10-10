import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {MatButtonModule,MatCheckboxModule,MatInputModule, MatIconModule, MatDialogModule} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UpdateDialogComponent } from './components/update-dialog/update-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    UpdateDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatCardModule,
    DragDropModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    HttpClientModule
  ],
  entryComponents: [UpdateDialogComponent],
  providers: [
    {provide:'apiUrl',useValue:'http://localhost:3000'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
