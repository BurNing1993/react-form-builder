import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { formCompDataListKeysState } from './selector'
import {
  activeTabKeyState,
  activeFormItemIndexState,
  formCompDataListState,
} from './atom'
import { generateId } from '../../../utils'
import { CompData } from './types'

// 生成唯一form key
export function useUniqueFormDataKey() {
  const keys = useRecoilValue(formCompDataListKeysState)
  const generateUniqueFormDataKey = () => {
    let key = ''
    while (!key || keys.includes(key)) {
      key = generateId()
    }
    return key
  }
  return generateUniqueFormDataKey
}

export function useSelectFormItem() {
  const [activeKey, setActiveKey] = useRecoilState(activeTabKeyState)
  const setActiveFormItemIndex = useSetRecoilState(activeFormItemIndexState)
  const onSelectFormItem = (index: number) => {
    if (activeKey !== '2') {
      setActiveKey('2')
    }
    setActiveFormItemIndex(index)
  }
  return onSelectFormItem
}

export function useUpdateFormItemProps() {
  const activeIndex = useRecoilValue(activeFormItemIndexState)
  const setFormCompDataList = useSetRecoilState(formCompDataListState)
  const onUpdateFormProps = (data: Partial<CompData>) => {
    setFormCompDataList((list) => {
      const activeData = list[activeIndex]
      const newData = {
        ...activeData,
        ...data,
      }
      return list
        .slice(0, activeIndex)
        .concat(newData)
        .concat(list.slice(activeIndex + 1))
    })
  }
  return onUpdateFormProps
}
