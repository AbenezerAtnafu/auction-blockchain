import { Card, Button, Row, Col, Typography } from "antd";
const { Meta } = Card;

const { Text } = Typography;

const ShopCard = ({ shop, onCardClicked }) => {
  return (
    <Card
      onClick={() => onCardClicked(shop)}
      hoverable
      style={{ width: 260 }}
      cover={
        <img
          height={"180px"}
          style={{
            objectFit: "fill",
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
      <Meta
        title={shop.storeName}
        description={`${shop.productCount} products`}
      ></Meta>
      {/* <Row>
        <Col span={24} style={{ textAlign: "center" }}>
          <Title>{shop.storeName}</Title>
        </Col>
        <Col span={24} style={{ textAlign: "left" }}>
          <Meta description={`${shop.productCount} products`} />
        </Col>
      </Row> */}
    </Card>
  );
};

export default ShopCard;
