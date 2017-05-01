import { TypeScriptADayPage } from './app.po';

describe('TypeScript A Day App', () => {
  let page: TypeScriptADayPage;

  beforeEach(() => {
    page = new TypeScriptADayPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
