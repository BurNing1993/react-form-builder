import React, { memo } from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { useRecoilValue } from 'recoil'
import { Form } from 'antd'
import { DROP_TYPE } from '../store/types'
import { formCompDataListState, formPropsState } from '../store/atom'

const Editor: React.FC = () => {
  const formCompDataList = useRecoilValue(formCompDataListState)
  const formProps = useRecoilValue(formPropsState)

  return (
    <Droppable droppableId="droppable-editor" type={DROP_TYPE}>
      {(provided, snapshot) => (
        <section
          ref={provided.innerRef}
          style={{ backgroundColor: snapshot.isDraggingOver ? 'grey' : '' }}
          {...provided.droppableProps}
          className="flex-1 p-2"
        >
          <Form {...formProps}>
            {formCompDataList.map((comp, index) => (
              <Draggable
                key={comp.key}
                draggableId={'draggable_editor_' + comp.key}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onClick={() => {
                      console.log(comp)
                      // TODO
                    }}
                  >
                    <Form.Item label={comp.label} name={comp.name}>
                      {React.createElement(comp.component)}
                    </Form.Item>
                  </div>
                )}
              </Draggable>
            ))}
          </Form>
          {provided.placeholder}
        </section>
      )}
    </Droppable>
  )
}

export default memo(Editor)
