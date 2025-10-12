declare namespace Cypress {
  interface Chainable {
    gotoGatewayServices(): Chainable<void>;
    createGatewayService(fullUrl: string, serviceName: string): Chainable<void>;
    createRouteForGatewayService(
      gatewayServiceName: string,
      routeName: string,
      routePath: string,
    ): Chainable<void>;
    deleteGatewayServiceWithRouteByApi(
      gatewayServiceName: string,
      routeName: string,
    ): Chainable<void>;
    deleteGatewayServiceByApi(gatewayServiceName: string): Chainable<void>;
  }
}
