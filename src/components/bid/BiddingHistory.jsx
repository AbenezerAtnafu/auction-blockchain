import React, { useState, useEffect, useContext } from "react";

import {
  PageHeader,
  List,
  InputNumber,
  Space,
  Button,
  notification,
  Spin,
} from "antd";

import VirtualList from "rc-virtual-list";
import { Web3Context } from "../Web3Context";

const ContainerHeight = 400;

const BiddingHistory = ({ productId, initialPrice }) => {
  const web3 = useContext(Web3Context);
  const [bidList, setBidList] = useState([]);
  const [currentBid, setCurrentBid] = useState(initialPrice);
  const [maxBid, setMaxBid] = useState(initialPrice);
  const [loading, setLoading] = useState(false);
  const [loadBids, setLoadBids] = useState(true);

  useEffect(async () => {
    const web3Instance = await web3();
    web3Instance.auction.methods
      .bidCountByProduct(productId)
      .call()
      .then((bidCount) => {
        let productBids = [];
        for (let i = 1; i < bidCount; i++) {
          web3Instance.auction.methods
            .bidsByProduct(productId, i)
            .call()
            .then((bid) => {
              productBids.push(bid);
              if (maxBid < bid.bidAmount) {
                setMaxBid(bid.bidAmount);
              }
              console.log(bid, "bid");
              setBidList(productBids);
            });
        }
      });
    setLoadBids(false);
  }, []);

  const submitBid = async () => {
    setLoading(true);
    const web3Instance = await web3();
    const account = await web3Instance.accounts;
    const res = await web3Instance.auction.methods
      .placeBid(productId, currentBid)
      .send({ from: account[0] })
      .once("receipt", (receipt) => {
        setLoading(false);
        notification.success(`Your Bid is placed! `);
      });
  };

  const onChange = (value) => {
    if (value < maxBid) {
      notification.info({ message: "Please enter more than highest bid!" });
      setCurrentBid(maxBid);
    } else {
      setCurrentBid(value);
    }
  };

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
          title={`Max bid ${maxBid}`}
          subTitle='Bid History'
        ></PageHeader>

        {loadBids ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "20px",
            }}
          >
            <Spin tip="Loading last bids..." />
          </div>
        ) : (
          <div>
            <Space style={{ width: "100%" }}>
              <InputNumber
                size="large"
                min={maxBid}
                placeholder={`Minimum amount: ${parseInt(maxBid) + 1}`}
                onChange={onChange}
                style={{ width: "100%" }}
                required
              />
              <Button loading={loading} onClick={submitBid} size="large">
                Submit Bid
              </Button>
            </Space>
            <List>
              <VirtualList
                data={bidList}
                height={ContainerHeight}
                itemHeight={47}
                itemKey="email"
                onScroll={onScroll}
              >
                {(item) => (
                  <List.Item key={item.id}>
                    <List.Item.Meta
                      // avatar={<Avatar src={item.picture.large} />}
                      title={item.bidAmount}
                      description={item.bidAmount}
                    />
                    <div>Content</div>
                  </List.Item>
                )}
              </VirtualList>
            </List>
          </div>
        )}
      </div>
    </>
  );
};

export default BiddingHistory;
