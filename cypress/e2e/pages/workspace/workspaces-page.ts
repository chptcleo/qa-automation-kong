import { BasePage } from "../common/base-page";

export class WorkspacesPage extends BasePage {
  // Locator for workspace items in the list
  workspaceItemsLocator = ".k-table-data tbody tr";

  // Locator for workspace name within a workspace item
  workspaceNameLocator = ".workspace-name";

  // Get all workspace items
  getWorkspaceItems() {
    return cy.get(this.workspaceItemsLocator);
  }

  // Open a workspace by its name
  openWorkspaceByName(workspaceName: string) {
    let workspaceFound = false;

    this.getWorkspaceItems()
      .each(($item) => {
        if (
          $item.find(this.workspaceNameLocator).text().trim() === workspaceName
        ) {
          cy.wrap($item).click();
          workspaceFound = true;
          return false;
        }
      })
      .then(() => {
        if (!workspaceFound) {
          throw new Error(`Workspace "${workspaceName}" not found`);
        }
      });
  }
}
