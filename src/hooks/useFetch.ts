import { useEffect, useState } from 'react'
import { Customer, fetchCustomers } from '../types/customer'

export const useFetch = () => {
  const [customerList, setCustomerList] = useState<Customer[]>([])
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCustomers('api/customers')

      setCustomerList(data.customers)
    }

    fetchData()
  }, [])
  return {
    customerList: customerList,
    setCustomerList: setCustomerList,
  }
}
