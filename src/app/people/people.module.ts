import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PersonCardComponent } from './person-card/person-card.component';
import { PeopleListComponent } from './people-list/people-list.component';
import { PersonAddEditComponent } from './person-add-edit/person-add-edit.component';
import { SharedModule } from '../shared/shared.module';
import { PeopleRoutingModule } from './people-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [PersonCardComponent, PeopleListComponent,PersonAddEditComponent
  ,
  ],
  imports: [
    CommonModule,SharedModule,PeopleRoutingModule
    ,  FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    DatePipe
  ],
})
export class PeopleModule { }
