import { defineConfig } from "cypress";
import { allureCypress } from "allure-cypress/reporter";
import { plugin as cypressGrepPlugin } from "@cypress/grep/plugin";

export default defineConfig({
  env: {
    // Always enable spec filtering
    grepFilterSpecs: true,
    // Always omit filtered tests
    grepOmitFiltered: true,
  },
  e2e: {
    supportFile: "cypress/support/e2e.ts",
    specPattern: "cypress/e2e/**/*.cy.ts",

    setupNodeEvents(on, config) {
      // implement node event listeners here
      allureCypress(on, config);
      cypressGrepPlugin(config);
      return config;
    },
  },
});
