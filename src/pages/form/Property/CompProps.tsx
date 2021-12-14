import React, { memo } from 'react'
import {
  Empty,
  Form,
  Card,
  Input,
  Checkbox,
  Divider,
  Select,
  Button,
  Space,
} from 'antd'
import { useRecoilValue } from 'recoil'
import { activeFormItemState } from '../store/selector'
import { useUpdateFormItemProps } from '../store/hooks'
import { ruleTypes } from '../store/types'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

const { Option } = Select

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
            <Form.Item label="name" tooltip="提交时Key值" required>
              <Input
                value={activeFormItem.name}
                onChange={(e) => {
                  onUpdateFormItemProps({ name: e.target.value })
                }}
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
            {/* TODO Form.List onValuesChange*/}
            {/* modal */}
            {/* {activeFormItem.options && (
              <>
                <Form.Item label="Option">
                </Form.Item>
                <Form.Item labelCol={{ span: 0 }} wrapperCol={{ span: 24}}>
                  <Button type="dashed" block icon={<PlusOutlined />}>
                    Add Option
                  </Button>
                </Form.Item>
              </>
            )} */}
            <Divider>校验</Divider>
            <Form.Item label="必填">
              <Checkbox>必填</Checkbox>
            </Form.Item>
            <Form.Item label="提示1" tooltip="必填自定义提示">
              <Input placeholder="" />
            </Form.Item>
            <Form.Item label="类型">
              <Select allowClear>
                {ruleTypes.map((t) => (
                  <Option key={t} value={t}>
                    {t}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="正则" rules={[{ type: 'regexp' }]}>
              <Input placeholder="" />
            </Form.Item>
            <Form.Item label="提示2" tooltip="正则提示">
              <Input placeholder="" />
            </Form.Item>
          </Card>
          <Card size="small" title="CompProps" className="mt-2">
            <Form.Item label="placeholder">
              <Input
                value={activeFormItem.componentProps?.placeholder as string}
              />
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
