import React, { FormEvent, useState } from 'react'
import { addCustomer, Customer } from '../../types/customer.ts'
import { StatusMessage } from '../StatusMessage.tsx'
import { Header } from '../Header.tsx'

interface AddCustomerProps {
  customerList: Customer[]
  setCustomerList: (customerList: Customer[]) => void
}

export const AddCustomer: React.FunctionComponent<AddCustomerProps> = (
  props,
) => {
  const { customerList, setCustomerList } = props
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState<boolean>(false)
  const [shouldShowMessage, setShouldShowMessage] = useState<boolean>(false)
  const handleSubmit = (e: FormEvent) => {
    if (firstName && lastName && email && phoneNumber) {
      e.preventDefault()
      const data = {
        firstName,
        lastName,
        email,
        phoneNumber,
        isEditing: false,
        id: Math.ceil(Math.random() * 1000000).toString(),
      }
      try {
        addCustomer('/api/customers', data)
        setMessage('Customer Added')
        setShouldShowMessage(true)
        setError(false)
      } catch (e) {
        setMessage('Adding Customer Failed')
        setShouldShowMessage(true)
        setError(true)
      } finally {
        setCustomerList([...customerList, data])
        setFirstName('')
        setLastName('')
        setEmail('')
        setPhoneNumber('')
        setTimeout(() => setShouldShowMessage(false), 3000)
      }
    } else {
      setMessage('Please fill all the fields')
      setError(true)
    }
  }

  return (
    <div className="relative flex flex-col justify-center overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md ring-2 lg:max-w-xl">
        <Header headerText="New Customer" />
        <StatusMessage
          message={message}
          error={error}
          shouldShowMessage={shouldShowMessage}
        />
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-2">
            <label
              htmlFor="FirstName"
              className="block text-sm font-semibold text-gray-800"
            >
              First Name
            </label>
            <input
              type="text"
              className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              required
              maxLength={32}
              pattern="[A-Za-z ]{1,32}"
              title="First Name should contain only letters"
              placeholder="First Name"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="LastName"
              className="block text-sm font-semibold text-gray-800"
            >
              Last Name
            </label>
            <input
              type="text"
              className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              required
              maxLength={32}
              pattern="[A-Za-z ]{1,32}"
              title="Last Name should contain only letters"
              placeholder="Last Name"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              placeholder="username@provider.domain"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-semibold text-gray-800"
            >
              Phone Number
            </label>
            <input
              type="tel"
              className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber}
              pattern="[0-9]{4} [0-9]{7,8}"
              required
              title="Phone Number should be in the form 0123 4567890"
              placeholder="0123 4567890"
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
