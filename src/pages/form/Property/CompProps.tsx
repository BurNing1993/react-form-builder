import React, { memo } from 'react'
import { Empty, Form, Card, Input, Checkbox } from 'antd'
import { useRecoilValue } from 'recoil'
import { activeFormItemState } from '../store/selector'
import { useUpdateFormItemProps } from '../store/hooks'

const CompProps: React.FC = () => {
  const activeFormItem = useRecoilValue(activeFormItemState)
  const onUpdateFormItemProps = useUpdateFormItemProps()
  return (
    <>
      {activeFormItem ? (
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} colon={false}>
          <Card size="small" title="FormProps">
            <Form.Item label="label">
              <Input
                value={activeFormItem.label}
                onChange={(e) =>
                  onUpdateFormItemProps({ label: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item label="name" tooltip="提交时Key值">
              <Input
                value={activeFormItem.name}
                onChange={(e) =>
                  onUpdateFormItemProps({ name: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item label="defaultValue">
              <Input
                value={activeFormItem.defaultValue}
                onChange={(e) =>
                  onUpdateFormItemProps({ defaultValue: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item label="校验">
              <Checkbox>必填</Checkbox>
            </Form.Item>
            <Form.Item label></Form.Item>
          </Card>
          <Card size="small" title="CompProps">
            <Form.Item label="placeholder">
              <Input value={activeFormItem.componentProps?.placeholder} />
            </Form.Item>
          </Card>
        </Form>
      ) : (
        <Empty />
      )}
    </>
  )
}

export default memo(CompProps)
