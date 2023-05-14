import React, { useState } from 'react'
import { TabNavigationItem } from './TabNavigationItem'
import { TabContent } from './TabContent'
import { CustomerList } from '../CustomerList/CustomerList.tsx'
import { AddCustomer } from '../AddCustomer/AddCustomer.tsx'
import Spinner from 'react-loading-indicators'
import { useFetch } from '../../hooks/useFetch.ts'

export type TabType = 'View Customers' | 'Add Customer'

export const Tabs: React.FunctionComponent = () => {
  const { customerList, setCustomerList } = useFetch()

  const [activeTab, setActiveTab] = useState<TabType>('View Customers')
  const onTabClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setActiveTab((e.target as HTMLButtonElement).value as TabType)
  }

  return (
    <div className="flex flex-wrap">
      <div className="w-full">
        <ul
          className="flex mb-0 list-none flex-wrap justify-center pt-3 pb-4 flex-row"
          role="tablist"
        >
          <TabNavigationItem
            currentTab="View Customers"
            onTabClick={onTabClick}
            activeTab={activeTab}
          />
          <TabNavigationItem
            currentTab="Add Customer"
            onTabClick={onTabClick}
            activeTab={activeTab}
          />
        </ul>
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="px-4 py-5 flex-auto">
            <div className="tab-content tab-space">
              <TabContent activeTab={activeTab} currentTab={'View Customers'}>
                <React.Suspense fallback={<Spinner variant="split-disc" />}>
                  <CustomerList
                    customerList={customerList}
                    setCustomerList={setCustomerList}
                  />
                </React.Suspense>
              </TabContent>
              <TabContent activeTab={activeTab} currentTab={'Add Customer'}>
                <AddCustomer
                  customerList={customerList}
                  setCustomerList={setCustomerList}
                />
              </TabContent>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
