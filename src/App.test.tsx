import App from './App'
import { render, screen, userEvent } from './test/testUtils'
import { makeServer } from './mirage'
import { Server } from 'miragejs/server'

describe('Customer Management App Tests', () => {
  let server: Server
  const user = userEvent.setup()

  beforeEach(() => {
    server = makeServer({ environment: 'test' })
  })

  afterEach(() => {
    server.db.emptyData()
    server.shutdown()
  })

  const insertOneCustomer = (
    { id, firstName, lastName } = {
      id: 5,
      firstName: 'Peter',
      lastName: 'Parker',
    },
  ) => {
    server.db.customers.insert({
      id,
      firstName,
      lastName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@gmx.de`,
      phoneNumber: '0123 4567890',
    })
  }

  it('should not display New Customer Form on load', async () => {
    server.db.emptyData()
    render(<App />)
    // Used this method instead of toBeVisible because of an existing bug in jest-dom that does not work
    // with display: hidden if it is provided via a class
    // https://github.com/testing-library/jest-dom/issues/116#issuecomment-954969561
    // Workaround used from the link
    const HiddenContainer = (await screen.findByText('New Customer')).closest(
      '.hidden',
    )
    const AddCustomerContainer = await screen.findByTestId('Add Customer')
    expect(HiddenContainer).toBe(AddCustomerContainer)
  })

  it('should display appropriate message when there are no customer records', () => {
    server.db.emptyData()
    render(<App />)
    screen.getByText('No Customers Yet')
  })

  it('should render the customer when there is a customer record', async () => {
    insertOneCustomer({ id: 5, firstName: 'Peter', lastName: 'Parker' })
    render(<App />)
    await screen.findByText('Peter')
    await screen.findByText('Parker')
    await screen.findByText('peter.parker@gmx.de')
    await screen.findByText('0123 4567890')
  })

  it('should display appropriate record when there is a customer record found via search', async () => {
    insertOneCustomer({ id: 7, firstName: 'Stephen', lastName: 'Strange' })
    insertOneCustomer({ id: 9, firstName: 'Bruce', lastName: 'Banner' })
    render(<App />)
    await screen.findByText('Stephen')
    await screen.findByText('Strange')
    await screen.findByText('stephen.strange@gmx.de')
    const searchBox = screen.getByPlaceholderText('Search...')
    await user.type(searchBox, 'br')
    expect(screen.queryByText('Stephen')).toBe(null)
    expect(screen.queryByText('Bruce')).not.toBe(null)
  })

  it('should edit appropriate record when edit is used in a customer row', async () => {
    insertOneCustomer({ id: 11, firstName: 'Natasha', lastName: 'Romano' })
    render(<App />)
    await screen.findByText('Natasha')
    await screen.findByText('Romano')
    await screen.findByText('natasha.romano@gmx.de')
    const editButton = screen.getByTestId('edit-11')
    await user.click(editButton)
    const lastNameForEdit = screen.getByTestId('lastName-11')
    await user.type(lastNameForEdit, 'v')
    const save = screen.getByTestId('save-11')
    await user.click(save)
    expect(await screen.findByText('Changes Saved for ID 11')).not.toBe(null)
    expect(screen.queryByText('Romano')).toBe(null)
    expect(screen.queryByText('Romanov')).not.toBe(null)
  })

  it('should delete appropriate record when delete is used in a customer row', async () => {
    insertOneCustomer({ id: 3, firstName: 'Steve', lastName: 'Rogers' })
    insertOneCustomer({ id: 1, firstName: 'Tony', lastName: 'Stark' })
    render(<App />)
    await screen.findByText('Steve')
    await screen.findByText('Rogers')
    const deleteButton = screen.getByTestId('delete-3')
    await user.click(deleteButton)
    expect(
      await screen.findByText('Customer Record for ID 3 Deleted'),
    ).not.toBe(null)
    expect(screen.queryByText('Steve')).toBe(null)
    expect(screen.queryByText('Tony')).not.toBe(null)
  })

  it('should display the New Customer form on Tab click', async () => {
    server.db.emptyData()
    render(<App />)
    const addCustomerTab = screen.getByText('Add Customer')
    await user.click(addCustomerTab)
    const HiddenContainer = (await screen.findByText('New Customer')).closest(
      '.hidden',
    )
    const AddCustomerContainer = await screen.findByTestId('Add Customer')
    expect(HiddenContainer).not.toEqual(AddCustomerContainer)
  })

  it('should submit the form on Save Click', async () => {
    server.db.emptyData()
    render(<App />)
    const addCustomerTab = screen.getByText('Add Customer')
    await user.click(addCustomerTab)
    const firstName = screen.getByPlaceholderText('First Name')
    const lastName = screen.getByPlaceholderText('Last Name')
    const email = screen.getByPlaceholderText('username@provider.domain')
    const phoneNumber = screen.getByPlaceholderText('0123 4567890')
    await user.type(firstName, 'Stephen')
    await user.type(lastName, 'Strange')
    await user.type(email, 'dr.strange@gmx.de')
    await user.type(phoneNumber, '0987 6543210')
    const saveButton = screen.getByText('Save')
    await user.click(saveButton)
    expect(await screen.findByText('Customer Added')).not.toBe(null)
  })
})
