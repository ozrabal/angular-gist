import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { AuthService } from '../auth.service';
import { contentHeaders } from '../common/headers';
import 'rxjs/Rx';

interface Credentials{
    username: string,
    password: string
}

@Component({
  selector: 'app-login',
    //template: `..`
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

    ngOnInit():void {

if(!localStorage.getItem('access_token')){


    if(!this.route.snapshot.queryParams['code']) {
        window.location.href = 'https://github.com/login/oauth/authorize?scope=user:email gist&client_id=';
    }else{
        //token save
        console.log(this.route.snapshot.queryParams['code']);
        //localStorage.setItem('access_token', this.route.snapshot.queryParams['access_token']);
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        //headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
        headers.append('Accept', 'application/json');

        let v = 'client_id=&client_secret=&code='+this.route.snapshot.queryParams['code'];


        this.http.post('https://github.com/login/oauth/access_token?'+v,  '',{
                headers: headers
            })
            .map(response => response.json() )
            .subscribe(
                function(response) { console.log("Success Response" + response)},
                function(error) { console.log("1Error happened" + error)},
                function() { console.log("the subscription is completed")}
            );
            /*.map((response) => {
                console.log(response);
                localStorage.setItem('access_token', response);
                if (response.success) {
                    localStorage.setItem('auth_token', response.auth_token);
                   // this.loggedIn = true;
                }

                return response.success;
            });*/
            /*.subscribe(
                // We're assuming the response will be an object
                // with the JWT on an id_token key
                response => {

                    localStorage.setItem('access_token', 'd');},
                error => console.log(error),
                complete => {console.log(response);}
            );*/
    }
    }

    }



  constructor( private authService: AuthService, private router: Router, private route: ActivatedRoute, public http: Http) {
      this.http = http;

  }

    /*onSubmit(email, password){
        this.authService.login(email, password).subscribe((result) => {
            if(result){
                this.router.navigate(['']);
            }
        })
    }*/

    zlogin(event, username, password) {

        //token save
        console.log(this.route.snapshot.queryParams['code']);
        //localStorage.setItem('access_token', this.route.snapshot.queryParams['access_token']);
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        //headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
        headers.append('Accept', 'application/json');

        let v = 'client_id=&client_secret=&code='+this.route.snapshot.queryParams['code'];


        this.http.post('https://github.com/login/oauth/access_token?'+v,  '',{
            headers: headers
        })
            .map(response => response.json() )
            .subscribe(
                function(response) { console.log("Success Response" + response)},
                function(error) { console.log("Error happened" + error)},
                function() { console.log("the subscription is completed")}
            );

        /*event.preventDefault();
        let body = JSON.stringify({ username, password });
        this.http.get('')
            .subscribe(
                response => {
                    localStorage.setItem('id_token', response.json().id_token);
                    this.router.navigate(['home']);
                },
                error => {
                    alert(error.text());
                    console.log(error.text());
                }
            );*/
    }


}
