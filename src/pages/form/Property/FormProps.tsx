import React, { memo } from 'react'
import { useRecoilState } from 'recoil'
import { Form, Select } from 'antd'
import { formPropsState } from '../store/atom'
import { FormLayout } from 'antd/lib/form/Form'

const { Option } = Select

const sizeOptions = ['large', 'middle', 'small']
const layoutOptions: FormLayout[] = ['horizontal', 'inline', 'vertical']

const FormProps: React.FC = () => {
  const [formProps, setFormProps] = useRecoilState(formPropsState)
  return (
    <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
      <Form.Item label="Size">
        <Select
          value={formProps.size}
          onChange={(size) => setFormProps({ ...formProps, size })}
        >
          {sizeOptions.map((s) => (
            <Option key={s} value={s}>
              {s}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Layout">
        <Select
          value={formProps.layout}
          onChange={(layout) => setFormProps({ ...formProps, layout })}
        >
          {layoutOptions.map((l) => (
            <Option key={l} value={l}>
              {l}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  )
}

export default memo(FormProps)
