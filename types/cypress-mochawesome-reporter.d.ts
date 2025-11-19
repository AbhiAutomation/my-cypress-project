// types/cypress-mochawesome-reporter.d.ts

declare module "cypress-mochawesome-reporter/plugin" {
  // The plugin function accepts the Cypress `on` handler and optional config.
  // Use `any` for simplicity — this file only silences TS missing-declarations errors.
  export default function plugin(on: any, config?: any): void;
}

declare module "cypress-mochawesome-reporter/register";
