import { Injectable } from '@angular/core';

@Injectable()
export class dataQAservice{
    private data:any = undefined;

    setData(data:any){
        this.data = data;
    }

    getData():any{
        return this.data;
    }
}