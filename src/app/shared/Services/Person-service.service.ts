import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPerson } from '../Models/model';
@Injectable({
  providedIn: 'root'
})
export class PersonService {
   readonly apiurl="https://tekdi-challenges.appspot.com/api/People";
   constructor(private http:HttpClient) { }
  GetAll():Observable<IPerson[]>{
    return this.http.get<IPerson[]>(this.apiurl);    
  }
  GetById(id:number):Observable<IPerson>{
    return this.http.get<IPerson>(this.apiurl+"/"+id);    
  }
  Add(val:IPerson):Observable<IPerson>{
    return this.http.post<IPerson>(this.apiurl,val)
  }
  Update(val:any):Observable<IPerson>{
    return this.http.patch<IPerson>(this.apiurl,val)
  }
  Delete(id:number):Observable<IPerson>{
    return this.http.delete<any>(this.apiurl+"/"+id)
  }

}