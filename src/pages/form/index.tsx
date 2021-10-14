import React, { memo, useCallback } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { useSetRecoilState } from 'recoil'
import Component from './Component'
import Editor from './Editor'
import Property from './Property'
import { formCompDataListState } from './store/atom'
import { useUniqueFormDataKey } from './store/hooks'
import { formCompList } from './store/types'

const FormPage: React.FC = () => {
  const setFormCompDataList = useSetRecoilState(formCompDataListState)
  const generateUniqueFormDataKey = useUniqueFormDataKey()

  const onDragEnd = useCallback(
    (result: DropResult) => {
      console.log(result, 'onDragEnd')
      const { destination, source } = result
      if (destination) {
        if (destination.droppableId === source.droppableId) {
          // TODO
          return
        }
        const data = formCompList[source.index]
        const dIndex = destination.index
        const key = data.label + '_' + generateUniqueFormDataKey()
        setFormCompDataList((list) =>
          list
            .slice(0, dIndex)
            .concat({
              ...data,
              key,
              name: key,
            })
            .concat(list.slice(dIndex))
        )
      }
    },
    [generateUniqueFormDataKey, setFormCompDataList]
  )

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <main id="form-container" className="flex">
        <Component />
        <Editor />
        <Property />
      </main>
    </DragDropContext>
  )
}

export default memo(FormPage)
