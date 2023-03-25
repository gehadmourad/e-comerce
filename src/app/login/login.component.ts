import { Component, EventEmitter, OnInit, Output, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import { RolesBasic } from '../shared/enum/userRolesEnum.model';
import { Login } from '../shared/models/login.model';
import { LanguageService } from '../shared/service/language.service';
import { SharedComponentsListnersService } from '../shared/service/shared-components-listners.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    Username: new FormControl('', Validators.required),
    Password: new FormControl('', Validators.required),
  });
  lang!: string;
  invalidPass: boolean = false;
  userrole:RolesBasic=RolesBasic.Admin;
  @Output() isEn: EventEmitter<any> = new EventEmitter();

  constructor(    
    private router: Router,
    public languageService: LanguageService,
    private translate: TranslatePipe,
    public translateService: TranslateService,
    private config: PrimeNGConfig,
    private renderer: Renderer2,
    private sharedListener: SharedComponentsListnersService,

   ){}
  ngOnInit(): void {

  }
  getLang(): void {
    this.languageService.currentLang.subscribe((lang) => {
      if (lang)
        this.lang = lang;
    });
    this.lang = this.languageService.getDefaultLang();
  }
  save(): void {

    if (this.checkFormValidation()) {
      let login = this.getDataFromForm();
   if( this.userrole==RolesBasic.Admin)
        this.router.navigate(['/adminview']);
        else if(this.userrole==RolesBasic.User)
        this.router.navigate(['/userview']);
        else
        this.invalidPass=true
        localStorage.setItem('currentUserrole', this.userrole);

      

    }
  }
 
  checkFormValidation(): boolean {

    return this.loginForm.valid;
  }
  
  getDataFromForm(): Login {
    let login = Object.assign({}, this.loginForm.value) as Login;
    login.Username= this.loginForm.value.Username!;
    login.Password= this.loginForm.value.Password!;
   
     
      if(login.Username=='admin'&&login.Password=='admin'){
        this.userrole=RolesBasic.Admin;
        localStorage.setItem('currentUserrole', this.userrole);

      }
      else if(login.Username=='user'&&login.Password=='user'){ //this.form.value.passwd;
        this.userrole=RolesBasic.User;
        localStorage.setItem('currentUserrole', this.userrole);

      }
      else
      this.userrole=RolesBasic.Visitor;

      //this.form.value.passwd;


    
    

    return login;
  }
 
  changeLanguage(lang: string) {
    this.lang = lang;
    localStorage.setItem('lang', this.lang);
    this.translateService.setDefaultLang(this.lang);
    this.translateService.use(this.lang);
    let dir = this.lang === 'en' ? 'ltr' : 'rtl';
    this.isEn.emit(this.lang);
    this.renderer.setAttribute(document.querySelector('html'), 'dir', dir);
    this.sharedListener.changeLanguage(this.lang);
    this.translateService.get('primeng').subscribe(res => this.config.setTranslation(res));
  }
}
