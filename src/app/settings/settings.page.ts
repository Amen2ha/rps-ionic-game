import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone : false,
})
export class SettingsPage implements OnInit {

  languages = [
  { code: 'en', label: 'English' },
  { code: 'he', label: 'עברית' },
];
rtlLangs = ['he'];

  constructor(private translate: TranslateService) { }

  ngOnInit() {
  }

    currentLang: string = localStorage.getItem('lang') || 'en';

  changeLang(lang: string) {
  this.currentLang = lang;
  localStorage.setItem('lang', lang);
  this.translate.use(lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = this.rtlLangs.includes(lang) ? 'rtl' : 'ltr';
}
}
