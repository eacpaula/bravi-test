import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material';
import { ContactComponent } from '../contacts/contact.component';

@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    MatTableModule
  ],
  entryComponents: [
    ContactComponent
  ]
})

export class PersonModule {
}
