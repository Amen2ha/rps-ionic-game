import { Component, DOCUMENT, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private translate: TranslateService, @Inject(DOCUMENT) private document: Document) {
    this.initializeApp();
  }

    supportedLangs = ['en','he'];


    initializeApp() {

  let lang = localStorage.getItem('lang');

  if (!lang || !this.supportedLangs.includes(lang)) {
    const browserLang = navigator.language.split('-')[0];
    lang = this.supportedLangs.includes(browserLang) ? browserLang : 'en';
    localStorage.setItem('lang', lang);
  }

  this.setLanguage(lang);
    }

  setLanguage(lang: string) {
  this.translate.setDefaultLang('en');
  this.translate.use(lang);

  this.document.documentElement.lang = lang;

  const rtlLangs = ['he'];
  this.document.documentElement.dir = rtlLangs.includes(lang) ? 'rtl' : 'ltr';
}


}
