import React, { ReactNode } from 'react'
import { TabType } from './Tabs'

interface TabContentProps {
  activeTab: TabType
  children: ReactNode
  currentTab: TabType
}
export const TabContent: React.FunctionComponent<TabContentProps> = (props) => {
  const { activeTab, currentTab, children } = props
  return (
    <div
      className={currentTab === activeTab ? 'flex content-evenly' : 'hidden'}
      data-testid={currentTab}
    >
      {children}
    </div>
  )
}
