import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SharedComponentsListnersService {




    private lang = new BehaviorSubject('en');
    changedlang = this.lang.asObservable();


    constructor(
    ) { }




    changeLanguage(lang: string) {
        this.lang.next(lang);
    }

}
