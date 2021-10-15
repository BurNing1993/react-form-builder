import React, { memo } from 'react'
import { Tabs } from 'antd'
import { useRecoilState } from 'recoil'
import CompProps from './CompProps'
import FormProps from './FormProps'
import { activeTabKeyState } from '../store/atom'

const { TabPane } = Tabs

const Property: React.FC = () => {
  const [activeTabKey, setActiveTabKey] = useRecoilState(activeTabKeyState)
  return (
    <section
      id="property-container"
      className="w-96 border-l border-gray-500 p-2"
    >
      <Tabs
        activeKey={activeTabKey}
        type="card"
        centered
        onChange={setActiveTabKey}
      >
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
