import { GatewayServiceBasePage } from "./gateway-service-base-page";

export class RoutesPage extends GatewayServiceBasePage {
  // Get the name element of a route by route name
  getNameByRouteName(routeName: string) {
    return cy.get(`[data-testid="${routeName}"] [data-testid="name"] b`);
  }

  // Get the paths element of a route by route name
  getPathsByRouteName(routeName: string) {
    return cy.get(
      `[data-testid="${routeName}"] [data-testid="paths"] .badge-content-wrapper`
    );
  }
}
