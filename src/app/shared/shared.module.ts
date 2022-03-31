import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './Components/file-upload/file-upload.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { GetAgePipe } from './custompipes/get-age.pipe';
import { AlertModule } from './_alert';


@NgModule({
  declarations: [     FileUploadComponent,NavBarComponent, GetAgePipe
  ],
  imports: [
    CommonModule,AlertModule
  ]
  ,
    providers: [ ],
    exports: [ FileUploadComponent,NavBarComponent,GetAgePipe]
})
export class SharedModule { }
