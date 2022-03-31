import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPerson } from 'src/app/shared/Models/model';

@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.css']
})

export class PersonCardComponent implements OnInit {
  @Input("Model") Model: IPerson;
  @Output() Selected = new EventEmitter<number>();

  constructor() { }
  ngOnInit(): void {

  }

  SelectPerson(){
    this.Selected.emit(this.Model.id);
  }
}
