import { WorkspaceBasePage } from "./workspace-base-page";

export class CreateGatewayServicePage extends WorkspaceBasePage {
  // Locators for form elements
  fullUrlInputLocator = "[data-testid='gateway-service-url-input']";
  gatewayServiceNameInputLocator = "[data-testid='gateway-service-name-input']";

  // Locators for form buttons
  saveButtonLocator = "[data-testid='service-create-form-submit']";

  // Locators for error messages
  errorMessageLocator = "[data-testid='form-error'] .alert-message li";

  // Fill out the form and submit to create a new gateway service
  createGatewayService(fullUrl: string, serviceName: string) {
    cy.get(this.fullUrlInputLocator).clear().type(fullUrl);
    cy.get(this.gatewayServiceNameInputLocator).clear().type(serviceName);
    cy.get(this.saveButtonLocator).click();
  }

  // Get the error message displayed on the form
  getErrorMessage() {
    return cy.get(this.errorMessageLocator);
  }
}
