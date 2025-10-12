import { WorkspaceBasePage } from "./workspace-base-page";

export class CreateRoutePage extends WorkspaceBasePage {
  // Locators for form elements
  routeNameInputLocator = "[data-testid='route-form-name']";
  routePathInputLocator = "[data-testid='route-form-paths-input-1']";

  // Locators for form buttons
  saveButtonLocator = "[data-testid='route-create-form-submit']";

  // Fill out the form and submit to create a new route
  createRoute(routeName: string, routePath: string) {
    cy.get(this.routeNameInputLocator).clear().type(routeName);
    cy.get(this.routePathInputLocator).clear().type(routePath);
    cy.get(this.saveButtonLocator).click();
  }
}
