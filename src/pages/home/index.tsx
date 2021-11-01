import { Card, Col, Empty, Row } from 'antd'
import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import dayjs from 'dayjs'
import { formListState } from '../form/store/selector'

const Home: React.FC = () => {
  const formList = useRecoilValue(formListState)
  return (
    <main className="container mx-auto pt-4 px-1">
      <div className="border-b border-gray-600 font-bold text-xl py-2">
        Home
      </div>
      <Card title="Template" bordered={false} className="mt-8">
        <Row gutter={[10, 10]}>
          <Col xs={12} sm={8} md={6} lg={4} xl={3}>
            <Link
              to="/f/new"
              className="border border-gray-600  block cursor-pointer text-center py-6 hover:border-blue-600"
              title="new form"
            >
              <span>new</span>
            </Link>
          </Col>
        </Row>
      </Card>
      <Card title="Recent" bordered={false} className="mt-8">
        <Row gutter={[20, 20]}>
          {formList.length ? (
            formList.map((f) => (
              <Col key={f.id} xs={12} sm={8} md={6} lg={4} xl={3}>
                <Link
                  to={'/f/' + f.id}
                  className="border border-gray-600  block cursor-pointer py-4 text-center hover:border-blue-600"
                  title={'go No.' + f.id + ' ' + f.name}
                >
                  <div className="font-bold text-xl">No.{f.id}</div>
                  <div className="text-base py-2">{f.name}</div>
                  <div className="text-xs">
                    {dayjs(f.createAt).format('YYYY-MM-DD HH:mm:ss')}
                  </div>
                </Link>
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
