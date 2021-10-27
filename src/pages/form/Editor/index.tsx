import React, { memo } from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { useRecoilValue } from 'recoil'
import { Button, Form, notification, Space } from 'antd'
import { DROP_TYPE } from '../store/types'
import {
  formCompDataListState,
  formPropsState,
  activeFormItemIndexState,
} from '../store/atom'
import { formInitialValuesState } from '../store/selector'
import { useSelectFormItem } from '../store/hooks'
import CodeModal from './CodeModal'
import JSONModal from './JSONModal'

const Editor: React.FC = () => {
  const formCompDataList = useRecoilValue(formCompDataListState)
  const activeFormItemIndex = useRecoilValue(activeFormItemIndexState)
  const formProps = useRecoilValue(formPropsState)
  const initialValues = useRecoilValue(formInitialValuesState)
  const onSelectFormItem = useSelectFormItem()
  const onFinish = (values: any) => {
    console.log('Success:', values)
    notification.success({
      message: '提交成功',
      description: JSON.stringify(values),
    })
  }

  return (
    <section className="flex-1">
      <Space className="h-10 w-full px-2 border-b border-gray-500">
        <CodeModal />
        <JSONModal />
      </Space>
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
                        'border p-2 rounded',
                      ].join(' ')}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      onClick={() => {
                        onSelectFormItem(index)
                      }}
                    >
                      <Form.Item label={comp.label} name={comp.name}>
                        {React.createElement(
                          comp.component,
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
