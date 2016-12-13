import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class AuthService {

    private loggedIn = false;

  constructor(private http: Http) {
      this.loggedIn = !!localStorage.getItem('auth_token');

  }

    login(email, password){
console.log('login');
        event.preventDefault();
        let headers = new Headers();
        headers.append('Content-type', 'application/json');

        return this.http.post( 'https://github.com/login/oauth/authorize?scope=user:email gist&client_id=bb3edde8cc2bac83091f',
            JSON.stringify({email, password}),
            { headers })
            .map(res => res.json())
            .map((res) => {
                if(res.success){
                    localStorage.setItem('auth_token', res.auth_token);
                    this.loggedIn = true;
                }
                return res.success;
            });

        /*console.log(credentials);
        this.http.post('https://my-app.com/api/authenticate', credentials)
            .map(res => res.json())
            .subscribe(
                // We're assuming the response will be an object
                // with the JWT on an id_token key
                data => localStorage.setItem('id_token', data.id_token),
                error => console.log(error)
            );*/

    }

    logout(){
        localStorage.removeItem('auth_token');
        this.loggedIn = false;
    }

    isLoggedIn(){
        return this.loggedIn;
    }



}
