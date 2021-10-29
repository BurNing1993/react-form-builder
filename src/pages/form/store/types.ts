import { Input, InputProps, FormItemProps, FormProps } from 'antd'
import { EditOutlined } from '@ant-design/icons'
export type FormComponent = typeof Input
export type ComponentProps = InputProps

// 组件map
export const compMap = new Map<string, FormComponent>([['Input', Input]])

export interface CompProps {
  label: string
  icon: React.ForwardRefExoticComponent<{}>
  defaultValue: string
  formItemProps: FormItemProps
  componentName: string
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
    componentName: 'Input',
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
