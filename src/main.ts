import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment as environment} from './environments/environment';
import Auth from '@aws-amplify/auth';
import {Storage} from "aws-amplify";
import {enableProdMode} from "@angular/core";


if (environment.production) {
  enableProdMode();
}
fetch('./config/config.json').then(res => {

  res.json().then((res)=>{
    Auth.configure(res.amplify.Auth);
    Storage.configure(res.amplify.Storage);
    localStorage.setItem('BASE_URL', res.apiUrl);
  });

}).catch((e) => console.log(e))


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


