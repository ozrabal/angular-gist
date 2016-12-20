import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { AuthService } from '../auth.service';
import { contentHeaders } from '../common/headers';
import { AppConfig } from '../config/app.config';
import 'rxjs/Rx';

@Component({
    selector: 'app-login',
    template: ''
})
export class LoginComponent implements OnInit{

    constructor( private authService: AuthService, private router: Router, private route: ActivatedRoute, public http: Http, private _config: AppConfig) {
        this.http = http;
        this.router = router;
        this._config = _config;
    }

    ngOnInit():void {
        const API = this._config.get('API');
        console.log(API.OAUTH_URL);
        if(!localStorage.getItem('access_token')){

            if(!this.route.snapshot.queryParams['code']) {
                //OAUTH_URL
                //window.location.href = 'https://github.com/login/oauth/authorize?scope=user:email gist&client_id=f63ef0cba4f0757d893e';
                window.location.href = API.OAUTH_URL;
            }else{
            //token save
        console.log(this.route.snapshot.queryParams['code']);

        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Accept', 'application/json');

        let vv = this.route.snapshot.queryParams['code'];
let that = this;
        //PROXY_OAUTH_TOKEN_URL
        //this.http.post('http://localhost:3000/api/token/'+vv,  '',{
        this.http.post(API.PROXY_OAUTH_TOKEN_URL + vv,  '',{
                headers: headers
            })
            .map(response => response.json() )
            .subscribe(
                function(response) { console.log("Success Response" + response)
                    localStorage.setItem('access_token', response.access_token);
                    console.log(this);
                    that.router.navigate(['']);
                   return true;
                },
                function(error) { console.log("1Error happened" + error)},
                function() { console.log("the subscription is completed")}
            );



    }
    }else{
    //        console.log(this.router);
      //      this.router.navigate(['']);

        }
        //this.router.navigate(['']);

    }



}
