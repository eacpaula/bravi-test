import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonService } from 'src/services/person.service';
import { Contact } from 'src/services/contact';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.scss']
})
export class PersonEditComponent implements OnInit {
  displayedColumns = ['type', 'info', 'description', 'actions'];
  dataSourceContacts = new MatTableDataSource<Contact>();
  contacts: Array<Contact> = [];

  personForm: FormGroup;
  contactForm: FormGroup;

  constructor(
    private activeRoute: ActivatedRoute,
    public fb: FormBuilder,
    private router: Router,
    public personService: PersonService
  ) {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    this.personService.Get(id).subscribe((data) => {
      this.personForm = this.fb.group({
        firstname: data.firstname,
        lastname: data.lastname,
        age: data.age,
        contacts: data.contacts
      });

      this.contacts = data.contacts;
      this.dataSourceContacts.connect().next(this.contacts)
    });
  }

  ngOnInit() {
    this.updatePerson();
  }

  updatePerson() {
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
      const id = this.activeRoute.snapshot.paramMap.get('id');
      this.personService.Update(id, this.personForm.value).subscribe(() => {
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
