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
            .map(res => res.json() )
            .subscribe(
                // We're assuming the response will be an object
                // with the JWT on an id_token key
                data => localStorage.setItem('access_token', data.access_token),
                error => console.log(error)
            );
    }
}

    }



  constructor( private authService: AuthService, private router: Router, private route: ActivatedRoute, public http: Http) {


  }

    onSubmit(email, password){
        this.authService.login(email, password).subscribe((result) => {
            if(result){
                this.router.navigate(['']);
            }
        })
    }

    login(event, username, password) {



        event.preventDefault();
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
            );
    }


}
