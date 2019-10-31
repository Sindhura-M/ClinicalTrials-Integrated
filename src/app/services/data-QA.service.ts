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

/*export class dataQAservice{
    private storageData:any[];

    setData(data:any){
        //this.storageData = data;
        localStorage.setItem('items', JSON.stringify(data));
        console.log(JSON.stringify(localStorage.getItem("items")));
    }

    getData():any{
        //return this.storageData;
        let getItem = localStorage.getItem('items');
        console.log(JSON.parse(getItem));
        return JSON.parse(getItem);
    }

    clearData() {
    	//localStorage.removeItem(this.storageData);
    }

    cleanAll() {
	    localStorage.clear()
	}

}*/