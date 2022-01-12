import { Card, Button } from "antd";

const { Meta } = Card;

const ShopCard = ({ shop }) => {
  return (
    <Card
      hoverable
      style={{ width: 220 }}
      cover={
        <img
          alt="example"
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        />
      }
      actions={[
        <Button type="primary" shape="round" size='large'>
            See Products
        </Button>
      ]}
    >
      <Meta title="Name" description={`${shop.storeName}`} />
      <div>product count</div>
    </Card>
  );
};

export default ShopCard;
