import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/service/authentication.service';
import { LanguageService } from 'src/app/shared/service/language.service';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent {
  lang!: string;

  constructor(    private languageService: LanguageService,
    private router: Router,
    private authService: AuthenticationService,
    ){
      
    }
    ngOnInit() {
      this.getLang();
      
    }
  changeLanguage(lang: string): void {
    // this.lang = lang;
    this.languageService.changeLanguage(lang, this.router);
  }
  getLang() {
    this.languageService.currentLang.subscribe((lang) => {
      if (lang)
        this.lang = lang;
    });
    this.lang = this.languageService.getDefaultLang();
  }

  logout() {
    this.authService.logout();
  }
}
