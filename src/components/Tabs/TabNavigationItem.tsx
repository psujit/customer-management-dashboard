import React from 'react'
import { TabType } from './Tabs'

interface TabNavigationItemProps {
  activeTab: TabType
  currentTab: TabType
  onTabClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}
export const TabNavigationItem: React.FunctionComponent<
  TabNavigationItemProps
> = (props) => {
  const { activeTab, currentTab, onTabClick } = props
  return (
    <li className="-mb-px mr-2 last:mr-0 text-center">
      <button
        className={
          'text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal ' +
          (activeTab === currentTab
            ? 'text-white bg-blue-600'
            : 'text-blue-600 bg-white')
        }
        onClick={(e) => {
          onTabClick(e)
        }}
        data-toggle="tab"
        value={currentTab}
        role="tablist"
      >
        {currentTab}
      </button>
    </li>
  )
}
