import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getAge'
})
export class GetAgePipe implements PipeTransform {

  transform(value: Date|string): unknown {
    let res:string

    if(!!value)
    {
      let today = new Date()  //Date();
    let birthdate = new Date(value);

    let diff = today.getFullYear()-birthdate.getFullYear();
     res = diff + " year ";
     if(diff==null|| diff<0){
      res=" Set Date Of Birt First"
     }
    }



    return res;
  }

}
