import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { MaterialModule } from './modules/material/material.module';
import { TopbarComponent } from './components/topbar/topbar.component';
import { AuthService } from './services/auth/auth.service';
import { AuthGuardGuard } from './services/authGuard/auth-guard.guard';
import { TokenInterceptorService } from './services/tokenInterceptor/token-interceptor.service';
import { ErrorViewerComponent } from './components/error-viewer/error-viewer.component';
import { ErrorHandlerService } from './services/errorHandler/error-handler.service';
import { NewsComponent } from './components/news/news.component';
import { NewViewComponent } from './components/new-view/new-view.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    TopbarComponent,
    ErrorViewerComponent,
    NewsComponent,
    NewViewComponent,
  ],
  entryComponents: [
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [AuthService, AuthGuardGuard, ErrorHandlerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
