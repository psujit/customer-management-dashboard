import React, { useEffect, useState } from 'react'
import { Customer, deleteCustomer, editCustomer } from '../../types/customer.ts'
import { StatusMessage } from '../StatusMessage.tsx'
import { Header } from '../Header.tsx'
import { Search } from './Search.tsx'
import { NoResultsFound } from './NoResultsFound.tsx'
import { Table } from './Table.tsx'

interface CustomerListProps {
  customerList: Customer[]
  setCustomerList: (customerListToDisplay: Customer[]) => void
}
export const CustomerList: React.FunctionComponent<CustomerListProps> = (
  props,
) => {
  const { customerList, setCustomerList } = props
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [searchResults, setSearchResults] = useState<Customer[]>([])
  const [customerListToDisplay, setCustomerListToDisplay] = useState<
    Customer[]
  >([])
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [message, setMessage] = useState('')
  const [shouldShowMessage, setShouldShowMessage] = useState(false)
  const [error, setError] = useState(false)

  const onDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newCustomerList = [...customerList]
    const id = (e.target as HTMLButtonElement).id
    const index = newCustomerList.findIndex((customer) => customer.id === id)
    newCustomerList.splice(index, 1)
    setCustomerList(newCustomerList)
    deleteCustomer(`api/customers/${id}`, newCustomerList[index])
      .then(() => {
        setShouldShowMessage(true)
        setError(false)
        setMessage(`Customer Record for ID ${id} Deleted`)
        setTimeout(() => setShouldShowMessage(false), 3000)
      })
      .catch(() => {
        setShouldShowMessage(true)
        setError(true)
        setMessage(`Error Deleting Record for ID ${id}`)
      })
  }

  const onEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newCustomerList = [...customerList]
    const id = (e.target as HTMLButtonElement).id
    const index = newCustomerList.findIndex((customer) => customer.id === id)
    newCustomerList[index].isEditing = true
    setCustomerList(newCustomerList)
  }

  const onDoneClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newCustomerList = [...customerList]
    const id = (e.target as HTMLButtonElement).id
    const index = newCustomerList.findIndex((customer) => customer.id === id)
    newCustomerList[index] = {
      id: newCustomerList[0].id,
      email: email || newCustomerList[0].email,
      firstName: firstName || newCustomerList[0].firstName,
      lastName: lastName || newCustomerList[0].lastName,
      phoneNumber: phoneNumber || newCustomerList[0].phoneNumber,
      isEditing: false,
    }
    setCustomerList(newCustomerList)

    editCustomer(`api/customers/${id}`, newCustomerList[index])
      .then(() => {
        setShouldShowMessage(true)
        setError(false)
        setMessage(`Changes Saved for ID ${id}`)
        setTimeout(() => setShouldShowMessage(false), 3000)
      })
      .catch(() => {
        setShouldShowMessage(true)
        setError(true)
        setMessage(`Error Saving Changes for ID ${id}`)
      })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value.toLowerCase()
    if (searchText === '') {
      setShowSearchResults(false)
      setSearchResults(customerList)
    } else {
      setShowSearchResults(true)
      const searchResults = customerList.filter((customer) => {
        return Object.values(customer).join().toLowerCase().includes(searchText)
      })
      setSearchResults(searchResults)
    }
  }

  useEffect(() => {
    if (showSearchResults) {
      setCustomerListToDisplay(searchResults)
    } else {
      setCustomerListToDisplay(customerList)
    }
  }, [showSearchResults, customerList, searchResults])

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="flex flex-col justify-between py-3 pl-2">
          <Header headerText="Customer Dashboard" />
          <StatusMessage
            message={message}
            error={error}
            shouldShowMessage={shouldShowMessage}
          />
          <Search handleChange={handleChange} />
          {customerListToDisplay && customerListToDisplay.length > 0 ? (
            <Table
              customerListToDisplay={customerListToDisplay}
              onDeleteClick={onDeleteClick}
              onDoneClick={onDoneClick}
              onEditClick={onEditClick}
              setEmail={setEmail}
              setFirstName={setFirstName}
              setLastName={setLastName}
              setPhoneNumber={setPhoneNumber}
            />
          ) : (
            <NoResultsFound showSearchResults={showSearchResults} />
          )}
        </div>
      </div>
    </div>
  )
}
