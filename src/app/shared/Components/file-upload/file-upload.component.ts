import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileUploadService } from '../../Services/file-upload.service';


class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';
   
  constructor(public src: string, public file: File) {}
}


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent  implements OnInit{
  FileName:string=null
  @Input("oldFileName") oldFileName:string
  @Input("DefaultFileName") DefaultFileName:string
  
  // @Input('UploadNowSetter') 
  // set UploadNowSetter(val) {
    
  //   if(val==true){
  //     this.UploadFile();
  //   }
  // }
  
  
  @Output() FileUploaded = new EventEmitter<string>();


    FileModel: ImageSnippet;
    readonly apiurl="http://localhost:5000/api/files";
    readonly photosurl="http://localhost:5000/photos";
  imageurl: any;
  FileUrl: string;

    constructor(private imageService: FileUploadService){}
  ngOnInit(): void {
    
    if(!!this.oldFileName){
     this.FileName=this.oldFileName
    }else{
      this.FileName=this.DefaultFileName;
    }

   this.FileUrl=this.photosurl+"/"+this.FileName
  }
  
    private onSuccess() {
      this.FileModel.pending = false;
      this.FileModel.status = 'ok';
    }
  
    private onError() {
      this.FileModel.pending = false;
      this.FileModel.status = 'fail';
      this.FileModel.src = '';
    }
    
    UploadFile() {
     
      this.FileModel.pending = true;
      this.imageService.uploadImage(this.FileModel.file,this.oldFileName).subscribe(
        (res) => {
       this.FileName=  res.data[0]
         this.FileUploaded.emit(res.data[0])
          this.onSuccess();
        },
        (err) => {
          
          this.FileUploaded.emit(this.FileName)
          this.onError();
          
        })
        

    }


    getfiles(Input: any){
      const file: File = Input.files[0];
      const reader = new FileReader();

      reader.addEventListener('load', (event: any) => {
  
        this.FileModel = new ImageSnippet(event.target.result, file);
        this.FileUrl=this.FileModel.src;
        this.UploadFile() ;

      });
  
      reader.readAsDataURL(file);

}
}