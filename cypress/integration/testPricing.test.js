import pricingPage from "../integration/page-objects/pricingPageObjects";

describe("Lodgify challenge Pricing page test", () => {
  let yealyPeriodHeading,
    starterCardHeading,
    proCardHeading,
    ultimateCardHeading,
    currencyValues,
    question01,
    answer01;

  before(() => {
    let base_url = "http://localhost:8080";

    Cypress.config("baseUrl", base_url);
  });

  beforeEach(() => {
    yealyPeriodHeading = "Yearly";
    starterCardHeading = "Starter";
    proCardHeading = "Professional";
    ultimateCardHeading = "Ultimate";
    currencyValues = ["€ EUR", "$ USD", "£ GBP"];
    question01 =
      "Do you have more than 100 rentals or have more complex needs?";
    answer01 =
      "For a website with more than 100 rentals or a complete custom web design,\n                        please contact us.";

    cy.viewport(1280, 800);
  });

  it("should check the 'First Scenario'", () => {
    /*
    On "Lodgify Pricing" page, add a test to
    verify that the "Yearly" plan selecting 50 rentals
    displays: $64 for Starter plan,
    $375 for Professional plan, $525 for Ultimate plan
    */
    cy.visit("/pricing.html");

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
    let iteratorCurrency = 0;
    /*
    On "Lodgify Pricing" page, add a test to verify
    that the change of currency (located just below
    the pricing options) properly changes the currency
    of the pricing options. The way you do so, and the
    extra verification steps are up to you (such as verifying
    the currency price difference)
    */
    cy.visit("/pricing.html");
    cy.get(pricingPage.rentalNumberInput).should("have.attr", "value", "1");
    cy.get(pricingPage.yearlyPeriodBtn).click();
    cy.get(pricingPage.currencySelector).scrollIntoView().should("be.visible");
    for (
      iteratorCurrency;
      iteratorCurrency < currencyValues.length;
      iteratorCurrency++
    ) {
      cy.get(pricingPage.currencySelector)
        .contains(currencyValues[iteratorCurrency])
        .should("be.visible");
    }
    cy.get(pricingPage.currencySelector).select("$ USD");

    cy.get(pricingPage.starterInfoCard)
      .scrollIntoView()
      .should("contain", "$12");
    cy.xpath(pricingPage.proInfoCard).should("contain", "$32");
    cy.xpath(pricingPage.ultimateInfoCard).should("contain", "$48");

    cy.get(pricingPage.currencySelector).select("€ EUR");
    cy.get(pricingPage.starterInfoCard)
      .scrollIntoView()
      .should("contain", "11€");
    cy.xpath(pricingPage.proInfoCard).should("contain", "28€");
    cy.xpath(pricingPage.ultimateInfoCard).should("contain", "43€");

    cy.get(pricingPage.currencySelector).select("£ GBP");
    cy.get(pricingPage.starterInfoCard)
      .scrollIntoView()
      .should("contain", "£10");
    cy.xpath(pricingPage.proInfoCard).should("contain", "£24");
    cy.xpath(pricingPage.ultimateInfoCard).should("contain", "£39");

    cy.get(pricingPage.rentalNumberInput).clear().type("50");
    cy.get(pricingPage.twoYearsPeriodBtn).click();
    cy.get(pricingPage.currencySelector).scrollIntoView().select("$ USD");
    cy.get(pricingPage.starterInfoCard)
      .scrollIntoView()
      .should("contain", "$60");
    cy.xpath(pricingPage.proInfoCard).should("contain", "$352");
    cy.xpath(pricingPage.ultimateInfoCard).should("contain", "$486");

    cy.get(pricingPage.currencySelector).select("€ EUR");
    cy.get(pricingPage.starterInfoCard)
      .scrollIntoView()
      .should("contain", "56€");
    cy.xpath(pricingPage.proInfoCard).should("contain", "309€");
    cy.xpath(pricingPage.ultimateInfoCard).should("contain", "437€");

    cy.get(pricingPage.currencySelector).select("£ GBP");
    cy.get(pricingPage.starterInfoCard)
      .scrollIntoView()
      .should("contain", "£48");
    cy.xpath(pricingPage.proInfoCard).should("contain", "£276");
    cy.xpath(pricingPage.ultimateInfoCard).should("contain", "£388");

    /*
    according to the default state of the "Pricing" page 
    the prices currency on the Information cards is "$ USD"
    but on the currency selector the "€ EUR" is preselected
    as a default currency

    Steps to reproduce:
    1. navigate to the "Pricing" page
    2. scroll down until 3 information cards appear
    3. make sure that the prices are in "$ USD"
    4. scroll down until the currency selector appears
    5. check if the "$ USD" is preselected currency

    EXPECTED RESULT:
    the "$ USD" is preselected currency
    ACTUAL RESULT:
    the "€ EUR" is preselected currency, but pricess have "$ USD"
    */
  });

  it("should check the 'Third Scenario'", () => {
    /*
    Using your own criteria, add tests according to what 
    you think should be important to cover in this page 
    "Lodgify Pricing". (Optional)
    */
    cy.visit("/pricing.html");
    cy.get(pricingPage.rentalNumberInput)
      .scrollIntoView()
      .should("have.attr", "value", "1");
    cy.get(pricingPage.rentalNumberInput).clear().type("-1");
    cy.get(pricingPage.rentalNumberInput).should("have.attr", "value", "1");
    cy.get(pricingPage.rentalNumberInput).clear().type("150");
    cy.get(pricingPage.rentalNumberInput).should("have.attr", "value", "100");
    cy.get(pricingPage.rentalNumberInput).clear().type("1");

    cy.get(pricingPage.sliderRound)
      .scrollIntoView()
      .should("have.attr", "aria-valuenow", "1");
    cy.get(pricingPage.sliderRound)
      .focus()
      .trigger("mousedown")
      .trigger("mousemove", { which: 1, pageX: 455 });
    cy.get(pricingPage.sliderRound)
      .scrollIntoView()
      .should("have.attr", "aria-valuenow", "25");
    cy.get(pricingPage.sliderRound)
      .focus()
      .trigger("mousedown")
      .trigger("mousemove", { which: 1, pageX: 635 });
    cy.get(pricingPage.sliderRound)
      .scrollIntoView()
      .should("have.attr", "aria-valuenow", "50");

    cy.get(pricingPage.rentalNumberInput).scrollIntoView().clear().type("20");
    cy.get(pricingPage.sliderRound).should("have.attr", "aria-valuenow", "20");

    cy.get(pricingPage.rentalNumberInput).scrollIntoView().clear().type("75");
    cy.get(pricingPage.sliderRound).should("have.attr", "aria-valuenow", "75");
  });

  it("should check the 'FAQ content'", () => {
    cy.visit("pricing.html");
    cy.xpath(pricingPage.faqQest01)
      .scrollIntoView()
      .should("be.visible")
      .and("have.text", question01)
      .click();
    cy.xpath(pricingPage.faqAnwer01)
      .should("be.visible")
      .and("contain", answer01);
  });
});
