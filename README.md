# Customer Management Dashboard
Dashboard that shows the current customer list with options to edit, delete and add new customers

## Table of Contents
- [General Information](#general-information)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Setup](#setup)
- [Enhancements](#enhancements)
- [Constraints](#constraints)
- [Validations](#validations)

## General Information
- If there are existing customers, on load of the application, user will see the list of the customers in a table with possibilities to edit and/or delete the customer.
- Customer can also be searched by using text search using the Search field on the top.
- On the top user will find a tab to Add Customer. On clicking the tab, user can fill in the form to add details of the customer and save it to the list of customers.

## Technologies Used

- HTML

- React

- TypeScript

- MirageJS

- Tailwind CSS

- Vitest

- React Testing Library


## Features

- View Customers

- Edit Customer

- Delete Customer

- Search Customer

- Add New Customer

## Configuration
- Used Prettier for maintaining for


## Setup
This project was bootstrapped using [Vite](https://vitejs.dev/).

### Steps
- The project can be cloned using 
```sh
git clone https://github.com/psujit/customer-management-dashboard.git
```

- To install the dependencies, use 
```sh
cd customer-management-dashboard
yarn install
```

- Once the dependencies are installed, the application can be run using 
```sh
yarn dev
```
- The application will run on http://localhost:5173/


## Testing
- The app is tested using [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).
- To run the tests, use
```sh
yarn test
```
- To run the tests with coverage, use
```sh
yarn test:coverage 
```

## Enhancements

- Pagination
- Column Sorting


## Constraints

- The phone numbers shown in the table do not adhere to a specific format because customer data is mocked using the faker library.

## Validations

- First Name and Last Name can be alphabets with spaces and maximum 32 characters long.
- Email must have exactly one "@"
- Phone Number must be of the format 0123 4567890 or 0123 45678901
