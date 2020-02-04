import { AbstractControl, ValidatorFn } from "@angular/forms";


export class NumberValidator{


   static range(min:number,max:number):ValidatorFn{
    
    return (rating:AbstractControl):{[key:string]:boolean} | null =>{

  
        if(rating.value!=null&&(isNaN(rating.value)||rating.value<min||rating.value>max)){
          console.log(rating.value);
          return {'range':true};
        }
        return null;
    };
    
   }


   
    
}

