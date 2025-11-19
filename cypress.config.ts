import { defineConfig } from "cypress";
import mochawesome from  "cypress-mochawesome-reporter/plugin";


export default defineConfig({
  
  reporter: "cypress-mochawesome-reporter",

  e2e: {
    setupNodeEvents(on, config) {
      
      mochawesome(on);   // register mochawesome event listener
     // implement node event listeners here
    },
    retries:{
      runMode: 1
    },
    projectId: "jfzmoc",
    specPattern: "cypress/integration/examples/**/*.cy.ts",
    supportFile: "cypress/support/e2e.ts",
  },
     env: {
     url: "https://rahulshettyacademy.com",
     //username: "rahulshettyacademy",
    // password: "learning",
     //productName: "Blackberry"
  },

  
});
