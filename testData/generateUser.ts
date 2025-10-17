import Chance from 'chance';

const chance = new Chance();

export interface User {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  ssn: string;
  username: string;
  password: string;
}

/** Generates a random  user */
export function generateUser(): User {
  const firstName = chance.first();
  const lastName = chance.last();
  const username = `${firstName.toLowerCase()}_${Date.now().toString(36)}`;

  return {
    firstName,
    lastName,
    address: chance.address(),
    city: chance.city(),
    state: chance.state(),
    zip: chance.zip(),
    phone: chance.phone({ formatted: false }),
    ssn: chance.ssn(),
    username,
    password: 'Qwerty123!' // use consistent password for login
  };
}