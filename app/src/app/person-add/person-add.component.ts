import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../services/person.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Contact } from 'src/services/contact';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-person-add',
  templateUrl: './person-add.component.html',
  styleUrls: ['./person-add.component.scss']
})
export class PersonAddComponent implements OnInit {
  displayedColumns = ['type', 'info', 'description', 'actions'];
  dataSourceContacts = new MatTableDataSource<Contact>();
  contacts: Array<Contact> = [];

  personForm: FormGroup;
  contactForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    public personService: PersonService
  ) { }

  ngOnInit() {
    this.addPerson();
  }

  addPerson() {
    this.personForm = this.fb.group({
      firstname: '',
      lastname: '',
      age: 0,
      contacts: []
    });

    this.contactForm = this.fb.group({
      type: '',
      info: '',
      description: ''
    });
  }

  submitForm() {
    if (this.personForm.valid) {
      this.personService.Create(this.personForm.value).subscribe(() => {
        this.router.navigate(['/contacts/']);
      });
    }
  }

  addContact() {
    if (this.contactForm.valid) {
      this.contacts.push(new Contact(
        this.contactForm.get('type').value,
        this.contactForm.get('info').value,
        this.contactForm.get('description').value
      ));

      this.dataSourceContacts.connect().next(this.contacts);

      this.contactForm.reset();

      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key).setErrors(null) ;
      });

      this.personForm.patchValue({contacts: this.contacts});
    }
  }

  removeContact(contact) {
    const index = this.contacts.findIndex(x => x.type === contact.type && x.info === contact.info);

    this.contacts.splice(index, 1);

    this.dataSourceContacts.connect().next(this.contacts);
  }
}
