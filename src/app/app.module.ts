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

const appRoutes:Routes = [
    //{ path: '', redirectTo: 'gists',pathMatch: 'full'},
    { path: '',component: AppComponent, canActivate: [AuthGuard],pathMatch: 'full' },
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
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
