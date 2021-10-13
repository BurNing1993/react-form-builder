import React, { memo } from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { useRecoilState } from 'recoil'
import { Form } from 'antd'
import { DROP_TYPE } from '../store/types'
import { formCompDataListState } from '../store/atom'

const Editor: React.FC = () => {
  const [formCompDataList, setFormCompDataList] = useRecoilState(
    formCompDataListState
  )
  return (
    <Droppable droppableId="droppable-editor" type={DROP_TYPE}>
      {(provided, snapshot) => (
        <section
          ref={provided.innerRef}
          style={{ backgroundColor: snapshot.isDraggingOver ? 'grey' : '' }}
          {...provided.droppableProps}
          className="flex-1 p-2"
        >
          <Form>
            {formCompDataList.map((comp, index) => (
              <Draggable
                key={comp.label}
                draggableId={'draggable_editor_' + comp.key}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Form.Item label={comp.label}>
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
