import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatMenuModule, MatToolbarModule, MatFormFieldModule, MatInputModule, MatDialogModule } from '@angular/material';
import { PersonService } from 'src/services/person.service';
import { HttpClientModule } from '@angular/common/http';
import { PersonModule } from './person/person.module';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatMenuModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    HttpClientModule,
    PersonModule
  ],
  providers: [PersonService],
  bootstrap: [AppComponent]
})

export class AppModule { }
