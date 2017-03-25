import { RestokePage } from './app.po';

describe('restoke App', () => {
  let page: RestokePage;

  beforeEach(() => {
    page = new RestokePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
