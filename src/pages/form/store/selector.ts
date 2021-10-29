import { selector } from 'recoil'
import { getFormList } from '../../../utils/db'
import {
  formCompDataListState,
  activeFormItemIndexState,
  formPropsState,
  formExtraPropsState,
} from './atom'
import { CompData, DBFormData } from './types'

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

// JSON
export const formCompDataJSONCodeState = selector<string>({
  key: 'formCompDataCodeState',
  get: ({ get }) => {
    const formList = get(formCompDataListState)
    const formProps = get(formPropsState)
    const data = {
      form: formList,
      props: formProps,
    }
    return JSON.stringify(data, null, 2)
  },
})

export const formInitialValuesState = selector<Record<string, any>>({
  key: 'formInitialValuesState',
  get: ({ get }) => {
    const formList = get(formCompDataListState)
    const initialValues: Record<string, any> = {}
    formList.forEach((item) => {
      initialValues[item.name] = item.defaultValue
    })
    return initialValues
  },
})

export const formDataReactCodeState = selector<string>({
  key: 'formDataReactCodeState',
  get: ({ get }) => {
    const formCompDataList = get(formCompDataListState)
    const formProps = get(formPropsState)
    const formExtraProps = get(formExtraPropsState)
    const formInitialValues = get(formInitialValuesState)
    const line1 = `import React, { memo } from 'react'`
    const depSet = new Set()
    formCompDataList.forEach((item) => {
      depSet.add(item.componentName)
    })
    const deps = Array.from(depSet)
    const line2 = `import { Form, ${deps.join(', ')} } from 'antd'\n`
    const line3 = `const ${formExtraProps.formTitle} = () => {  
  const onFinish = (values) => {
    console.log('Success:', values)
  }

  return (`
    const line4 = `    <Form
      name="${formExtraProps.formTitle}"
      size="${formProps.size}"
      layout="${formProps.layout}"
      labelCol={{ span: ${formProps.labelCol?.span} }}
      wrapperCol={{ span: ${formProps.wrapperCol?.span} }}
      initialValues={${JSON.stringify(formInitialValues)}}
      onFinish={onFinish}
    >`
    const contentCode = formCompDataList
      .map(
        (item) => `      <Form.Item
        label="${item.label}"
        name="${item.name}"
        rules={${JSON.stringify(item.formItemProps.rules)}}
      >
        <${item.componentName} />
      </Form.Item>`
      )
      .join('\n')
    const submitCode = formExtraProps.showSubmitButton
      ? `      <Form.Item wrapperCol={{ offset: ${
          formProps.labelCol?.span
        }, span: ${
          formProps.labelCol &&
          formProps.labelCol.span &&
          typeof formProps.labelCol.span === 'number'
            ? 24 - formProps.labelCol.span
            : 16
        } }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>`
      : ''
    const lastLine = `    </Form>
  )
}

export default memo(${formExtraProps.formTitle})`

    return [line1, line2, line3, line4, contentCode, submitCode, lastLine].join(
      '\n'
    )
  },
})

export const formListState = selector<DBFormData[]>({
  key: 'formListState',
  get: async () => {
    const list = await getFormList()
    return list
  },
})
