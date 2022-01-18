import { Card, Row, Col, Button, Typography } from "antd";
import React from "react";
import CustomCountdown from "../../countdown/index.jsx";
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
            height={"180px"}
            style={{
              objectFit: "fill",
            }}
            alt="example"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXp7vG6vsHs8fS3u769wcTR1djGys3o7fC8wcPN0dTBxcjEyMvh5unJzdDd4uXT19rY3N93Ep8VAAAD20lEQVR4nO3c67abIBAFYAGj8Rrf/2krQ5LjNRXwxBnO/n51haZLijuDoGYZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABvesvVB3Um/ahVfp/K66YasmQ6qRuj1owxVXn1oZ1D37Y6SJ1UbRLDqKfD9vb8pL366E7xGsL89qMqlPs4hRP1PYbN/Ld0oEHsEjhPdeVGywyLz8t0ztPcdtEUy9HSvf28SmAQs6xSJn+se6IbO4oXHM/5xgnM5hzGDqLpv34436SSOU136MIWkaR7+LCnaQolcVdr1lUkLXY2YNIPYp10DxHEBCCI4iGIKUAQxfsrQUz+GhFBlM0FcXvzxtfVfdlhg6jyMxRcf7B2djX8mYbnKFIQz8F0yYeCON+2CUA95LpFQEHsblEednGZ7w6BPbhb5M9oPf4jd6ZD6Bb3IysizYw2Ng54OGFqqivFenZ7wtTU/s6sNrcYMRTEiH9gYH4dHR1E9tt0dLdGTIpKw/36JHIf0f0PsS2GJC6IOo8vN78sMog962JI3GkW/O2OdzEkcUE0zIshiQniIGEti4IYeP3KvhiSmCC27IshCQ+ihGJIgoMooBgSuoINCiKN/iCgh6FBFFEMSWgQS8N4BWqmDAuiFlEMSWAQ6WtMl0kXAoPYRi8PfE8fUtboDmsJxdAqQy6B6C55AcWQBAWxZ74CNeMerfH8jt3UCb6u/LqAIMophsQ/iG6xXEQxJP5BFFQMiXu2xucbkooh8Q2iK4YSJt0v3kFU4Usf16BYeayZcd+OWXNBPNxDd4fDbx7Q+fyCWAp88u0ZxIMegibdLxTE+ujtF7msYkhcED3uoGG+HbOh33uufYeoYkhKvx6uH7xlj4KoavH3Iu57VsTDrj7eAIPACuAnaLFGFN+pqTyeU1OJEET5/kgQ5ayAhpCypRuOdiKkXRR5cbtswi7d/ZTudT1tsjPT9wMmqi4OEJlY3XlcJQratZh4vTrrUA8lLer/0O3xLsqcHdBdQGMSm9q9tq7uJsnr1KxR5hSPhnAs++NPpTthp7+eq8arjzaAm7m5X8nnn5eN/XajFPOtUjtMk41suhVx1ihxdjCNF2Vyej/JrLFQwvbXnv7bw2HaKLCHdCK+TszlBaOenpizvymIu0vGrfbq5dMiHxvFGOgJ/VLb2k/Fr1021juNUtDJN15CDUO3fi+oa1TvRoEnafYs+er9tuH59kT/qVEKuvP3PbluPRrF0G3+elt0vRok3d/3GwUZmvFMVEW/GbOPjWLorCx3X0xvG2WuYQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKTpH3QRH9kUxtEtAAAAAElFTkSuQmCC"
          />
        }
        actions={[
          <Link  to={`/product-detail/${product.id}`}>
            <Button disabled={parseInt(product.startTime) > new Date().getTime()} type="primary" shape="round" size="large">
              Place a Bid
            </Button>
          </Link>,
        ]}
      >
        <Row>
          <Col span={12}>
            <Text>Name</Text>
          </Col>
          <Col span={12} style={{ textAlign: 'center' }}>
            <Text>{product.productName}</Text>
          </Col>
        </Row>
        <Row>
          <Col span={14}>
            <Text>Category</Text>
          </Col>
          <Col span={10} style={{ textAlign: "center" }}>
            <Text>{product.category}</Text>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Text>Initial price</Text>
          </Col>
          <Col span={12} style={{ textAlign: "center" }}>
            <Text>{product.price}</Text>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <CustomCountdown startTime={product.startTime} endTime={product.endTime}/>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default ProductCard;
