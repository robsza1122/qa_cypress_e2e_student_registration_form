const { faker } = require('@faker-js/faker');
const { range } = require('./range');

function generateForm() {
  // name and lastName
  const name = faker.person.firstName();
  const lastName = faker.person.lastName();
  const randomNumber = String(Math.random()).slice(2, 6);
  // email
  const email = name + randomNumber + '@example.com';
  // gender
  const gendersArray = ['Male', 'Female', 'Other'];
  const randomGender = Math.floor(Math.random() * gendersArray.length);
  const gender = gendersArray[randomGender];
  // phoneNumber
  const phoneNumber = String(Math.floor(Math.random() * 10000000000));
  // dateOfBirth
  const months = range(1, 12, 1);
  const randomMonthIndex = Math.floor(Math.random() * months.length);
  const years = range(1925, 2026, 1);
  const randomYearIndex = Math.floor(Math.random() * years.length);
  const randomYear = years[randomYearIndex];
  const days = range(1, 31, 1);
  const randomDaysIndex = Math.floor(Math.random() * days.length);
  const stringedDay = String(days[randomDaysIndex]);
  const randomDay = days[randomDaysIndex].length === 2 ? `0${days[randomDaysIndex]}` : `00${days[randomDaysIndex]}`;
  const dateOfBirth = `${String(randomYear)}-${randomMonthIndex + 1}-${String(randomDay)}`;

  const getRandomDay = (chosenDay) => {
    let day = '';
    if (chosenDay.split('').length === 1) {
      day = `.react-datepicker__day--00${chosenDay}`;
    } else if (chosenDay.split('').length === 2) {
      day = `.react-datepicker__day--0${chosenDay}`;
    }

    return day;
  };

  const day = getRandomDay(stringedDay);
  // subjects
  const subjects = faker.company.catchPhrase();
  // currentAddress
  const currentAddress = faker.location.streetAddress({ useFullAddress: true });
  // state
  const states = ['NCR', 'Uttar Pradesh', 'Haryana', 'Rajasthan'];
  const randomStateIndex = String(Math.floor(Math.random() * 4));
  const state = states[randomStateIndex];
  // city

  const assignCityToState = (stateName = 'NCR') => {
    switch (stateName) {
      case 'NCR':
        return ['Delhi', 'Gurgaon', 'Noida'];
      case 'Uttar Pradesh':
        return ['Agra', 'Lucknow', 'Merrut'];
      case 'Haryana':
        return ['Karnal', 'Panipat'];
      case 'Rajasthan':
        return ['Jaipur', 'Jaiselmer'];
    }
  };

  const cities = assignCityToState(state);
  const randomCityIndex = Math.floor(Math.random() * cities.length);

  return {
    name,
    lastName,
    email,
    gender,
    phoneNumber,
    dateOfBirth,
    randomYear,
    subjects,
    randomMonthIndex,
    randomDaysIndex,
    randomCityIndex,
    randomStateIndex,
    day,
    currentAddress,
    states,
    state,
    cities
  };
}

module.exports = { generateForm };
