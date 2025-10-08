export class PageUtils {
  // Open the Workspaces page
  openWorkspacesPage() {
    cy.viewport(1920, 1080);
    cy.visit(Cypress.env("UI_URL"));
  }
}
