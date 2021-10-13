import { atom } from 'recoil'
import { CompData } from './types'

export const formCompDataListState = atom<CompData[]>({
  key: 'formCompDataListState',
  default: [],
})
