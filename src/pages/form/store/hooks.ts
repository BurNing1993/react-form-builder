import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { formCompDataListKeysState } from './selector'
import {
  activeTabKeyState,
  activeFormItemIndexState,
  formCompDataListState,
  formPropsState,
  formExtraPropsState,
} from './atom'
import { generateId } from '../../../utils'
import { saveForm, getFormDataById } from '../../../utils/db'
import { CompData, DBFormData } from './types'

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

export function useSaveData() {
  const formCompDataList = useRecoilValue(formCompDataListState)
  const formProps = useRecoilValue(formPropsState)
  const [formExtraProps, setFormExtraProps] =
    useRecoilState(formExtraPropsState)
  const saveData = async () => {
    try {
      const data: DBFormData = {
        id: formExtraProps.id,
        name: formExtraProps.formTitle,
        createAt: formExtraProps.createAt || Date.now(),
        updateAt: Date.now(),
        compList: formCompDataList,
        props: formProps,
        extra: formExtraProps,
      }
      const id = await saveForm(data)
      if (!formProps.id) {
        setFormExtraProps((props) => ({ ...props, id: id }))
      }
    } catch (error) {
      throw error
    }
  }
  return saveData
}

export function useGetFormData() {
  const setFormCompDataList = useSetRecoilState(formCompDataListState)
  const setFormProps = useSetRecoilState(formPropsState)
  const setFormExtraProps = useSetRecoilState(formExtraPropsState)
  const setActiveFormItemIndex = useSetRecoilState(activeFormItemIndexState)
  const getFormData = async (id: number) => {
    const list = await getFormDataById(id)
    if (list) {
      const { compList, props, extra } = list
      console.table(list)
      setFormCompDataList(compList)
      setFormProps(props)
      setFormExtraProps(extra)
      setActiveFormItemIndex(0)
      return list
    } else {
      throw Error('No Data!')
    }
  }
  return getFormData
}
