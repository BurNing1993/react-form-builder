import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { formCompDataListKeysState } from './selector'
import {
  activeTabKeyState,
  activeFormItemIndexState,
  formCompDataListState,
  formPropsState,
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

export function useImportJSON() {
  const setFormCompDataList = useSetRecoilState(formCompDataListState)
  const setFormProps = useSetRecoilState(formPropsState)
  const importJSON = (json: string) => {
    try {
      const data = JSON.parse(json)
      console.log(data)
      const { form, props } = data
      setFormCompDataList(form)
      setFormProps(props)
    } catch (error) {
      throw error
    }
  }
  return importJSON
}

export function useDeleteComp() {
  const [formCompDataList, setFormCompDataList] = useRecoilState(
    formCompDataListState
  )
  const [activeIndex, setActiveIndex] = useRecoilState(activeFormItemIndexState)
  const deleteComp = (index: number) => {
    const length = formCompDataList.length
    if (activeIndex === index) {
      if (index === length - 1) {
        setActiveIndex(index - 1)
      }
    } else {
      if (index < activeIndex) {
        setActiveIndex((i) => i - 1)
      }
    }
    setFormCompDataList((list) =>
      list.slice(0, index).concat(list.slice(index + 1))
    )
  }
  return deleteComp
}

export function useCopyComp() {
  const [formCompDataList, setFormCompDataList] = useRecoilState(
    formCompDataListState
  )
  const [activeIndex, setActiveIndex] = useRecoilState(activeFormItemIndexState)
  const generateUniqueFormDataKey = useUniqueFormDataKey()
  const copyComp = (index: number) => {
    let data = formCompDataList[index]
    const key = data.label + '_' + generateUniqueFormDataKey()
    data = {
      ...data,
      key,
      name: key,
    }
    setFormCompDataList((list) =>
      list
        .slice(0, index + 1)
        .concat(data)
        .concat(list.slice(index + 1))
    )
    if (index < activeIndex) {
      setActiveIndex((i) => i + 1)
    }
  }
  return copyComp
}
