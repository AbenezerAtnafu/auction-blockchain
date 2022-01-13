import React, { useState, useEffect, useContext } from 'react';
import { Col, Divider, Row, Typography } from 'antd';
import StoreBidList from '../components/bid/StoreBidList.jsx';
import ProductCard from '../components/product/ProductCard/index.jsx';
import { Web3Context } from '../components/Web3Context.js';

const { Title } = Typography;

const Products = () => {
  const web3 = useContext(Web3Context);
  const [loading, setLoading] = useState(true);
  const [productList, setProductList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);

  const productsList = [
    {
      name: 'jebena',
      category: 'mtsm',
      startTime: '10000',
      endTime: '20000',
      price: '200',
      seller: '0x12452',
      condition: 'new',
    },
    {
      name: 'sini',
      category: 'ahaaa',
      startTime: '10000',
      endTime: '20000',
      price: '20',
      seller: '0x12453',
      condition: 'used',
    },
  ];

  const handleCardClicked = (product) => {
    setSelectedProduct(product);
  };

  return (
    <>
      <Row>
        <Col flex={5}>
          <div style={{ textAlign: 'center' }}>
            <Title>Product List</Title>
          </div>
        </Col>
        <Col span={3}></Col>
      </Row>
      <Divider></Divider>
      <Row>
        <Col flex={16}>
          <Row
            style={{
              maxWidth: '864px',
              height: '100vh',
              marginRight: '4px',
              overflowY: 'scroll',
            }}
          >
            {productsList.map((p) => {
              return (
                <Col span={8} style={{ marginTop: '10px' }}>
                  <ProductCard
                    onCardClicked={handleCardClicked}
                    key={p.name}
                    product={p}
                  />
                </Col>
              );
            })}
          </Row>
        </Col>
        <Col span={8}>
          <StoreBidList product={productsList[0]} />
        </Col>
      </Row>
    </>
  );
};

export default Products;
