import { Card, Row, Col, Button, Typography } from 'antd';
import React from 'react';

const { Text } = Typography;

const ProductCard = ({ product }) => {
  return (
    <>
      <Card
        hoverable
        style={{ width: 260 }}
        cover={
          <img
            height={'180px'}
            style={{
              objectFit: 'fill',
            }}
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          />
        }
        actions={[
          <Button type="primary" shape="round" size="large">
            See Product
          </Button>,
        ]}
      >
        <Row>
          <Col span={12}>
            <Text>Product Name</Text>
          </Col>
          <Col span={12} style={{ textAlign: 'center' }}>
            <Text>{product.name}</Text>
          </Col>
        </Row>
        <Row>
          <Col span={14}>
            <Text>Product Category</Text>
          </Col>
          <Col span={10} style={{ textAlign: 'center' }}>
            <Text>{product.category}</Text>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Text>Product Price</Text>
          </Col>
          <Col span={12} style={{ textAlign: 'center' }}>
            <Text>{product.price}</Text>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default ProductCard;
