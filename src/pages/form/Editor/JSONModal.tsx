import React, { memo, useState } from 'react'
import { Button, message, Modal } from 'antd'
import MonacoEditor from 'react-monaco-editor'
import { DownloadOutlined } from '@ant-design/icons'
import { useRecoilValue } from 'recoil'
import { formCompDataJSONCodeState } from '../store/selector'
import { formExtraPropsState } from '../store/atom'
import { downloadBlob } from '../../../utils'

const JSONModal: React.FC = () => {
  const JSONCode = useRecoilValue(formCompDataJSONCodeState)
  const formExtraProps = useRecoilValue(formExtraPropsState)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const showModal = () => {
    setIsModalVisible(true)
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }
  const handleOk = () => {
    const blob = new Blob([JSONCode], { type: 'application/json	' })
    downloadBlob(blob, `${formExtraProps.formTitle}.json`)
    setIsModalVisible(false)
  }

  const copyCode = () => {
    navigator.clipboard
      .writeText(JSONCode)
      .then(() => {
        message.success('复制成功')
      })
      .catch((err) => {
        console.error(err)
        message.success('复制失败')
      })
  }

  return (
    <>
      <Button onClick={showModal} size="middle" icon={<DownloadOutlined />}>
        JSON
      </Button>
      <Modal
        title={formExtraProps.formTitle + '.json'}
        width="900px"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            export JSON
          </Button>,
          <Button key="primary" type="primary" onClick={copyCode}>
            Copy Code
          </Button>,
        ]}
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
