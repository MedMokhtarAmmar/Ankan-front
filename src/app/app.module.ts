import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {SharedModule} from "./shared/shared.module";
import {RouterModule} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {MatDialogModule} from "@angular/material/dialog";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {AmplifyService} from "aws-amplify-angular";

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    ToastrModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    RouterModule,
    BrowserAnimationsModule,
    SharedModule,
    MatDialogModule,
    PdfViewerModule
  ],
  providers: [AmplifyService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
