import { Injectable } from '@angular/core';

@Injectable()

export class dataQAservice{
    private data:any = undefined;
    private userID: any = '';

    setData(data:any){
        this.data = data;
    }

    getData():any{
        return this.data;
    }

    setUserID(id:any){
        this.userID = id;
    }

    getUserID():any{
        return this.userID;
    }
}
