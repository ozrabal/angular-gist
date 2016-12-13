import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

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
export class LoginComponent {



  constructor( private authService: AuthService, private router: Router) { }

    onSubmit(email, password){
        this.authService.login(email, password).subscribe((result) => {
            if(result){
                this.router.navigate(['']);
            }
        })
    }


}
