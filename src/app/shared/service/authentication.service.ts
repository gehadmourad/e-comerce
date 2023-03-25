import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MainResponse } from '../../shared/models/MainResponse.model';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { LanguageService } from './language.service';
import { RolesBasic } from '../../shared/enum/userRolesEnum.model';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private url;
  lang!: string;



  message: any;


  constructor(
    private http: HttpClient,
    private router: Router,
    private languageService: LanguageService,
  ) {
    this.url = environment.baseUrl;
    let current = localStorage.getItem('currentUser');
    

  }

  getLang(): void {
    this.languageService.currentLang.subscribe((lang) => {
      if (lang)
        this.lang = lang;
    });
    this.lang = this.languageService.getDefaultLang();
  }



 
 



  logout(): void {
   
    localStorage.removeItem('currentUser');
   
    this.router.navigate(['']);

   

  }

 
}