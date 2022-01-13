import React, { useState, useEffect, useContext } from 'react';
import { Col, Divider, Row, Typography, Spin } from 'antd';
import StoreBidList from '../components/bid/StoreBidList.jsx';
import ProductCard from '../components/product/ProductCard/index.jsx';
import { Web3Context } from '../components/Web3Context.js';
import CreateProduct from '../components/product/CreateProduct.jsx';

const { Title } = Typography;

const Products = () => {
  const web3 = useContext(Web3Context);
  const [loading, setLoading] = useState(true);
  const [productList, setProductList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [createProductModal, setCreateProductModal] = useState(false);

  const handleProductSubmit = async (
    name,
    category,
    startTime,
    endTime,
    price,
    productCondition
  ) => {
    console.log(name, category, startTime, endTime, price, productCondition);
    setLoading(true);
    const web3Instance = await web3();
    const account = await web3Instance.accounts;
    await web3Instance.auction.methods
      .addProduct(name, category, startTime, endTime, price, productCondition)
      .send({ from: account[0] })
      .once('receipt', (receipt) => {
        setLoading(false);
        setCreateProductModal(false);
      });
    message.success('Product Added Successfully!');
  };

  const loadProducts = async () => {
    setLoading(true);
    const web3Instance = await web3();
    const productCount = await web3Instance.auction.methods
      .productCount()
      .call();

    const account = await web3Instance.accounts;
    for (let i = 1; i <= productCount; i++) {
      const product = await web3Instance.auction.methods.productById(i).call();
      setProductList((productList) => [...productList, product]);
      if (product.sellerAddress === account[0]) {
        setSelectedProduct(product);
      } else {
        setSelectedProduct(product);
      }
    }
    setLoading(false);
  };

  const handleCardClicked = (product) => {
    setSelectedProduct(product);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          width: '100%',
          height: '200px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Spin tip="Loading ..." />
      </div>
    );
  }

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
            {productList.length > 0 ? (
              productList.map((p, index) => {
                return (
                  <Col span={8} style={{ marginTop: '10px' }}>
                    <ProductCard
                      onCardClicked={handleCardClicked}
                      key={index}
                      product={p}
                    />
                  </Col>
                );
              })
            ) : (
              <Col span={8} style={{ marginTop: '10px' }}>
                <div>No Products found!</div>
              </Col>
            )}
          </Row>
        </Col>
        <Col span={8}>
          <StoreBidList web3={web3} product={selectedProduct} />
        </Col>
      </Row>

      <CreateProduct
        isOpen={createProductModal}
        onClose={() => setCreateProductModal(false)}
        handleSubmit={handleProductSubmit}
        loading={loading}
      />
    </>
  );
};

export default Products;
