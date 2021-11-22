import React, { memo, useEffect } from 'react'
import { Card, Col, Empty, Row, Modal } from 'antd'
import { Link } from 'react-router-dom'
import { DeleteOutlined, RightOutlined } from '@ant-design/icons'
import { useRecoilValue } from 'recoil'
import dayjs from 'dayjs'
import { formListState, formExtraPropsState } from '../form/store/atom'
import { useDeleteForm, useGetFormList } from '../form/store/hooks'

const { Meta } = Card

const Home: React.FC = () => {
  const formList = useRecoilValue(formListState)
  const formExtraProps = useRecoilValue(formExtraPropsState)
  const deleteForm = useDeleteForm()
  const getFormList = useGetFormList()
  useEffect(() => {
    getFormList()
  }, [getFormList])
  const onDelete = (id: number, name: string) => {
    Modal.confirm({
      title: `Do you Want to delete ${name}`,
      onOk() {
        deleteForm(id)
      },
    })
  }
  return (
    <main className="container mx-auto pt-4 px-1">
      <div className="border-b border-gray-200 dark:border-gray-700 font-bold text-xl py-2">
        Home
      </div>
      <Card title="Template" bordered={false} className="mt-8">
        <Row gutter={[10, 10]}>
          <Col xs={12} sm={8} md={6} lg={4}>
            <Link to="/f/new" title="blank form">
              <Card
                size="small"
                hoverable
                title="New"
                extra={<RightOutlined />}
              >
                <Meta description="blank form" />
              </Card>
            </Link>
          </Col>
        </Row>
      </Card>
      <Card title="Recent" bordered={false} className="mt-8">
        <Row gutter={[10, 10]}>
          {formList.length ? (
            formList.map((f) => (
              <Col key={f.id} xs={12} sm={8} md={6} lg={4}>
                <Card
                  size="small"
                  hoverable
                  actions={[
                    <DeleteOutlined
                      key="delete"
                      onClick={() => onDelete(f.id!, f.name)}
                    />,
                    <Link
                      key="go"
                      to={'/f/' + f.id}
                      title={'go No.' + f.id + ' ' + f.name}
                    >
                      <RightOutlined />
                    </Link>,
                  ]}
                >
                  <Meta
                    title={`#${f.id} ${f.name} ${
                      formExtraProps.id === f.id ? '✔️' : ''
                    }`}
                    description={dayjs(f.createAt).format(
                      'YYYY-MM-DD HH:mm:ss'
                    )}
                  />
                </Card>
              </Col>
            ))
          ) : (
            <Empty className="mx-auto" />
          )}
        </Row>
      </Card>
    </main>
  )
}

export default memo(Home)
