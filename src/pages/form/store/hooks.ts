import {
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil'
import { formCompDataListKeysState } from './selector'
import {
  activeTabKeyState,
  activeFormItemIndexState,
  formCompDataListState,
  formPropsState,
  formExtraPropsState,
  formListState,
} from './atom'
import { generateId } from '../../../utils'
import {
  saveForm,
  getFormDataById,
  deleteFormById,
  getDBFormList,
} from '../../../utils/db'
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
  const resetFormList = useResetRecoilState(formListState)
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
      resetFormList()
    } catch (error) {
      throw error
    }
  }
  return saveData
}

export function useGetFormData() {
  const getFormData = useRecoilCallback(
    ({ set, snapshot }) =>
      async (id: number) => {
        try {
          const formExtraProps = await snapshot.getPromise(formExtraPropsState)
          if (formExtraProps.id && formExtraProps.id === id) {
            console.log(`Don't need fetch ${id}`)
            return
          }
          const data = await getFormDataById(id)
          if (data) {
            console.table(data)
            const { compList, props, extra, id } = data
            set(formCompDataListState, compList)
            set(formPropsState, props)
            set(formExtraPropsState, { ...extra, id })
            set(activeFormItemIndexState, 0)
          } else {
            throw Error('Data is undefined')
          }
        } catch (error) {
          throw error
        }
      },
    []
  )
  return getFormData
}

export function useResetFormData() {
  const resetFormData = useRecoilCallback(
    ({ reset, set }) =>
      () => {
        reset(formCompDataListState)
        reset(formPropsState)
        set(formExtraPropsState, {
          showSubmitButton: false,
          formTitle: 'Form' + generateId(), // reset formTitle 不更新
        })
        reset(activeFormItemIndexState)
      },
    []
  )
  return resetFormData
}

export function useDeleteForm() {
  const resetFormData = useResetFormData()
  const getFormList = useGetFormList()
  const deleteForm = useRecoilCallback(
    ({ snapshot }) =>
      async (id: number) => {
        try {
          const formExtraProps = await snapshot.getPromise(formExtraPropsState)
          if (formExtraProps.id && formExtraProps.id === id) {
            resetFormData()
          }
          await deleteFormById(id)
          // set(formListState, (list) => list.filter((item) => item.id !== id))
          // reset(formListState)
          getFormList()
        } catch (error) {
          throw error
        }
      },
    [getFormList, resetFormData]
  )
  return deleteForm
}

export function useGetFormList() {
  const getFormList = useRecoilCallback(
    ({ set, reset }) =>
      async () => {
        try {
          const list = await getDBFormList()
          set(formListState, list)
        } catch (error) {
          console.error(error)
          reset(formListState)
        }
      },
    []
  )
  return getFormList
}
