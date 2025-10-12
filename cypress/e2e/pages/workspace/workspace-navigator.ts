export class WorkspaceNavigator {
  // Locator for the "Gateway Services" menu item in the sidebar
  gatewayServicesMenuItemLocator =
    "[data-testid='sidebar-item-gateway-services']";

  // Navigate to the Gateway Services page
  navigateToGatewayServices() {
    cy.get(this.gatewayServicesMenuItemLocator).click();
  }
}
