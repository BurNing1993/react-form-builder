import { Card, Divider } from 'antd'
import React, { memo } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { formCompList, DROP_TYPE } from '../store/types'

const Component: React.FC = () => {
  return (
    <Droppable
      droppableId="droppable-component"
      type={DROP_TYPE}
      isDropDisabled
    >
      {(provided, snapshot) => (
        <section
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="w-80 border-r border-gray-500 p-2"
        >
          <Card title="表单组件" bordered={false} size="small">
            <div className="grid grid-cols-2">
              <div>
                {formCompList.map((comp, index) => (
                  <Draggable
                    key={comp.label}
                    draggableId={'draggable_form_' + comp.label}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="flex flex-col items-center cursor-pointer border border-transparent hover:border-gray-500"
                      >
                        <div>{comp.label}</div>
                        <img src={comp.img} alt={comp.label} />
                        <div>
                          <div>+</div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
              </div>
            </div>
          </Card>
          {provided.placeholder}
        </section>
      )}
    </Droppable>
  )
}

export default memo(Component)
