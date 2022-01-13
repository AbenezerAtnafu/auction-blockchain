import { Card, Button, Row, Col, Typography } from 'antd';

const { Text } = Typography;

const ShopCard = ({ shop, onCardClicked }) => {
  return (
    <Card
      onClick={() => onCardClicked(shop)}
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
          See Products
        </Button>,
      ]}
    >
      <Row>
        <Col span={12} style={{ textAlign: 'center' }}>
          <Text>Shop Name</Text>
        </Col>
        <Col span={12} style={{ textAlign: 'center' }}>
          <Text>{shop.storeName}</Text>
        </Col>
      </Row>
      <Row>
        <Col span={12} style={{ textAlign: 'center' }}>
          <Text>Product Count</Text>
        </Col>
        <Col span={12} style={{ textAlign: 'center' }}>
          <Text>{shop.productCount}</Text>
        </Col>
      </Row>
    </Card>
  );
};

export default ShopCard;
