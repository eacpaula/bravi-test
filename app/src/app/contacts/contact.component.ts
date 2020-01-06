import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { Contact } from 'src/services/contact';

@Component({
  selector: 'app-contact',
  templateUrl: 'contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  displayedColumns = ['type', 'info', 'description'];
  list = new MatTableDataSource<Contact>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.list.data = data;
  }
}
