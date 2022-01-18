import React, { useState, useEffect, useContext } from "react";
import { Col, Divider, Row, Typography, Card, Avatar, Spin } from "antd";
import { Web3Context } from "../../Web3Context.js";
import { useParams } from "react-router";

import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import StoreBidList from "../../bid/StoreBidList.jsx";
import BiddingHistory from "../../bid/BiddingHistory.jsx";
import MultipleCountDown from "../../multipleCountDown/index.jsx";

const { Meta } = Card;

const { Title } = Typography;

const ProductDetail = () => {
  const web3 = useContext(Web3Context);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [currentProduct, setCurrentProduct] = useState();

  const appendData = async ()=>{
    const web3Instance = await web3();
    let product = await web3Instance.auction.methods.getProduct(id).call();
    
    setCurrentProduct(product);
    setLoading(false);
  }

  useEffect( () => {
    appendData()
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spin tip="Loading..." />
      </div>
    );
  }

  return (
    <>
      <Row>
        <Col flex={5}>
          <div style={{ textAlign: "center" }}>
            <Title>Product Detail</Title>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MultipleCountDown
              startDate={parseInt(currentProduct.startTime)}
              endDate={parseInt(currentProduct.endTime)}
            />
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
                          description={currentProduct.productName}
                        />
                      </Col>
                      <Col span={12}>
                        <Meta
                          title="Category"
                          description={currentProduct.category}
                        />
                      </Col>
                      <Col
                        span={12}
                        style={{
                          marginTop: "20px",
                        }}
                      >
                        <Meta
                          title="Initial Price"
                          description={currentProduct.price}
                        />
                      </Col>
                      <Col
                        span={12}
                        style={{
                          marginTop: "20px",
                        }}
                      >
                        <Meta
                          title="Condition"
                          description={currentProduct.productCondition}
                        />
                      </Col>
                      <Col
                        span={12}
                        style={{
                          marginTop: "20px",
                        }}
                      >
                        <Meta
                          title="Start Time"
                          description={new Date(
                            parseInt(currentProduct.startTime)
                          ).toUTCString()}
                        />
                      </Col>
                      <Col
                        span={12}
                        style={{
                          marginTop: "20px",
                        }}
                      >
                        <Meta
                          title="End Time"
                          description={new Date(
                            parseInt(currentProduct.endTime)
                          ).toUTCString()}
                        />
                      </Col>
                    </Row>
                  </Card>
                </Col>
                <Col></Col>
              </Row>
            </Col>
            <Col span={8}>
              <BiddingHistory
                productId={currentProduct.id}
                initialPrice={currentProduct.price}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default ProductDetail;
