import React, { memo, useCallback } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import Component from './Component'
import Editor from './Editor'
import Property from './Property'

const FormPage: React.FC = () => {
  const onDragEnd = useCallback((result) => {
    console.log(result)
  }, [])
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
