import { atom } from 'recoil'
import { FormProps } from 'antd'
import { CompData, ExtraFormProps } from './types'

export const formCompDataListState = atom<CompData[]>({
  key: 'formCompDataListState',
  default: [],
})

// form props
export const formPropsState = atom<FormProps & ExtraFormProps>({
  key: 'formCompDataList',
  default: {
    size: 'middle',
    layout: 'horizontal',
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
    showSubmitButton: false,
  },
})

// tab
export const activeTabKeyState = atom<string>({
  key: 'activeTabKey',
  default: '1',
})

// form item props
export const activeFormItemIndexState = atom<number>({
  key: 'activeFormItemIndexState',
  default: -1,
})
