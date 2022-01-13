import React, { useState, useEffect } from "react";
import {
  List,
  message,
  Avatar,
  Typography,
  PageHeader,
  Button,
  Descriptions,
} from "antd";
import VirtualList from "rc-virtual-list";

const { Title } = Typography;

const fakeDataUrl =
  "https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo";
const ContainerHeight = 400;

const StoreProductList = ({ web3, shop }) => {
  const [data, setData] = useState([]);

  const appendData = async () => {
    console.log(shop.storeAddress, "shop1");
    const web3Instance = await web3();
    const account = await web3Instance.accounts;
    const storeProductCount = await web3Instance.auction.methods.productCountByStore(account[0]).call();
    console.log(storeProductCount, "store Product card");
    for (let store = 0; store <= storeProductCount; store++) {
      const product = await web3Instance.auction.methods
      .stores(account[0], store)
      .call();
      setData([...data, product]);
      console.log(product);
    }
    

    // fetch(fakeDataUrl)
    //   .then((res) => res.json())
    //   .then((body) => {
    //     setData(data.concat(body.results));
    //     message.success(`${body.results.length} more items loaded!`);
    //   });
  };

  useEffect(() => {
    if (shop) {
      appendData();
    }
  }, []);

  const onScroll = (e) => {
    if (e.target.scrollHeight - e.target.scrollTop === ContainerHeight) {
      appendData();
    }
  };

  return (
    <div style={{ width: "90%" }}>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title="Product List"
        subTitle={`${shop ? shop.storeName : ""}`}
      >
        <Descriptions size="small" column={1}>
          <Descriptions.Item label="Store Name">
            {shop ? shop.storeName : ""}
          </Descriptions.Item>
          <Descriptions.Item label="Store ID">
            {shop ? shop.storeId : ""}
          </Descriptions.Item>
          <Descriptions.Item label="Owner">
            {shop ? shop.owner.firstName + shop.owner.lastName : ""}
          </Descriptions.Item>
          <Descriptions.Item label="Phone Number">
            {shop ? shop.owner.phoneNumber : ""}
          </Descriptions.Item>
          <Descriptions.Item label="Product Count">
            {shop ? shop.productCount : ""}
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
                // avatar={<Avatar src={item.picture.large} />}
                title={<a href="https://ant.design">{item.productName}</a>}
                description={item.category}
              />
              <div>{item.endTime}</div>
            </List.Item>
          )}
        </VirtualList>
      </List>
    </div>
  );
};

export default StoreProductList;
