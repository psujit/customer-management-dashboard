import { faker } from '@faker-js/faker'
import type { Customer } from '../types/customer.ts'

const customers: Customer[] = []

const createCustomerArray = (number: number) => {
  for (let i = 0; i < number; i++) {
    customers.push({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      id: faker.number.int({ max: 1000000 }).toString(),
      isEditing: false,
      email: faker.internet.email({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        provider: faker.internet.domainName(),
      }),
      phoneNumber: faker.phone.number(),
    })
  }
  return customers
}

export const dataLoader = (number: number) => {
  return createCustomerArray(number)
}
