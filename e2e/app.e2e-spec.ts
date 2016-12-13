import { VelvetcakePage } from './app.po';

describe('velvetcake App', function() {
  let page: VelvetcakePage;

  beforeEach(() => {
    page = new VelvetcakePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
