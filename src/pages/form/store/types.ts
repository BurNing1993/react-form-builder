import { Input, InputProps, FormItemProps } from 'antd'

export type FormComponent = typeof Input
export type ComponentProps = InputProps
export interface CompProps {
  label: string
  formItemProps: FormItemProps
  component: FormComponent
  componentProps?: ComponentProps
}

export interface CompData extends CompProps {
  key: string
  name: string
}

export const DROP_TYPE = 'form_type'

// img: 'https://via.placeholder.com/100x50.png?text=input',

export const formCompList: CompProps[] = [
  {
    label: 'Input',
    formItemProps: {
      rules: [
        {
          required: false,
          message: '',
        },
      ],
    },
    component: Input,
    componentProps: {
      placeholder: 'Input',
    },
  },
]
