import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { ShoppingListService } from './services/shopping-list.service';
import { RoutingModuleApp } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule , HttpClient } from '@angular/common/http';
import { SharedModule } from './modules/shared.module';
import { AuthInterceptonService } from './modules/auth/service/auth-interceptor.service';

import { TranslateLoader , TranslateModule } from "@ngx-translate/core"
import { TranslateHttpLoader } from "@ngx-translate/http-loader"

export function httpTranslateLoaderFactory(http : HttpClient) {
  return new TranslateHttpLoader(http)
}

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    FormsModule,
    RoutingModuleApp,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader : {
        provide : TranslateLoader,
        useFactory : httpTranslateLoaderFactory,
        deps : [HttpClient]
      }
    })
  ],
  providers: [
    ShoppingListService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptonService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
