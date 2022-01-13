import React, { useState, useEffect } from 'react';
import {
  Descriptions,
  PageHeader,
  List,
  message,
  Avatar,
  Typography,
} from 'antd';

import VirtualList from 'rc-virtual-list';

const fakeDataUrl =
  'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';
const ContainerHeight = 400;

const StoreBidList = ({ web3, product }) => {
  const [data, setData] = useState([]);

  // const appendData = () => {
  //   console.log(shop.storeAddress, 'shop1');
  //   web3().then((web3Instance) => {
  //     web3Instance.auction.methods
  //       .storesBySellers(shop.storeAddress)
  //       .call()
  //       .then((shop) => {
  //         console.log(shop, 'shooooooooppppppppp');
  //       });
  //   });
  //   fetch(fakeDataUrl)
  //     .then((res) => res.json())
  //     .then((body) => {
  //       setData(data.concat(body.results));
  //       message.success(`${body.results.length} more items loaded!`);
  //     });
  // };

  // useEffect(() => {
  //   if (shop) {
  //     appendData();
  //   }
  // }, []);

  const onScroll = (e) => {
    if (e.target.scrollHeight - e.target.scrollTop === ContainerHeight) {
      appendData();
    }
  };

  return (
    <>
      <div
        style={{
          width: '90%',
        }}
      >
        <PageHeader
          ghost={false}
          onBack={() => window.history.back()}
          title="Bid List"
          subTitle={`${product ? product.name : ''}`}
        >
          <Descriptions size="small" column={1}>
            <Descriptions.Item label="Product Name">
              {product ? product.name : ''}
            </Descriptions.Item>
            <Descriptions.Item label="Product Category">
              {product ? product.category : ''}
            </Descriptions.Item>
            <Descriptions.Item label="Product Price">
              {product ? product.price : ''}
            </Descriptions.Item>
            <Descriptions.Item label="Product Condition">
              {product ? product.condition : ''}
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
