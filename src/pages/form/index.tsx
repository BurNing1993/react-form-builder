import React, { memo, useCallback, useEffect } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { useSetRecoilState } from 'recoil'
import { useParams } from 'react-router-dom'
import Component from './Component'
import Editor from './Editor'
import Property from './Property'
import { formCompDataListState } from './store/atom'
import { useUniqueFormDataKey } from './store/hooks'
import { formCompList } from './store/types'

const FormPage: React.FC = () => {
  const setFormCompDataList = useSetRecoilState(formCompDataListState)
  const generateUniqueFormDataKey = useUniqueFormDataKey()
  const params = useParams<{ id: string }>()

  useEffect(() => {
    console.log('enter page param:id=', params.id)
  }, [params])

  // TODO
  // useEffect(() => {
  //   const onBeforeUnload = (e: BeforeUnloadEvent) => {
  //     console.log(e, 'onBeforeunload');
  //     e.preventDefault()
  //     e.returnValue = 'R U OK?'
  //   }
  //   window.addEventListener('beforeunload', onBeforeUnload)
  //   return () => window.removeEventListener('beforeunload', onBeforeUnload)
  // }, [])

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
