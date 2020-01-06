import { Contact } from './contact';

export class Person {
  // tslint:disable-next-line: variable-name
  _id: number;
  firstname: string;
  lastname: string;
  age: number;
  contacts: Array<Contact>;
}
