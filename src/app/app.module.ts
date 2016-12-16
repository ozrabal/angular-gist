import { APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RouterModule, Routes  } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { GistListComponent } from './gist-list/gist-list.component';
import { GistListItemComponent } from './gist-list-item/gist-list-item.component';
import { GistContentComponent } from './gist-content/gist-content.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';

import { AppConfig } from './config/app.config';

const appRoutes:Routes = [
    { path: '',component: AppComponent, canActivate: [AuthGuard], pathMatch: 'full' },
    { path: 'gist/:id', component: GistContentComponent },
    { path: 'login', component: LoginComponent },
    { path: 'login/code', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GistListComponent,
    GistListItemComponent,
    GistContentComponent,
    FooterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes,{ useHash: false })
  ],
  providers: [
      AuthService,
      AuthGuard,
      AppConfig,
      {
        provide: APP_INITIALIZER,
        useFactory: (config: AppConfig) => () => config.load(),
        deps: [AppConfig],
        multi: true
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
