import { Card, Col, Row } from 'antd'
import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
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
            >
              <span>new</span>
            </Link>
          </Col>
        </Row>
      </Card>
      <Card title="Recent" bordered={false} className="mt-8">
        <Row gutter={[20, 20]}>
          {formList.map((f) => (
            <Col key={f.id} xs={12} sm={8} md={6} lg={4} xl={3}>
              <Link
                to={'/f/' + f.id}
                className="border border-gray-600  block cursor-pointer text-center py-6 hover:border-blue-600"
              >
                {f.id}
                {f.name}
              </Link>
            </Col>
          ))}
        </Row>
      </Card>
    </main>
  )
}

export default memo(Home)
