import React, { useState, useEffect } from "react";
import {
  Descriptions,
  PageHeader,
  List,
  message,
  Avatar,
  Typography,
} from "antd";

import VirtualList from "rc-virtual-list";
import CustomCountdown from "../countdown/index.jsx";

const fakeDataUrl =
  "https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo";
const ContainerHeight = 400;

const StoreBidList = ({ web3, product }) => {
  const [data, setData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState();

  const appendData = async () => {
    const web3Instance = await web3();
    const bidCount = await web3Instance.auction.methods
      .bidCountByProduct(selectedProduct.id)
      .call();
    const productBids = [];
    // for (let i = 0; i <= bidCount; i++) {
    //   // const bid = await web3Instance.auction.methods.

    // }
    console.log(bidCount);
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((body) => {
        setData(data.concat(body.results));
        message.success(`${body.results.length} more items loaded!`);
      });
  };

  useEffect(() => {
    if (product) {
      setSelectedProduct(product);
    }
  }, []);

  const onScroll = (e) => {
    if (e.target.scrollHeight - e.target.scrollTop === ContainerHeight) {
      appendData();
    }
  };

  return (
    <>
      <div
        style={{
          width: "90%",
        }}
      >
        <PageHeader
          ghost={false}
          title="Bid List"
          subTitle={`${product ? product.productName : ""}`}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection:"column",
              marginBottom:"20px"
            }}
          >
            <CustomCountdown
              startTime={product.startTime}
              endTime={product.endTime}
            />
          </div>
          <Descriptions size="large" column={1}>
            <Descriptions.Item label="Product Name">
              {product ? product.productName : ""}
            </Descriptions.Item>
            <Descriptions.Item label="Product Category">
              {product ? product.category : ""}
            </Descriptions.Item>
            <Descriptions.Item label="Product Price">
              {product ? product.price : ""}
            </Descriptions.Item>
            <Descriptions.Item label="Product Condition">
              {product ? product.productCondition : ""}
            </Descriptions.Item>
          </Descriptions>
        </PageHeader>
        <List>
          <VirtualList
            data={data}
            height={ContainerHeight}
            itemHeight={47}
            itemKey="email"
            onScroll={onScroll}
          >
            {(item) => (
              <List.Item key={item.email}>
                <List.Item.Meta
                  avatar={<Avatar src={item.picture.large} />}
                  title={<a href="https://ant.design">{item.name.last}</a>}
                  description={item.email}
                />
                <div>Content</div>
              </List.Item>
            )}
          </VirtualList>
        </List>
      </div>
    </>
  );
};

export default StoreBidList;
