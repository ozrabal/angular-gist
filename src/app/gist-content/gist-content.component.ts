import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-gist-content',
  templateUrl: './gist-content.component.html',
  styleUrls: ['./gist-content.component.scss']
})
export class GistContentComponent implements OnInit {
    id: number;

  constructor(private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
      console.log(this.route.snapshot.params['id']);
      this.id = this.route.snapshot.params['id'];
  }

}
