import React, { useState, useEffect } from 'react';
import {
  List,
  message,
  Avatar,
  Typography,
  PageHeader,
  Button,
  Descriptions,
} from 'antd';
import VirtualList from 'rc-virtual-list';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const fakeDataUrl =
  'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';
const ContainerHeight = 400;

const StoreProductList = ({ web3, shop, shopUserAddress }) => {
  const [data, setData] = useState([]);
  const [myShops, setMyShops] = useState(false);

  const appendData = async () => {
    const web3Instance = await web3();
    const account = await web3Instance.accounts;
    if (shop.userAddress === account[0]) {
      setMyShops(true);
    }

    const storeProductCount = await web3Instance.auction.methods
      .productCount()
      .call();

    console.log(shopUserAddress, "store Product card");
    for (let store = 0; store <= storeProductCount; store++) {
      const product = await web3Instance.auction.methods
        .stores(shopUserAddress, store)
        .call();
      setData([...data, product]);
    }
    console.log(data)
  };

  // useEffect(() => {
  //   if (shop) {
  //     appendData();
  //   }
  // }, []);

  useEffect(() => {
    appendData();
  }, [shop]);

  const onScroll = (e) => {
    if (e.target.scrollHeight - e.target.scrollTop === ContainerHeight) {
      appendData();
    }
  };

  return (
    <div style={{ width: '90%' }}>
      <PageHeader
        ghost={false}
        subTitle="Product List"
        title={myShops ? `Your Shop` : `${shop ? shop.storeName : ''}`}
      >
        <Descriptions size="small" column={1}>
          <Descriptions.Item label="Store Name">
            {shop ? shop.storeName : ''}
          </Descriptions.Item>
          <Descriptions.Item label="Store ID">
            {shop ? shop.storeId : ''}
          </Descriptions.Item>
          <Descriptions.Item label="Owner">
            {shop ? shop.owner.firstName +' '+ shop.owner.lastName : ''}
          </Descriptions.Item>
          <Descriptions.Item label="Phone Number">
            {shop ? shop.owner.phoneNumber : ''}
          </Descriptions.Item>
          <Descriptions.Item label="Product Count">
            {shop ? shop.productCount : ''}
          </Descriptions.Item>
        </Descriptions>
      </PageHeader>
      <List
        dataSource={data}
        render={(item) => (
          <List.Item key={item.email}>
            <List.Item.Meta
              // avatar={<Avatar src={item.picture.large} />}
              title={<a href="https://ant.design">{item.productName}</a>}
              description={item.category}
            />
            <div>{item.endTime}</div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default StoreProductList;
