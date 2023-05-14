import React from 'react'
import { Customer } from '../../types/customer.ts'

interface TableProps {
  customerListToDisplay: Customer[]
  onDeleteClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  onDoneClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  onEditClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  setEmail: (email: string) => void
  setFirstName: (firstName: string) => void
  setLastName: (lastName: string) => void
  setPhoneNumber: (phoneNumber: string) => void
}
export const Table: React.FunctionComponent<TableProps> = (props) => {
  const {
    customerListToDisplay,
    onDeleteClick,
    onDoneClick,
    onEditClick,
    setEmail,
    setFirstName,
    setLastName,
    setPhoneNumber,
  } = props
  return (
    <div className="p-1.5 w-full inline-block align-middle">
      <div className="overflow-hidden border rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
              >
                ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
              >
                First Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
              >
                Last Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
              >
                Phone Number
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Delete</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {customerListToDisplay.map((customer) => (
              <tr key={customer.id}>
                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  {customer.id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  {customer.isEditing ? (
                    <input
                      type="text"
                      defaultValue={customer.firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      required
                      maxLength={32}
                      pattern="[A-Za-z ]{1,32}"
                      onInvalid={(e) =>
                        (e.target as HTMLInputElement).setCustomValidity(
                          'First Name should be alphabetical and maximum 32 characters long',
                        )
                      }
                    />
                  ) : (
                    customer.firstName
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  {customer.isEditing ? (
                    <input
                      type="text"
                      defaultValue={customer.lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      required
                      maxLength={32}
                      pattern="[A-Za-z ]{1,32}"
                      data-testid={`lastName-${customer.id}`}
                    />
                  ) : (
                    customer.lastName
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  {customer.isEditing ? (
                    <input
                      type="email"
                      defaultValue={customer.email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      required
                    />
                  ) : (
                    customer.email
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  {customer.isEditing ? (
                    <input
                      type="tel"
                      defaultValue={customer.phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      required
                      pattern="[0-9]{4} [0-9]{7,8}"
                    />
                  ) : (
                    customer.phoneNumber
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {customer.isEditing ? (
                    <button
                      className="text-green-600 hover:text-green-900 mx-1.5"
                      onClick={onDoneClick}
                      id={customer.id}
                      data-testid={`save-${customer.id}`}
                    >
                      <svg
                        id={customer.id}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-check-lg"
                        viewBox="0 0 16 16"
                      >
                        <path
                          id={customer.id}
                          d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"
                        />
                      </svg>
                    </button>
                  ) : (
                    <button
                      className="text-blue-600 hover:text-blue-900 mx-1.5"
                      onClick={onEditClick}
                      id={customer.id}
                      data-testid={`edit-${customer.id}`}
                    >
                      <svg
                        id={customer.id}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-pencil"
                        viewBox="0 0 16 16"
                      >
                        <path
                          id={customer.id}
                          d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"
                        />
                      </svg>
                    </button>
                  )}
                  <button
                    className="text-red-600 hover:text-red-900 mx-1.5"
                    onClick={onDeleteClick}
                    id={customer.id}
                    data-testid={`delete-${customer.id}`}
                  >
                    <svg
                      id={customer.id}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash"
                      viewBox="0 0 16 16"
                    >
                      <path
                        id={customer.id}
                        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"
                      />
                      <path
                        id={customer.id}
                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
