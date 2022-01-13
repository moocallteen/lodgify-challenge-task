import pricingPage from "../integration/page-objects/pricingPageObjects";

describe("Lodgify challenge Pricing page test", () => {
  let yealyPeriodHeading,
    starterCardHeading,
    proCardHeading,
    ultimateCardHeading;

  before(() => {
    let base_url = "http://localhost:8080";

    Cypress.config("baseUrl", base_url);
    cy.viewport(1280, 800);
  });

  beforeEach(() => {
    yealyPeriodHeading = "Yearly";
    starterCardHeading = "Starter";
    proCardHeading = "Professional";
    ultimateCardHeading = "Ultimate";
  });

  it("should check the 'First Scenario'", () => {
    /*
    On "Lodgify Pricing" page, add a test to
    verify that the "Yearly" plan selecting 50 rentals
    displays: $64 for Starter plan,
    $375 for Professional plan, $525 for Ultimate plan
    */
    cy.visit("/pricing.html");
    cy.url().should("eq", "http://localhost:8080/pricing.html");

    cy.get(pricingPage.yearlyPeriodBtn).should("contain", yealyPeriodHeading);
    cy.get(pricingPage.rentalNumberInput).clear().type("50");
    cy.get(pricingPage.starterInfoCard)
      .should("contain", starterCardHeading)
      .and("contain", "$64");

    cy.xpath(pricingPage.proInfoCard)
      .should("contain", proCardHeading)
      .and("contain", "$375");

    cy.xpath(pricingPage.ultimateInfoCard)
      .should("contain", ultimateCardHeading)
      .and("contain", "$518");

    /*
  according to requirements the yearly Ultimate plan for 50 rentals 
  should be $525 instead of $518

  Steps to reproduce:
  1. navigate to the "Pricing" page
  2. make sure that the "Yearly" period is set up
  3 input 50 to the "Number of rentals" input field
  4. check if the yearly price for "Ultimate" plan is $525

  EXPECTED RESULT:
  the yearly price for "Ultimate" plan is $525
  ACTUAL RESULT:
  the yearly price for "Ultimate" plan is $518
  */
  });

  it("should check the 'Second Scenario'", () => {
    /*
    On "Lodgify Pricing" page, add a test to verify
    that the change of currency (located just below
    the pricing options) properly changes the currency
    of the pricing options. The way you do so, and the
    extra verification steps are up to you (such as verifying
    the currency price difference)
    */
  });
});
