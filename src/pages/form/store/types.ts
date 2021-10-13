import { Input, InputProps } from 'antd'

export type FormComponent = typeof Input
export type ComponentProps = InputProps
export interface CompProps {
  label: string
  img: string
  component: FormComponent
  componentProps?: ComponentProps
}

export interface CompData extends CompProps {
  key: string
}

export const DROP_TYPE = 'form_type'

export const formCompList: CompProps[] = [
  {
    label: 'Input',
    img: 'https://via.placeholder.com/100x50.png?text=input',
    component: Input,
    componentProps: {
      placeholder: 'Input',
    },
  },
]
