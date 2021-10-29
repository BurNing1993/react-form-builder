import React, { memo } from 'react'
import { useRecoilState } from 'recoil'
import { Form, Input, Radio, Switch } from 'antd'
import { formPropsState } from '../store/atom'

const FormProps: React.FC = () => {
  const [formProps, setFormProps] = useRecoilState(formPropsState)
  return (
    <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
      <Form.Item label="Title">
        <Input value={formProps.formTitle} disabled />
      </Form.Item>
      <Form.Item label="Size">
        <Radio.Group
          value={formProps.size}
          onChange={(e) => setFormProps({ ...formProps, size: e.target.value })}
        >
          <Radio.Button value="large">Large</Radio.Button>
          <Radio.Button value="middle">Middle</Radio.Button>
          <Radio.Button value="small">Small</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Layout">
        <Radio.Group
          value={formProps.layout}
          onChange={(e) =>
            setFormProps({ ...formProps, layout: e.target.value })
          }
        >
          <Radio.Button value="horizontal">Horizontal</Radio.Button>
          <Radio.Button value="vertical">Vertical</Radio.Button>
          <Radio.Button value="inline">Inline</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Submit">
        <Switch
          checked={formProps.showSubmitButton}
          onChange={(checked) =>
            setFormProps({ ...formProps, showSubmitButton: checked })
          }
        ></Switch>
      </Form.Item>
    </Form>
  )
}

export default memo(FormProps)
