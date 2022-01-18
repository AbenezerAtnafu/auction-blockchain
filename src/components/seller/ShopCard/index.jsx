import { Card, Button, Row, Col, Typography } from "antd";
import { Link } from "react-router-dom";

const { Text } = Typography;
const { Meta } = Card;

const ShopCard = ({ shop, onCardClicked }) => {
  return (
    <Card
      onClick={() => onCardClicked(shop)}
      hoverable
      style={{ width: 260 }}
      cover={
        <img
          height={"220px"}
          style={{
            objectFit: "fill",
          }}
          alt="example"
          src="data:image/png;base64,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"
        />
      }
      actions={[
        <Link to="/products">
          <Button type="primary" shape="round" size="large">
            See Products
          </Button>
        </Link>,
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
