import { createServer, Factory, Model } from 'miragejs'
import { faker } from '@faker-js/faker'
import { Customer } from '../types/customer'
import { dataLoader } from './dataLoader.ts'

export function makeServer({ environment = 'test' }) {
  const server = createServer({
    environment,

    factories: {
      customer: Factory.extend<Partial<Customer>>({
        get id() {
          return faker.number.int({ max: 1000000 }).toString()
        },
        get firstName() {
          return faker.person.firstName()
        },
        get lastName() {
          return faker.person.lastName()
        },
        get phoneNumber() {
          return faker.phone.number()
        },
        get email() {
          return faker.internet.email({
            firstName: this.firstName,
            lastName: this.lastName,
            provider: faker.internet.domainName(),
          })
        },
      }),
    },

    models: {
      customer: Model.extend<Partial<Customer>>({}),
    },

    routes() {
      this.namespace = 'api'

      this.get('/customers', (schema) => {
        return schema.all('customer')
      })

      this.post('/customers', (schema, request) => {
        const attributes = JSON.parse(request.requestBody)
        return schema.db.customers.insert(attributes)
      })

      this.patch('/customers/:id', (schema, request) => {
        const customerToSave = JSON.parse(request.requestBody)
        return schema.db.customers.update(customerToSave.id, customerToSave)
      })

      this.delete('/customers/:id', (schema, request) => {
        const customerToDelete = JSON.parse(request.requestBody)
        schema.db.customers.remove(customerToDelete)
        return schema.db.customers
      })
    },
  })

  server.db.createCollection('customers')

  server.db.loadData({ customers: dataLoader(20) })

  return server
}
