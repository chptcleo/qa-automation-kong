import { ViewingGatewayServicePage } from "../pages/workspace/gateway-service/viewing-gateway-service-page";
import { RoutesPage } from "../pages/workspace/gateway-service/routes-page";

describe("Create Service With Route", () => {
  // Page objects
  let viewingGatewayServicePage: ViewingGatewayServicePage;
  let routesPage: RoutesPage;

  // Test data
  const host = "httpbin.konghq.com";
  const protocol = "http";
  const fullUrl = `${protocol}://${host}`;
  const gatewayServiceName = "auto-test-service";
  const routeName = "auto-test-route";
  const routePath = `/mock`;

  before(() => {
    // Cleanup the created service and route in last run
    // The reason why cleanup in before rather than after is that helping QA to investigate the failed case
    cy.deleteGatewayServiceWithRouteByApi(gatewayServiceName, routeName);
  });

  beforeEach(() => {
    cy.gotoGatewayServices();
  });

  it(
    "Can create a new service",
    { tags: ["ui", "smoke", "regression"] },
    () => {
      cy.createGatewayService(fullUrl, gatewayServiceName);
      viewingGatewayServicePage = new ViewingGatewayServicePage();
      viewingGatewayServicePage
        .getTitle()
        .should("eq", "Viewing Gateway Service | Kong Manager");
      viewingGatewayServicePage
        .getName()
        .should("have.text", gatewayServiceName);
      viewingGatewayServicePage.getProtocol().should("have.text", protocol);
      viewingGatewayServicePage.getHost().should("have.text", host);
    }
  );

  it(
    "Can create a new route for the service",
    { tags: ["ui", "smoke", "regression"] },
    () => {
      cy.createRouteForGatewayService(gatewayServiceName, routeName, routePath);
      routesPage = new RoutesPage();
      routesPage.getTitle().should("eq", "Routes | Kong Manager");
      routesPage.getNameByRouteName(routeName).should("have.text", routeName);
      routesPage.getPathsByRouteName(routeName).should("have.text", routePath);
    }
  );
});
