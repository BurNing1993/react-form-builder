import { atom } from 'recoil'
import { FormProps } from 'antd'
import { CompData, DBFormData, ExtraFormProps } from './types'
import { generateId } from '../../../utils'

export const formCompDataListState = atom<CompData[]>({
  key: 'formCompDataListState',
  default: [],
})

// form props
export const formPropsState = atom<FormProps>({
  key: 'formCompDataList',
  default: {
    size: 'middle',
    layout: 'horizontal',
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  },
})

export const formExtraPropsState = atom<ExtraFormProps>({
  key: 'formExtraPropsState',
  default: {
    showSubmitButton: false,
    formTitle: 'Form' + generateId(),
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
  default: 0,
})

export const formListState = atom<DBFormData[]>({
  key: 'formListState',
  default: [],
  // reset don't work
  // default: selector({
  //   key: 'formListStateInit',
  //   get: async () => {
  //     const list = await getFormList()
  //     return list
  //   },
  // }),
})
