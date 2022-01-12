import { Card, Button, Row, Col } from 'antd';

const { Meta } = Card;

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
          <Meta title="Shop Name" description={`${shop.storeName}`} />
        </Col>
        <Col span={12} style={{ textAlign: 'center' }}>
          <Meta title="Product Count" description={`${0}`} />
        </Col>
      </Row>
    </Card>
  );
};

export default ShopCard;
