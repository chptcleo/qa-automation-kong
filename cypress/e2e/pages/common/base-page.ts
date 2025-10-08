export class BasePage {
  // Get the title of the current page
  getTitle() {
    return cy.title();
  }
}
