import React, { memo, useEffect, useState } from 'react'
import { Button, Modal } from 'antd'
import MonacoEditor from 'react-monaco-editor'
import { useRecoilValue } from 'recoil'
import { formExtraPropsState } from '../store/atom'
import { formDataReactCodeState } from '../store/selector'
import { downloadBlob } from '../../../utils'
import { DownloadOutlined } from '@ant-design/icons'

const JSONModal: React.FC = () => {
  const formExtraProps = useRecoilValue(formExtraPropsState)
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
    downloadBlob(blob, `${formExtraProps.formTitle}.jsx`)
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
        title={formExtraProps.formTitle + '.jsx'}
        width="900px"
        visible={isModalVisible}
        onCancel={handleCancel}
        okText={'export ' + formExtraProps.formTitle + '.jsx'}
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
