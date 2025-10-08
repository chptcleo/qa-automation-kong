import { BasePage } from "../common/base-page";
import { WorkspaceNavigator } from "./workspace-navigator";
export class WorkspaceBasePage extends BasePage {
  // Navigator for workspace pages
  workspaceNavigator = new WorkspaceNavigator();

  // Navigate to the Gateway Services page
  navigateToGatewayServices() {
    this.workspaceNavigator.navigateToGatewayServices();
  }
}
