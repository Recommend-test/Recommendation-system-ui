import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name:'convertToSpace'
})
export class ConvertToSpacePipe implements PipeTransform{


    transform(value: string, parameter:string):string {
       
       return  value.replace(parameter,' ');
    }
    
}