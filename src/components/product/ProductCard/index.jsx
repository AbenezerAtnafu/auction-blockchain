import { Card, Row, Col, Button, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const { Text } = Typography;

const ProductCard = ({ product, onCardClicked }) => {
  return (
    <>
      <Card
        onClick={() => onCardClicked(product)}
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
          <Link to={'/product-detail'}>
            <Button type="primary" shape="round" size="large">
              Product Detail
            </Button>
          </Link>,
        ]}
      >
        <Row>
          <Col span={12}>
            <Text>Product Name</Text>
          </Col>
          <Col span={12} style={{ textAlign: 'center' }}>
            <Text>{product.productName}</Text>
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
            <Text>Product price</Text>
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
