import { GatewayServiceBasePage } from "./gateway-service-base-page";

export class ViewingGatewayServicePage extends GatewayServiceBasePage {
  // Locators for service details
  nameSpanLocator = '[data-testid="name-plain-text"] span';
  protocolSpanLocator = '[data-testid="protocol-plain-text"] span';
  hostSpanLocator = '[data-testid="host-plain-text"] span';

  // Get the name of the service
  getName() {
    return cy.get(this.nameSpanLocator);
  }

  // Get the protocol of the service
  getProtocol() {
    return cy.get(this.protocolSpanLocator);
  }

  // Get the host of the service
  getHost() {
    return cy.get(this.hostSpanLocator);
  }
}
