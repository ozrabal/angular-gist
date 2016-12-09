import { AngularGistPage } from './app.po';

describe('angular-gist App', function() {
  let page: AngularGistPage;

  beforeEach(() => {
    page = new AngularGistPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
