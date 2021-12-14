import { Card } from 'antd'
import React, { memo } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { formCompList, DROP_TYPE, iconMap } from '../store/types'

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
          className="w-80 border-r border-gray-200 dark:border-gray-700 p-2"
        >
          <Card title="表单组件" bordered={false} size="small">
            <div className="grid grid-cols-2 gap-2 h-72">
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
                      className="border border-transparent h-10 hover:border-gray-200 dark:border-gray-700"
                    >
                      <div className="h-full flex justify-around items-center relative">
                        {React.createElement(iconMap.get(comp.icon)!)}
                        <div className="text-center">{comp.label}</div>
                        {/* <div className="absolute top-0 right-0 opacity-50">
                          +
                        </div> */}
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
            {provided.placeholder}
          </Card>
        </section>
      )}
    </Droppable>
  )
}

export default memo(Component)
