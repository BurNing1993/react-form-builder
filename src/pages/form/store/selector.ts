import { selector } from 'recoil'
import { formCompDataListState, activeFormItemIndexState } from './atom'
import { CompData } from './types'

export const formCompDataListKeysState = selector<string[]>({
  key: 'formCompDataListKeysState',
  get: ({ get }) => {
    const list = get(formCompDataListState)
    return list.map((item) => item.key)
  },
})

export const activeFormItemState = selector<CompData | undefined>({
  key: 'activeFormItemState',
  get: ({ get }) => {
    const list = get(formCompDataListState)
    const index = get(activeFormItemIndexState)
    return list[index]
  },
})
