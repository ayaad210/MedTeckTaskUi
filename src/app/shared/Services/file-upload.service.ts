import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/shared/Models/ResponseForm';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  readonly apiurl="http://localhost:5000/api/files";

  constructor(private http: HttpClient) {}


  public uploadImage(image: File,oldimage): Observable<ApiResponse<string>> {
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post<ApiResponse<string>>(this.apiurl+"/save/"+oldimage, formData);
  }}