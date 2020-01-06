import { Component, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { PersonService } from '../../services/person.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Person } from 'src/services/person';
import { MatTableDataSource } from '@angular/material';
import { ContactComponent } from '../contacts/contact.component';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  displayedColumns = ['createdAt', 'firstname', 'lastname', 'age', 'actions'];
  list = new MatTableDataSource<Person>();
  filter: string;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    public personService: PersonService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadPeople();
  }

  loadPeople() {
    return this.personService.GetAll().subscribe((data: {}) => {
      this.list.data = data as Array<Person>;
    });
  }

  search() {
    return this.personService.GetAll(this.filter).subscribe((data: {}) => {
      this.list.data = data as Array<Person>;
    });
  }

  delete(person) {
    const index = this.list.data.findIndex(x => x._id === person._id);

    // tslint:disable-next-line: prefer-const no-var-keyword
    var data: any = this.list.data;

    return this.personService.Delete(person._id).subscribe(() => {
      data.splice(index, 1);
      this.list.connect().next(data);
    });
  }

  edit(data) {
    this.router.navigate(['/contact-edit/', data._id]);
  }

  viewContacts(data) {
    this.dialog.open(ContactComponent, {
      data: data.contacts
    });
  }
}
