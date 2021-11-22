import React, { memo, useState } from 'react'
import { Button, message, Modal } from 'antd'
import MonacoEditor from 'react-monaco-editor'
import { UploadOutlined } from '@ant-design/icons'
import { useImportJSON } from '../store/hooks'

const JSONModal: React.FC = () => {
  const importJSON = useImportJSON()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [code, setCode] = useState('')
  const showModal = () => {
    setIsModalVisible(true)
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }
  const handleOk = () => {
    try {
      importJSON(code)
      setIsModalVisible(false)
    } catch (error) {
      console.error(error)
      message.error('导入JSON失败!')
    }
  }
  return (
    <>
      <Button onClick={showModal} size="middle" icon={<UploadOutlined />}>
        导入JSON
      </Button>
      <Modal
        title="Import JSON"
        width="900px"
        visible={isModalVisible}
        onCancel={handleCancel}
        okText="Import JSON"
        onOk={handleOk}
      >
        <MonacoEditor
          width="800"
          height="600"
          language="json"
          theme="vs-dark"
          value={code}
          onChange={setCode}
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

export default memo(JSONModal)
