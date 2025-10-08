import { WorkspaceBasePage } from "./workspace-base-page";

export class GatewayServicesPage extends WorkspaceBasePage {
  // Locator for the "New gateway service" button
  newGatewayServiceSpanLocator = '[data-testid="kui-icon-wrapper-add-icon"]';

  // Click the "New gateway service" button to open the create gateway service page
  openCreateGatewayServicePage() {
    cy.get(this.newGatewayServiceSpanLocator).click();
  }

  // Open a gateway service by its name
  openGatewayServiceByName(serviceName: string) {
    cy.get(`[data-testid="${serviceName}"]`).click();
  }
}
