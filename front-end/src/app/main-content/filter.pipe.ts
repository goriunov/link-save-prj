

import {Pipe , PipeTransform} from "@angular/core";


@Pipe({
  name: 'groupFilter'
})

export class GroupFilterPipe implements PipeTransform{
    transform(value: any ,  args?: any): any {
        if (args != '') {
            let filter = args.toLowerCase();
            return filter ? value.filter(singleData => singleData.groupName.toLowerCase().indexOf(filter) != -1) : value;
        } else{
            return value;
        }

    }
}
