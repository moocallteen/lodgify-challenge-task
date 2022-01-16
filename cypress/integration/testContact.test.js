import contactPage from "../integration/page-objects/contactPageObjects";
import { v4 as uuid } from "uuid";
import { times } from "lodash";

describe("Lodgify challenge Contact page tests", () => {
  let nameValidationMessage,
    emailValidationMessage,
    emailFormatValMessage,
    validEmail,
    commentValidationMessage,
    namePlaceHolder,
    phonePlaceholder,
    emailPlaceholder,
    guestPlaceholder,
    arrivalPlaceholder,
    departurePlaceholder,
    commentPlaceholder,
    commentDummyData,
    errorBarText,
    contactPhoneNumber,
    arrivalDateValue,
    departureDateValue;

  before(() => {
    let base_url = "http://localhost:8080";

    Cypress.config("baseUrl", base_url);
  });

  beforeEach(() => {
    nameValidationMessage = "Name is mandatory";
    emailValidationMessage = "Email is mandatory";
    emailFormatValMessage = "The email provided is not valid";
    commentValidationMessage = "Comment is mandatory";
    commentDummyData = uuid();
    namePlaceHolder = "Name";
    phonePlaceholder = "Phone";
    emailPlaceholder = "Email";
    guestPlaceholder = "Guests";
    arrivalPlaceholder = "Arrival";
    departurePlaceholder = "Departure";
    commentPlaceholder = "Comment";
    errorBarText = "Error";
    contactPhoneNumber = "+34555278878278878";
    arrivalDateValue = "14/04/2022";
    departureDateValue = "14/06/2022";

    validEmail =
      namePlaceHolder + "@" + phonePlaceholder + "." + commentPlaceholder;

    cy.viewport(1280, 800);
  });

  it("should check the mandatory fields validation messages", () => {
    /* 
    1."Name" is mandatory
    2."Phone number" is mandatory
    3."Email address" is mandatory
    4."Comment" is mandatory
    5.add a random Lorem Ipsum of your choice to "Comment" field
    */
    cy.visit("/contact.html");

    cy.get(contactPage.sendButton).scrollIntoView().click();
    cy.get(contactPage.nameInput)
      .should("have.attr", "placeholder", namePlaceHolder)
      .find("+ div")
      .should("have.text", nameValidationMessage);
    cy.get(contactPage.nameInput)
      .type(namePlaceHolder)
      .find("+ div")
      .should("not.exist");

    cy.get(contactPage.phoneImput)
      .should("have.attr", "placeholder", phonePlaceholder)
      .find("+ div")
      .should("not.exist");
    cy.get(contactPage.phoneImput).type(contactPhoneNumber);

    cy.get(contactPage.emailInput)
      .should("have.attr", "placeholder", emailPlaceholder)
      .find("+ div")
      .should("have.text", emailValidationMessage);
    cy.get(contactPage.emailInput)
      .type(validEmail)
      .find("+ div")
      .should("not.exist");

    cy.get(contactPage.guestsInput)
      .should("have.attr", "placeholder", guestPlaceholder)
      .find("+ div")
      .should("not.exist");
    cy.get(contactPage.guestsInput).click().type("1");

    cy.get(contactPage.arrivalInput)
      .should("have.attr", "placeholder", arrivalPlaceholder)
      .find("+ div")
      .should("not.exist");

    cy.get(contactPage.departureInput)
      .should("have.attr", "placeholder", departurePlaceholder)
      .find("+ div")
      .should("not.exist");

    cy.get(contactPage.commentInput)
      .should("have.attr", "placeholder", commentPlaceholder)
      .find("+ div")
      .should("have.text", commentValidationMessage);
    cy.get(contactPage.commentInput)
      .type(commentDummyData)
      .find("+ div")
      .should("not.exist");
    cy.get(contactPage.sendButton).click();

    cy.get(contactPage.errorMessageBar)
      .should("be.visible")
      .and("have.text", errorBarText);

    /* 
    according to requirements the "Phone" input field should have
    validation message if the field is epmty

    Steps to reproduce:
    1. navigate to the "Contact" page
    2. fill the "Name", "Email", "Comment" input field
    3. click the "Send" button
    4. check if there is the validation message on the
    "Phone" input field

    EXPECTED RESULT:
    there is the validation message on the
    "Phone" input field
    ACTUAL RESULT:
    there is no validation message on the
    "Phone" input field
    */
  });

  it("should check the email format validation", () => {
    cy.visit("/contact.html");
    cy.get(contactPage.nameInput).type(namePlaceHolder);
    cy.get(contactPage.commentInput).type(commentDummyData);
    cy.get(contactPage.emailInput).type(emailPlaceholder);
    cy.get(contactPage.sendButton).click();
    cy.get(contactPage.emailInput)
      .find("+ div")
      .should("have.text", emailFormatValMessage);

    cy.get(contactPage.emailInput).type("@");
    cy.get(contactPage.sendButton).click();
    cy.get(contactPage.emailInput)
      .find("+ div")
      .should("have.text", emailFormatValMessage);

    cy.get(contactPage.emailInput).type(namePlaceHolder);
    cy.get(contactPage.sendButton).click();
    cy.get(contactPage.emailInput)
      .find("+ div")
      .should("have.text", emailFormatValMessage);

    cy.get(contactPage.emailInput).type(".");
    cy.get(contactPage.sendButton).click();
    cy.get(contactPage.emailInput)
      .find("+ div")
      .should("have.text", emailFormatValMessage);

    cy.get(contactPage.emailInput).type(commentPlaceholder);
    cy.get(contactPage.sendButton).click();
    cy.get(contactPage.emailInput).find("+ div").should("not.exist");
  });

  it("should check the phone input validations", () => {
    cy.visit("/contact.html");
    cy.get(contactPage.nameInput).type(namePlaceHolder);
    cy.get(contactPage.emailInput).type(validEmail);
    cy.get(contactPage.commentInput).type(commentDummyData);
    cy.get(contactPage.sendButton).click();
    cy.get(contactPage.errorMessageBar)
      .should("be.visible")
      .and("have.text", errorBarText);

    cy.get(contactPage.phoneImput).type(phonePlaceholder);
    cy.get(contactPage.phoneImput).should("have.attr", "value", "");
    cy.get(contactPage.phoneImput).type(contactPhoneNumber);
    cy.get(contactPage.phoneCountryIcon).should("have.attr", "alt", "Spain");
  });

  it("should check the day picker", () => {
    /*
    pick the date of arrival "April 14th" and 
    date of departure "June 14" to verify 
    the datepicker is working as expected 
    */
    cy.visit("/contact.html");
    cy.get(contactPage.nameInput).type(namePlaceHolder);
    cy.get(contactPage.phoneImput).type(contactPhoneNumber);
    cy.get(contactPage.emailInput).type(validEmail);
    cy.get(contactPage.guestsInput).type("1");
    cy.get(contactPage.commentInput).type(commentDummyData);

    cy.get(contactPage.arrivalInput).click();
    cy.get(contactPage.daypickerModal).should("be.visible");
    times(2, () => {
      cy.get(contactPage.nextMonthButton).click();
    });
    cy.get(contactPage.daypickerModalHeading)
      .should("be.visible")
      .and("contain", "April 2022");
    cy.get(contactPage.arrivalDate).click();
    times(2, () => {
      cy.get(contactPage.nextMonthButton).click();
    });
    cy.get(contactPage.daypickerModalHeading)
      .should("be.visible")
      .and("contain", "June 2022");
    cy.get(contactPage.departureDate).click();
    cy.get(contactPage.arrivalInput).should(
      "have.attr",
      "value",
      arrivalDateValue
    );
    cy.get(contactPage.departureInput).should(
      "have.attr",
      "value",
      departureDateValue
    );
    cy.get(contactPage.clearDatesButton).should("be.visible").click();
    cy.get(contactPage.arrivalInput).should("have.attr", "value", "");
    cy.get(contactPage.departureInput).should("have.attr", "value", "");
  });
});
