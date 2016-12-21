import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GithubApiService } from '../github-api.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-gist-content',
  templateUrl: './gist-content.component.html'
})
export class GistContentComponent implements OnInit {
    id: number;
gist: Object;
  constructor(private route: ActivatedRoute, private router: Router, private _apiService: GithubApiService) {

  }

  ngOnInit() {
      console.log(this.route.snapshot.params['id']);
      this.id = this.route.snapshot.params['id'];

      this._apiService.getGist(this.route.snapshot.params['id']).subscribe(
          function(gist){
              this.gist = gist.description;

              var iframe = document.createElement('iframe');
              iframe.setAttribute('width', '100%');
              iframe.setAttribute('frameborder', '0');
              iframe.id = "gist-" + gist.id;
              let b = document.getElementById('gist-content');

              b.appendChild(iframe);

              var iframeHtml = '<html><head><base target="_parent"><style>table{font-size:12px;}</style></head><body onload="parent.document.getElementById(\'' + iframe.id + '\').style.height=document.body.scrollHeight + \'px\'"><scr' + 'ipt type="text/javascript" src="https://gist.github.com/' + gist.id + '.js"></sc'+'ript></body></html>';

              this.doc = (<HTMLIFrameElement> iframe).contentWindow;
              if (iframe.contentDocument) this.doc = iframe.contentDocument;
              else if (iframe.contentWindow) this.doc = iframe.contentWindow.document;

              this.doc.open();
              this.doc.writeln(iframeHtml);
              this.doc.close();
          },
          //gist => this.gist = gist.description,
          error => console.log('Error fetching stories')

      );

  }

}