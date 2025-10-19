/// <reference types='cypress' />

const { generateForm } = require('./generateForm');
const { monthsNames } = require('./months');

const {
  name,
  lastName,
  email,
  gender,
  phoneNumber,
  randomYear,
  randomDaysIndex,
  day,
  randomMonthIndex,
  randomCityIndex,
  randomStateIndex,
  currentAddress,
  states,
  cities
} = generateForm();

const form = [
  { StudentName: `${name} ${lastName}` },
  { StudentEmail: email },
  { gender },
  { mobile: phoneNumber },
  { dateOfBirth: `${randomDaysIndex + 1} ${monthsNames[randomMonthIndex]},${randomYear}` },
  { subjects: 'English, Maths' },
  { hobbies: 'Sports' },
  { picture: null },
  { address: currentAddress },
  { stateAndCity: `${states[randomStateIndex]} ${cities[randomCityIndex]}` }
];

describe('Student Registration page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should show appropriate data in modal window', () => {
    cy.get('#firstName')
      .type(name);
    cy.get('#lastName')
      .type(lastName);
    cy.get('#userEmail')
      .type(email);
    cy.contains('.custom-control-label', gender)
      .click();
    cy.get('#userNumber')
      .type(phoneNumber);
    cy.get('.subjects-auto-complete__value-container')
      .type('e');
    cy.get('#react-select-2-option-0')
      .click();
    cy.get('.subjects-auto-complete__value-container')
      .type('s');
    cy.get('#react-select-2-option-1')
      .click();

    cy.contains('.custom-control-label', 'Sports')
      .click();
    cy.get('#currentAddress')
      .type(currentAddress);
    cy.get('#state')
      .click();
    cy.get(`#react-select-3-option-${randomStateIndex}`)
      .click();
    cy.get('#city')
      .click();
    cy.get(`#react-select-4-option-${randomCityIndex}`)
      .click();
    cy.get('#dateOfBirthInput')
      .click();
    cy.get('.react-datepicker__year-select')
      .select(String(randomYear));
    cy.get('.react-datepicker__month-select')
      .select(String(randomMonthIndex));
    cy.contains(day, randomDaysIndex + 1)
      .click();
    cy.get('button[type="submit"]')
      .click();
    form.forEach((value, i) => {
      if (Object.keys(value)[0] === 'picture') {
        return;
      }
      cy.assertFormValues(i + 1, ...Object.values(value));
    });
  });
});
