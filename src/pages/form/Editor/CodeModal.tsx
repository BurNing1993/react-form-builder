import React, { memo, useState } from 'react'
import { Button, Modal } from 'antd'
import MonacoEditor from 'react-monaco-editor'

const CodeModal: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [code] = useState(`// type your code... \n`)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title="Basic Modal"
        width="900px"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <MonacoEditor
          width="800"
          height="600"
          language="javascript"
          theme="vs-dark"
          value={code}
          options={{
            selectOnLineNumbers: true,
            roundedSelection: false,
            readOnly: false,
            cursorStyle: 'line',
            automaticLayout: false,
          }}
        />
      </Modal>
    </>
  )
}

export default memo(CodeModal)
