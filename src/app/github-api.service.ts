import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class GithubApiService {
  private _headers;

  constructor( private http: Http) {
    this._headers = new Headers();
    this._headers.append('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
  }

  fetchGists(user):Observable<any>{
    return this.http.get('https://api.github.com/users/' + user + '/gists' , {
          headers: this._headers
        })
        .map(response => response.json() );
  }

  getUser():Observable<any>{
    return this.http.get('https://api.github.com/user' , {
          headers: this._headers
        })
        .map(response => response.json() );
  }

    getGist(id:string):Observable<any>{

        return this.http.get('https://api.github.com/gists/'+id, {
            headers: this._headers
        })
            .map(response => response.json());

    }

}
