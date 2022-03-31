import { DatePipe } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MakeDateCompatibleWithInput } from "src/app/shared/Helber/DateMethods";
import { IPerson } from "src/app/shared/Models/model";
import { PersonService } from "src/app/shared/Services/Person-service.service";
import { AlertService } from "src/app/shared/_alert";

@Component({
  selector: "app-person-add-edit",
  templateUrl: "./person-add-edit.component.html",
  styleUrls: ["./person-add-edit.component.css"],
})
export class PersonAddEditComponent implements OnInit {
  Model: IPerson = <IPerson>{};
  AvatarUrlList: { selected: boolean; url: string }[] = [
    {
      selected: false,
      url: "https://www.gravatar.com/userimage/219319637/1b166f376a625723b505cbb7f239b802?size=120",
    },
    {
      selected: true,
      url: "https://www.gravatar.com/userimage/219319637/9237b66bc687a3c6a67ede8410e9143d?size=120",
    },
    {
      selected: false,
      url: "https://www.gravatar.com/userimage/219319637/e9df4da5689a404fb3dc6e063c81a3f5?size=120",
    },
    {
      selected: false,
      url: "https://www.gravatar.com/userimage/219319637/bdca54c4863383738edf94f00df3d895?size=120",
    },
  ];
  Personid: number | null;
  PersonForm: FormGroup;
  @Input("PersonId")
  set SetVal(val: number | null) {
    this.Personid = val;
    this.GetData();
  }
  @Output() Saved = new EventEmitter<string>();

  constructor(
    private _personService: PersonService,
    private _fb: FormBuilder,
   private  _alertService:AlertService

  ) { }

  ngOnInit(): void {
    this.initFormGroup();
    this.SelectAvatar(null);
  }
  GetData() {
    this.Model = <IPerson>{};
    if (this.Personid)
      this._personService.GetById(this.Personid).subscribe((res) => {
        if (res) {
          this.Model = res;
          this.Model.dob = MakeDateCompatibleWithInput(this.Model.dob);

          this.PersonForm.patchValue(this.Model);
        }
      });
  }

  SelectAvatar(item: any) {
    if (!!item) {
      this.AvatarUrlList.forEach((element) => {
        element.selected = false;
      });
      item.selected = true;
      4;
      this.PersonForm.patchValue({ avatar: item.url });
    } else {
      this.PersonForm.patchValue({ avatar: this.AvatarUrlList[1].url });
    }
  }
  /////////////////////////////
  initFormGroup() {
    this.PersonForm = this._fb.group({
      id: [null],
      name: ["", [Validators.required]],
      email: ["", [Validators.required, , Validators.email]],
      avatar: ["", [Validators.required]],
      dob: ["", [Validators.required]],
      country: ["", [Validators.required]],
    });

  }

  Save() {
    if (!this.PersonForm.invalid) {
      this.Model = this.PersonForm.value;
      if (!!this.Model.id && this.Model.id >= 0) this.Edit();
      else this.Add();
    } else {
     // alert("");
      this._alertService.warn("Plz Insert Valid Data");
    }
  }
  Add() {
    this._personService.Add(this.Model).subscribe(
      (data) => {
        this.Saved.emit("Done");
        this._alertService.success("Added Successfully")
      },
      (error) => {
        this.Saved.emit("error");
        this._alertService.warn(
          "Error! Plz check Connection"
        );
      }
    );
  }
  Edit() {
    this._personService.Update(this.Model).subscribe(
      (data) => {
        this.Saved.emit("Done");
        this._alertService.success("Updated Successfully")
      },
      (error) => {
        this.Saved.emit("error");

        this._alertService.warn(
          "Error! Plz check Connection"

        );
      }
    );
  }
}
