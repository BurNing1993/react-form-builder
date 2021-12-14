import React, { memo } from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { useRecoilValue } from 'recoil'
import { CopyOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button, Form, message, notification, Space } from 'antd'
import { DROP_TYPE, compMap, CompData } from '../store/types'
import {
  formCompDataListState,
  formPropsState,
  formExtraPropsState,
  activeFormItemIndexState,
} from '../store/atom'
import { formInitialValuesState } from '../store/selector'
import {
  useSelectFormItem,
  useDeleteComp,
  useCopyComp,
  useSaveData,
} from '../store/hooks'
import CodeModal from './CodeModal'
import JSONModal from './JSONModal'
import ImportJSONModal from './ImportJSONModal'

const Editor: React.FC = () => {
  const formCompDataList = useRecoilValue(formCompDataListState)
  const activeFormItemIndex = useRecoilValue(activeFormItemIndexState)
  const formProps = useRecoilValue(formPropsState)
  const formExtraProps = useRecoilValue(formExtraPropsState)
  const initialValues = useRecoilValue(formInitialValuesState)
  const onSelectFormItem = useSelectFormItem()
  const deleteComp = useDeleteComp()
  const copyComp = useCopyComp()
  const saveData = useSaveData()
  const onFinish = (values: any) => {
    console.log('Success:', values)
    notification.success({
      message: '提交成功',
      description: JSON.stringify(values),
    })
  }

  const onSaveData = async () => {
    try {
      await saveData()
      message.success('保存成功!')
    } catch (error) {
      console.error(error)
      message.error('保存失败!')
    }
  }

  const getComponent = (comp: CompData) => {
    console.log(comp)
    return React.createElement(
      compMap.get(comp.componentName)!,
      comp.componentProps
    )
  }

  return (
    <section className="flex-1">
      <div className="h-10 flex items-center px-2 border-b border-gray-200 dark:border-gray-700">
        <Space>
          <CodeModal />
          <JSONModal />
          <ImportJSONModal />
        </Space>
        <Space className="ml-auto">
          <Button type="primary" onClick={onSaveData}>
            保存
          </Button>
        </Space>
      </div>
      <Droppable droppableId="droppable-editor" type={DROP_TYPE}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={{ backgroundColor: snapshot.isDraggingOver ? 'grey' : '' }}
            {...provided.droppableProps}
            className="p-2"
            id="droppable-editor"
          >
            <Form
              {...formProps}
              initialValues={initialValues}
              onFinish={onFinish}
            >
              {formCompDataList.map((comp, index) => (
                <Draggable
                  key={comp.key}
                  draggableId={'draggable_editor_' + comp.key}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      className={[
                        activeFormItemIndex === index
                          ? 'border-blue-400'
                          : 'border-gray-200 dark:border-gray-700 border-dashed',
                        'border p-2 rounded relative mb-1',
                      ].join(' ')}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      onClick={() => {
                        onSelectFormItem(index)
                      }}
                    >
                      {activeFormItemIndex === index && (
                        <Space className="absolute bottom-1 left-1 cursor-pointer">
                          <Button
                            danger
                            title="删除"
                            icon={<DeleteOutlined />}
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteComp(index)
                            }}
                          ></Button>
                          <Button
                            type="ghost"
                            title="复制"
                            icon={<CopyOutlined />}
                            onClick={(e) => {
                              e.stopPropagation()
                              copyComp(index)
                            }}
                          ></Button>
                        </Space>
                      )}
                      <Form.Item label={comp.label} name={comp.name}>
                        {getComponent(comp)}
                      </Form.Item>
                    </div>
                  )}
                </Draggable>
              ))}
              {formExtraProps.showSubmitButton && !snapshot.isDraggingOver ? (
                <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              ) : undefined}
            </Form>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </section>
  )
}

export default memo(Editor)
