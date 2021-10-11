import { atom } from 'recoil'
import { CompProps } from './types'

export const formCompDataListState = atom<CompProps[]>({
  key: 'formCompDataListState',
  default: [],
})
