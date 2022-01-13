import React, { useState, useEffect } from 'react';
import { Col, Divider, Row, Typography, Card, Avatar } from 'antd';

import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import StoreBidList from '../../bid/StoreBidList.jsx';
import BiddingHistory from '../../bid/BiddingHistory.jsx';

const { Meta } = Card;

const { Title } = Typography;

const ProductDetail = () => {
  return (
    <>
      <Row>
        <Col flex={5}>
          <div style={{ textAlign: 'center' }}>
            <Title>Product Detail</Title>
          </div>
        </Col>
      </Row>
      <Divider></Divider>
      <Row>
        <Col flex={16}>
          <Row>
            <Col flex={16}>
              <Row>
                <Col span={6}></Col>
                <Col span={12}>
                  <Card
                    bordered={false}
                    style={{ width: 400 }}
                    cover={
                      <img
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                      />
                    }
                  >
                    <Row>
                      <Col span={12}>
                        <Meta
                          title="Name"
                          description="This is the description"
                        />
                      </Col>
                      <Col span={12}>
                        <Meta
                          title="Category"
                          description="This is the description"
                        />
                      </Col>
                      <Col
                        span={12}
                        style={{
                          marginTop: '20px',
                        }}
                      >
                        <Meta
                          title="Price"
                          description="This is the description"
                        />
                      </Col>
                      <Col
                        span={12}
                        style={{
                          marginTop: '20px',
                        }}
                      >
                        <Meta
                          title="Condition"
                          description="This is the description"
                        />
                      </Col>
                      <Col
                        span={12}
                        style={{
                          marginTop: '20px',
                        }}
                      >
                        <Meta
                          title="Start Time"
                          description="This is the description"
                        />
                      </Col>
                      <Col
                        span={12}
                        style={{
                          marginTop: '20px',
                        }}
                      >
                        <Meta
                          title="End Time"
                          description="This is the description"
                        />
                      </Col>
                    </Row>
                  </Card>
                </Col>
                <Col></Col>
              </Row>
            </Col>
            <Col span={8}>
              <BiddingHistory />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default ProductDetail;
