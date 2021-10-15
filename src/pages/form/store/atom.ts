import { atom } from 'recoil'
import { FormProps } from 'antd'
import { CompData } from './types'

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
