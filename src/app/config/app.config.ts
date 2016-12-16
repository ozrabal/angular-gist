import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/Rx';

@Injectable()

export class AppConfig {

    private _config: Object;

    constructor( private http: Http) {

    }

    load() {
        return new Promise((resolve, reject) => {
            this.http.get('app/config/app.config.json')
                .map(res => res.json())
                .catch((error: any) => {
                    console.error(error);
                    return Observable.throw(error.json().error || 'Server error');
                })
                .subscribe((data) => {
                    this._config = data;
                    resolve(true);
                });
        });
    }

    get(key: string) {
        return this._config[key];
    }
}