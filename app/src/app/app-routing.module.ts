import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BracketsComponent } from './brackets/brackets.component';
import { PersonComponent } from './person/person.component';
import { PersonAddComponent } from './person-add/person-add.component';
import { PersonEditComponent } from './person-edit/person-edit.component';

const routes: Routes = [
  { path: 'brackets', component: BracketsComponent },
  { path: 'contacts', component: PersonComponent },
  { path: 'contact-add', component: PersonAddComponent },
  { path: 'contact-edit/:id', component: PersonEditComponent },
  { path: '**', redirectTo: '/brackets', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [BracketsComponent, PersonComponent, PersonAddComponent, PersonEditComponent];
