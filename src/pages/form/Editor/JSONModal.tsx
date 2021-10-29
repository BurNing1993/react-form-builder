import React, { memo, useState } from 'react'
import { Button, Modal } from 'antd'
import MonacoEditor from 'react-monaco-editor'
import { DownloadOutlined } from '@ant-design/icons'
import { useRecoilValue } from 'recoil'
import { formCompDataJSONCodeState } from '../store/selector'
import { formPropsState } from '../store/atom'
import { downloadBlob } from '../../../utils'

const JSONModal: React.FC = () => {
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
    const blob = new Blob([JSONCode], { type: 'application/json	' })
    downloadBlob(blob, `${formProps.formTitle}.json`)
    setIsModalVisible(false)
  }
  return (
    <>
      <Button onClick={showModal} size="middle" icon={<DownloadOutlined />}>
        JSON
      </Button>
      <Modal
        title={formProps.formTitle + '.json'}
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

export default memo(JSONModal)
