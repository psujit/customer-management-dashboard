export type Customer = {
  email: string;
  firstName: string;
  id: string;
  isEditing: boolean;
  lastName: string;
  phoneNumber: string;
};

type CustomerResponse = {
  customers: Customer[];
};

export const fetchCustomers = (url: string) =>
  fetch(url).then<CustomerResponse>((r) => r.json());

export const addCustomer = (url: string, data: Customer) =>
  fetch(url, {method: 'POST', body: JSON.stringify(data)}).then<CustomerResponse>((r) => r.json());

export const editCustomer = (url: string, data: Customer) =>
  fetch(url, {method: 'PATCH', body: JSON.stringify(data)}).then<CustomerResponse>((r) => r.json());

export const deleteCustomer = (url: string, data: Customer) =>
  fetch(url, {method: 'DELETE', body: JSON.stringify(data)}).then<CustomerResponse>((r) => r.json());