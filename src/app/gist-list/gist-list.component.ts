import { Component, OnInit } from '@angular/core';
import { GithubApiService } from '../github-api.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-gist-list',
  templateUrl: './gist-list.component.html'
})
export class GistListComponent implements OnInit {
  items;
  user;

  constructor(private _apiService: GithubApiService) {

  }

  ngOnInit() {
    this._apiService.getUser().subscribe(
        response => {
          this.user = response.login;
          this._apiService.fetchGists(this.user).subscribe(
              items => this.items = items,
              error => console.log('Error fetching stories')
          );
        },
        error => console.log('Error fetching stories')
    );
  }

}
