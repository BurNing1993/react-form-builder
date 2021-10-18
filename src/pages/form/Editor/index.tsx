import React, { memo } from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { useRecoilValue } from 'recoil'
import { Button, Form, notification } from 'antd'
import { DROP_TYPE } from '../store/types'
import {
  formCompDataListState,
  formPropsState,
  activeFormItemIndexState,
} from '../store/atom'
import { useSelectFormItem } from '../store/hooks'

const Editor: React.FC = () => {
  const formCompDataList = useRecoilValue(formCompDataListState)
  const activeFormItemIndex = useRecoilValue(activeFormItemIndexState)
  const formProps = useRecoilValue(formPropsState)
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
      <div className="h-10 p-2 border-b border-gray-500">TODO</div>
      <Droppable droppableId="droppable-editor" type={DROP_TYPE}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={{ backgroundColor: snapshot.isDraggingOver ? 'grey' : '' }}
            {...provided.droppableProps}
            className="p-2"
            id="droppable-editor"
          >
            {/* TODO default Value */}
            <Form {...formProps} onFinish={onFinish}>
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
