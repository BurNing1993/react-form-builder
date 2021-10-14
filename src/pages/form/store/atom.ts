import { atom } from 'recoil'
import { FormProps } from 'antd'
import { CompData } from './types'

export const formCompDataListState = atom<CompData[]>({
  key: 'formCompDataListState',
  default: [],
})

export const formPropsState = atom<FormProps>({
  key: 'formCompDataList',
  default: {
    size: 'middle',
    layout: 'horizontal',
  },
})

export const activeTabKeyState = atom<string>({
  key: 'activeTabKey',
  default: '1',
})
