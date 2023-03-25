import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private renderer: Renderer2;
  private lang = new BehaviorSubject<string>(Object.assign({}));
  public currentLang: Observable<string>;

  constructor(private translateService: TranslateService,
    private confirmationService: ConfirmationService,
    private translate: TranslatePipe,

    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.currentLang = this.lang.asObservable();
  }

  getDefaultLang(): string {
    let lang = this.translateService.getDefaultLang();
    if (!lang) {
      lang = this.setDefaultLanguage();
    }
    return lang;
  }

  setDir(lang: string): void {
    let dir = lang === 'en' ? 'ltr' : 'rtl';
    this.renderer.setAttribute(document.querySelector('html'), 'dir', dir);
  }

  setDefaultLanguage(): string {

    let lang = localStorage.getItem('lang');
    lang = lang ? lang : 'en';
    this.translateService.setDefaultLang(lang);
    this.setDir(lang);
    this.lang.next(lang);
    return lang;
  }

  changeLanguage(lang: string, router: Router): void {
    localStorage.setItem('lang', lang);
    this.translateService.use(lang);
    const prev = router.url; 
     router.navigate(['/']).then(data => {
       router.navigate([prev]);
       this.lang.next(lang);
      });
      this.setDir(lang);

    // let message = 'Shared.confirmUnActive';
   
    // this.confirmationService.confirm({
    //   message: this.translate.transform(message),
    //   header: this.translate.transform('Shared.confirm'),
    //   icon: 'pi pi-exclamation-triangle',
    //   accept: () => {
    //     localStorage.setItem('lang', lang);
    //     this.translateService.use(lang);
    //     const prev = router.url; 
    //      router.navigate(['/']).then(data => {
    //        router.navigate([prev]);
    //        this.lang.next(lang);
    //       });
    //       this.setDir(lang);

    //   }
    // });

  }

}
