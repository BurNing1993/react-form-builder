import React, { memo } from 'react'
import { useRecoilState } from 'recoil'
import { Form, Input, Radio, Switch } from 'antd'
import { formPropsState, formExtraPropsState } from '../store/atom'

const FormProps: React.FC = () => {
  const [formProps, setFormProps] = useRecoilState(formPropsState)
  const [formExtraProps, setFormExtraProps] =
    useRecoilState(formExtraPropsState)
  return (
    <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
      <Form.Item label="Title">
        <Input value={formExtraProps.formTitle} disabled />
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
          checked={formExtraProps.showSubmitButton}
          onChange={(checked) =>
            setFormExtraProps({ ...formExtraProps, showSubmitButton: checked })
          }
        ></Switch>
      </Form.Item>
    </Form>
  )
}

export default memo(FormProps)
