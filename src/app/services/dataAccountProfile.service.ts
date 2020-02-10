import { Injectable } from '@angular/core';

@Injectable()
export class dataAccountProfile{
    private data:any = undefined;
    private userToken:any = undefined;

    setData(data:any){
        this.data = data;
    }

    getData():any{
        return this.data;
    }

    setUserToken(userToken:any){
        this.userToken = userToken;
    }

    getUserToken():any{
        return this.userToken;
    }
}
