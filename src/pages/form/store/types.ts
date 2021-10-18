import { Input, InputProps, FormItemProps } from 'antd'

export type FormComponent = typeof Input
export type ComponentProps = InputProps

export interface CompProps {
  label: string
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
    formItemProps: commonFormProps,
    component: Input,
    componentProps: {
      placeholder: 'Input',
      allowClear: false,
    },
  },
]
