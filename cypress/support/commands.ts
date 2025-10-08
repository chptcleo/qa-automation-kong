/// <reference types="cypress" />
import { PageUtils } from "./page-utils";
import { OverviewPage } from "../e2e/pages/workspace/overview-page";
import { WorkspacesPage } from "../e2e/pages/workspace/workspaces-page";
import { GatewayServicesPage } from "../e2e/pages/workspace/gateway-services-page";
import { CreateGatewayServicePage } from "../e2e/pages/workspace/create-gateway-service-page";
import { ViewingGatewayServicePage } from "../e2e/pages/workspace/gateway-service/viewing-gateway-service-page";
import { CreateRoutePage } from "../e2e/pages/workspace/create-route-page";

// Custom command to navigate to the Gateway Services page
Cypress.Commands.add("gotoGatewayServices", () => {
  const pageUtils = new PageUtils();
  pageUtils.openWorkspacesPage();
  const workspacesPage = new WorkspacesPage();
  workspacesPage.getTitle().should("eq", "Workspaces | Kong Manager");

  workspacesPage.openWorkspaceByName("default");
  const overviewPage = new OverviewPage();
  overviewPage.getTitle().should("eq", "Overview | Kong Manager");

  overviewPage.navigateToGatewayServices();
  const gatewayServicesPage = new GatewayServicesPage();
  gatewayServicesPage
    .getTitle()
    .should("eq", "Gateway Services | Kong Manager");
});

// Custom command to create a new Gateway Service
Cypress.Commands.add(
  "createGatewayService",
  (fullUrl: string, gatewayServiceName: string) => {
    const gatewayServicesPage = new GatewayServicesPage();
    gatewayServicesPage
      .getTitle()
      .should("eq", "Gateway Services | Kong Manager");
    gatewayServicesPage.openCreateGatewayServicePage();
    const createGatewayServicePage = new CreateGatewayServicePage();
    createGatewayServicePage
      .getTitle()
      .should("eq", "Create Gateway Service | Kong Manager");

    createGatewayServicePage.createGatewayService(fullUrl, gatewayServiceName);
  }
);

// Custom command to create a new Route for a given Gateway Service
Cypress.Commands.add(
  "createRouteForGatewayService",
  (gatewayServiceName: string, routeName: string, routePath: string) => {
    const gatewayServicesPage = new GatewayServicesPage();
    gatewayServicesPage
      .getTitle()
      .should("eq", "Gateway Services | Kong Manager");
    gatewayServicesPage.openGatewayServiceByName(gatewayServiceName);
    const viewingGatewayServicePage = new ViewingGatewayServicePage();
    viewingGatewayServicePage
      .getTitle()
      .should("eq", "Viewing Gateway Service | Kong Manager");
    viewingGatewayServicePage.getName().should("have.text", gatewayServiceName);

    viewingGatewayServicePage.openActionPage("add-route");
    const createRoutePage = new CreateRoutePage();
    createRoutePage.getTitle().should("eq", "Create route | Kong Manager");

    createRoutePage.createRoute(routeName, routePath);
  }
);

// Custom command to delete a Gateway Service and its Route by API
Cypress.Commands.add(
  "deleteGatewayServiceWithRouteByApi",
  (gatewayServiceName: string, routeName: string) => {
    cy.request({
      method: "GET",
      url: `${Cypress.env("API_URL")}/default/services/`,
      failOnStatusCode: false,
    }).then((response) => {
      const gatewayServices = response.body.data;
      const gatewayService = gatewayServices.find(
        (service: any) => service.name === gatewayServiceName
      );
      // If the service does not exist, exit early
      if (!gatewayService) {
        return;
      }
      const serviceId = gatewayService.id;
      cy.request({
        method: "GET",
        url: `${Cypress.env("API_URL")}/default/services/${serviceId}/routes`,
        failOnStatusCode: false,
      }).then((response) => {
        const routes = response.body.data;
        const route = routes.find((route: any) => route.name === routeName);
        // If the route exists, delete it first
        if (route) {
          const routeId = route.id;
          cy.request({
            method: "DELETE",
            url: `${Cypress.env(
              "API_URL"
            )}/default/services/${serviceId}/routes/${routeId}`,
            failOnStatusCode: false,
          });
        }
        // Finally, delete the service
        cy.request({
          method: "DELETE",
          url: `${Cypress.env("API_URL")}/default/services/${serviceId}`,
          failOnStatusCode: false,
        });
      });
    });
  }
);

// Custom command to delete a Gateway Service by API
Cypress.Commands.add(
  "deleteGatewayServiceByApi",
  (gatewayServiceName: string) => {
    cy.request({
      method: "GET",
      url: `${Cypress.env("API_URL")}/default/services/`,
      failOnStatusCode: false,
    }).then((response) => {
      const gatewayServices = response.body.data;
      const gatewayService = gatewayServices.find(
        (service: any) => service.name === gatewayServiceName
      );
      if (!gatewayService) {
        return;
      }
      const serviceId = gatewayService.id;
      cy.request({
        method: "DELETE",
        url: `${Cypress.env("API_URL")}/default/services/${serviceId}`,
        failOnStatusCode: false,
      });
    });
  }
);
