import React, { memo } from 'react'
import { Tabs } from 'antd'
import CompProps from './CompProps'
import FormProps from './FormProps'

const { TabPane } = Tabs

const Property: React.FC = () => {
  return (
    <section
      id="property-container"
      className="w-80 border-l border-gray-500 p-2"
    >
      <Tabs defaultActiveKey="1" type="card" centered>
        <TabPane tab="表单设置" key="1">
          <FormProps />
        </TabPane>
        <TabPane tab="组件设置" key="2">
          <CompProps />
        </TabPane>
      </Tabs>
    </section>
  )
}

export default memo(Property)
