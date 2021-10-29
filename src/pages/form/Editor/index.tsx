import React, { memo } from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { useRecoilValue } from 'recoil'
import { Button, Form, notification, Space } from 'antd'
import { DROP_TYPE, compMap } from '../store/types'
import {
  formCompDataListState,
  formPropsState,
  activeFormItemIndexState,
} from '../store/atom'
import { formInitialValuesState } from '../store/selector'
import { useSelectFormItem, useDeleteComp, useCopyComp } from '../store/hooks'
import CodeModal from './CodeModal'
import JSONModal from './JSONModal'
import ImportJSONModal from './ImportJSONModal'
import { CopyOutlined, DeleteOutlined } from '@ant-design/icons'

const Editor: React.FC = () => {
  const formCompDataList = useRecoilValue(formCompDataListState)
  const activeFormItemIndex = useRecoilValue(activeFormItemIndexState)
  const formProps = useRecoilValue(formPropsState)
  const initialValues = useRecoilValue(formInitialValuesState)
  const onSelectFormItem = useSelectFormItem()
  const deleteComp = useDeleteComp()
  const copyComp = useCopyComp()
  const onFinish = (values: any) => {
    console.log('Success:', values)
    notification.success({
      message: '提交成功',
      description: JSON.stringify(values),
    })
  }

  return (
    <section className="flex-1">
      <div className="h-10 flex items-center px-2 border-b border-gray-500">
        <Space>
          <CodeModal />
          <JSONModal />
          <ImportJSONModal />
        </Space>
        <Space className="ml-auto">
          <Button type="primary">保存</Button>
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
                          ? ' border-blue-400'
                          : 'border-transparent',
                        'border p-2 rounded relative',
                      ].join(' ')}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      onClick={() => {
                        onSelectFormItem(index)
                      }}
                    >
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
                          title="复制"
                          icon={<CopyOutlined />}
                          onClick={(e) => {
                            e.stopPropagation()
                            copyComp(index)
                          }}
                        ></Button>
                      </Space>
                      <Form.Item label={comp.label} name={comp.name}>
                        {React.createElement(
                          compMap.get(comp.componentName)!,
                          comp.componentProps
                        )}
                      </Form.Item>
                    </div>
                  )}
                </Draggable>
              ))}
              {formProps.showSubmitButton && !snapshot.isDraggingOver ? (
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
