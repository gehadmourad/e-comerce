import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslateLoader, TranslateModule, TranslatePipe, TranslateService } from "@ngx-translate/core";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LanguageService } from './shared/service/language.service';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app-routing.module';

import {LoginComponent} from './login/login.component'
import { ConfirmationService } from 'primeng/api';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { UserViewComponent } from './user-view/user-view.component';
import { AddCategoryComponent } from './admin-view/add/add-category/add-category.component';
import { EditCategoryComponent } from './admin-view/edit/edit-category/edit-category.component';
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { TableModule } from "primeng/table";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MultiSelectModule } from 'primeng/multiselect';
import { MenuModule } from 'primeng/menu';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from "primeng/autocomplete";
import { BreadcrumbModule } from "primeng/breadcrumb";
import { CalendarModule } from "primeng/calendar";
import { DialogModule } from "primeng/dialog";
import { DropdownModule } from "primeng/dropdown";
import { ProgressBarModule } from "primeng/progressbar";
import { RadioButtonModule } from "primeng/radiobutton";
import { UploadFileComponent } from './shared/component/upload-file/upload-file.component';
import { ImageComponent } from './shared/component/upload-file/image/image.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RatingModule } from 'primeng/rating';
import { BarComponent } from './shared/component/bar/bar/bar.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminViewComponent,
    UserViewComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    UploadFileComponent,
    ImageComponent,
    BarComponent,

  ],
  imports: [
    MultiSelectModule,
    MenuModule,
    FileUploadModule,
    ButtonModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    TableModule,
    BrowserAnimationsModule,
    RatingModule,
        DialogModule,
        BreadcrumbModule,
        RadioButtonModule,
        DropdownModule,
        CalendarModule,
        ProgressBarModule,
        NgbModule,
    RouterModule.forRoot(AppRoutes, {
      // useHash: false//#
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json'),
        deps: [HttpClient]
      }
    })
  ],
  providers: [ LanguageService,
    ConfirmationService,
    TranslatePipe
    ,
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
