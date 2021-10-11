import React, { memo } from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { useRecoilState } from 'recoil'
import { DROP_TYPE } from '../store/types'
import { formCompDataListState } from '../store/atom'

const Editor: React.FC = () => {
  const [formCompDataList, setFormCompDataList] = useRecoilState(
    formCompDataListState
  )
  return (
    <Droppable droppableId="droppable-component" type={DROP_TYPE}>
      {(provided, snapshot) => (
        <section
          ref={provided.innerRef}
          style={{ backgroundColor: snapshot.isDraggingOver ? 'grey' : '' }}
          {...provided.droppableProps}
          className="flex-1"
        >
          {formCompDataList.map((comp, index) => (
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
                >
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
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </section>
      )}
    </Droppable>
  )
}

export default memo(Editor)
