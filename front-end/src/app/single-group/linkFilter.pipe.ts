

import {Pipe , PipeTransform} from "@angular/core";


@Pipe({
    name: 'linkFilter'
})

export class LinkFilterPipe implements PipeTransform{
    transform(value: any ,  args?: any): any {
        if (args != '') {
            let filter = args.toLowerCase();

            var returnArray = [];
            for(let item of value){
                if(item.toLowerCase().match('^.*'+filter+'.*$')){
                    returnArray.push(item);
                }else{
                    returnArray.push(-1);
                }
            }

            return returnArray;
        } else{
            return value;
        }

    }
}
