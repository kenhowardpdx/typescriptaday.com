import { TypescriptpdxPage } from './app.po';

describe('typescriptpdx App', () => {
  let page: TypescriptpdxPage;

  beforeEach(() => {
    page = new TypescriptpdxPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
