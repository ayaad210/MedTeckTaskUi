import { Component, OnInit } from '@angular/core';
import { IPerson } from 'src/app/shared/Models/model';
import { PersonService } from 'src/app/shared/Services/Person-service.service';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent implements OnInit {
  List: IPerson[]
  SelectedId: number | null
  ShowAddEdit = false
  constructor(private _PersoneServie: PersonService) {
    this.GetData();
  }
  GetData() {
    this._PersoneServie.GetAll().subscribe(res => {
      if (res) {
        this.List = res;
      }


    })
  }

  ngOnInit(): void {

  }

  ShowPersonModal(PesonId: number|null) {
    if (!!PesonId) {
      this.SelectedId = PesonId ;
      this.ShowAddEdit = true   ;
    }
   else  {
      this.SelectedId = null
      this.ShowAddEdit = true
    }
  }
  closeModal()
  {
    this.SelectedId=null
    this.ShowAddEdit=false
  }
  OnSaved(data){

if(data=="Done"){
this.GetData();
this.SelectedId=null;
this.ShowAddEdit=false
}
  }
}


