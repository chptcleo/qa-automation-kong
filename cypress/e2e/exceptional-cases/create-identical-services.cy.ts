import { CreateGatewayServicePage } from "../pages/workspace/create-gateway-service-page";
import { ViewingGatewayServicePage } from "../pages/workspace/gateway-service/viewing-gateway-service-page";

describe("Create Identical Services", () => {
  // Page objects
  let createGatewayServicePage: CreateGatewayServicePage;
  let viewingGatewayServicePage: ViewingGatewayServicePage;

  // Test data
  const host = "httpbin.konghq.com";
  const protocol = "http";
  const fullUrl = `${protocol}://${host}`;
  const gatewayServiceName = "auto-test-identical-service";

  before(() => {
    // Cleanup the created service in last run
    // The reason why cleanup in before rather than after is that helping QA to investigate the failed case
    cy.deleteGatewayServiceByApi(gatewayServiceName);
    cy.gotoGatewayServices();
  });

  it(
    "Can not create identical services",
    { tags: ["ui", "regression"] },
    () => {
      // Create the first service
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

      // Try to create the second service with the same name
      viewingGatewayServicePage.navigateToGatewayServices();
      cy.createGatewayService(fullUrl, gatewayServiceName);
      createGatewayServicePage = new CreateGatewayServicePage();
      createGatewayServicePage
        .getTitle()
        .should("eq", "Create Gateway Service | Kong Manager");
      createGatewayServicePage
        .getErrorMessage()
        .should(
          "include.text",
          `UNIQUE violation detected on '{name=\"${gatewayServiceName}\"}'`,
        );
    },
  );
});
