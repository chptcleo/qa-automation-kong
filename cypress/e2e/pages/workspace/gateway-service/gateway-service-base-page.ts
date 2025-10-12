import { WorkspaceBasePage } from "../workspace-base-page";

export class GatewayServiceBasePage extends WorkspaceBasePage {
  // Locator for action button
  actionButtonLocator = "[data-testid='header-actions']";

  // Open action menu and select an action
  openActionPage(actionName: string) {
    cy.get(this.actionButtonLocator).click();
    cy.get(`[data-testaction="action-${actionName}"]`).click();
  }
}
