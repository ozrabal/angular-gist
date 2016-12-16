import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor( private router: Router ) { }

    canActivate() {
        //todo parse token
        if ( localStorage.getItem( 'access_token' ) ) {
            return true;
        }
        this.router.navigate( ['/login'] );
        return false;
    }
}