import React, { memo, useState } from 'react'
import { Button, Modal } from 'antd'
import MonacoEditor from 'react-monaco-editor'
import { useRecoilValue } from 'recoil'
import { formCompDataJSONCodeState } from '../store/selector'
import { formPropsState } from '../store/atom'

const CodeModal: React.FC = () => {
  const JSONCode = useRecoilValue(formCompDataJSONCodeState)
  const formProps = useRecoilValue(formPropsState)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const showModal = () => {
    setIsModalVisible(true)
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }
  const handleOk = () => {
    setIsModalVisible(false)
  }
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Code
      </Button>
      <Modal
        title={formProps.formName}
        width="900px"
        visible={isModalVisible}
        onCancel={handleCancel}
        okText="export JSON"
        onOk={handleOk}
      >
        <MonacoEditor
          width="800"
          height="600"
          language="json"
          theme="vs-dark"
          value={JSONCode}
          options={{
            selectOnLineNumbers: true,
            roundedSelection: false,
            readOnly: true,
            cursorStyle: 'line',
            automaticLayout: false,
          }}
        />
      </Modal>
    </>
  )
}

export default memo(CodeModal)
