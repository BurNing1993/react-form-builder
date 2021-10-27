import { Input, InputProps, FormItemProps, FormProps } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { formInitialValuesState } from './selector'
export type FormComponent = typeof Input
export type ComponentProps = InputProps

export interface CompProps {
  label: string
  icon: React.ForwardRefExoticComponent<{}>
  defaultValue: string
  formItemProps: FormItemProps
  component: FormComponent
  componentProps?: ComponentProps
}

export interface CompData extends CompProps {
  key: string
  name: string
}

export const DROP_TYPE = 'form_type'

export const ruleTypes = ['string', 'number', 'url', 'email']

export interface ExtraFormProps {
  showSubmitButton: boolean
  formTitle: string
}

// img: 'https://via.placeholder.com/100x50.png?text=input',
// TODO form item icon

const commonFormProps: FormItemProps = {
  rules: [
    {
      required: false,
      message: '',
    },
  ],
}

export const formCompList: CompProps[] = [
  {
    label: 'Input',
    defaultValue: '',
    icon: EditOutlined,
    formItemProps: commonFormProps,
    component: Input,
    componentProps: {
      placeholder: 'Input',
      allowClear: false,
    },
  },
]

export interface FormData {
  formData: CompData[]
  formProps: FormProps & ExtraFormProps
}

export function generateReactCode({ formData, formProps }: FormData) {
  const line1 = `import React, { memo } from 'react'`
  const depSet = new Set()
  formData.forEach((item) => {
    depSet.add(item.component.name)
  })
  const deps = Array.from(depSet)
  const line2 = `import { Form, ${deps.join(', ')} } from 'antd'\n`
  const line3 = `const ${formProps.formTitle} = () => {  
  const onFinish = (values) => {
    console.log('Success:', values)
  }

  return (`
  const line4 = `    <Form
      name="${formProps.formTitle}"
      size="${formProps.size}"
      layout="${formProps.layout}"
      labelCol={{ span: ${formProps.labelCol?.span} }}
      wrapperCol={{ span: ${formProps.wrapperCol?.span} }}
      initialValues={${JSON.stringify(formInitialValuesState, null, 2)}}
      onFinish={onFinish}
    >`
  const contentCode = formData
    .map(
      (item) => `      <Form.Item
        label="${item.label}"
        name="${item.name}"
        rules={${JSON.stringify(item.formItemProps.rules)}}
      >
        <${item.component.name} />
      </Form.Item>`
    )
    .join('\n')
  const submitCode = formProps.showSubmitButton
    ? `      <Form.Item wrapperCol={{ offset: ${
        formProps.labelCol?.span
      }, span: ${
        formProps.labelCol &&
        formProps.labelCol.span &&
        typeof formProps.labelCol.span === 'number'
          ? 24 - formProps.labelCol.span
          : 16
      } }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>`
    : ''
  const lastLine = `    </Form>
  )
}

export default memo(${formProps.formTitle})`

  return [line1, line2, line3, line4, contentCode, submitCode, lastLine].join(
    '\n'
  )
}
