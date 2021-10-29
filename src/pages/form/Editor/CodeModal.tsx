import React, { memo, useEffect, useState } from 'react'
import { Button, Modal } from 'antd'
import MonacoEditor from 'react-monaco-editor'
import { useRecoilValue } from 'recoil'
import { formPropsState } from '../store/atom'
import { formDataReactCodeState } from '../store/selector'
import { downloadBlob } from '../../../utils'
import { DownloadOutlined } from '@ant-design/icons'

const JSONModal: React.FC = () => {
  const formProps = useRecoilValue(formPropsState)
  const formDataReactCode = useRecoilValue(formDataReactCodeState)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [code, setCode] = useState('')
  const showModal = () => {
    setIsModalVisible(true)
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }
  const handleOk = () => {
    const blob = new Blob([code], { type: 'application/json	' })
    downloadBlob(blob, `${formProps.formTitle}.jsx`)
    setIsModalVisible(false)
  }
  useEffect(() => {
    setCode(formDataReactCode)
  }, [formDataReactCode])
  return (
    <>
      <Button onClick={showModal} size="middle" icon={<DownloadOutlined />}>
        Code
      </Button>
      <Modal
        title={formProps.formTitle + '.jsx'}
        width="900px"
        visible={isModalVisible}
        onCancel={handleCancel}
        okText={'export ' + formProps.formTitle + '.jsx'}
        onOk={handleOk}
      >
        <MonacoEditor
          width="800"
          height="600"
          language="javascript"
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
