import { selector } from 'recoil'
import { formCompDataListState } from './atom'

export const formCompDataListKeysState = selector<string[]>({
  key: 'formCompDataListKeysState',
  get: ({ get }) => {
    const list = get(formCompDataListState)
    return list.map((item) => item.key)
  },
})
