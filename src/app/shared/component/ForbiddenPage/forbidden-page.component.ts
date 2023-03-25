import { Component, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../service/language.service';


@Component({
  templateUrl: './forbidden-page.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ForbiddenPageComponent {
  lang = 'ar';

  constructor(
      public languageService: LanguageService,

   ) {

  }

  
}
