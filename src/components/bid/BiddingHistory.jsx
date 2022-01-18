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
  const [currentBid, setCurrentBid] = useState(0);
  const [maxBid, setMaxBid] = useState(initialPrice);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [loadBids, setLoadBids] = useState(true);
  const [auctionEvents, setAuctionEvents] = useState();

  const fetchBidHistory = async () => {
    setLoading(true);
    const web3Instance = await web3();
    setAuctionEvents(await web3Instance.auction.auctionEvents);
    const bidCount = await web3Instance.auction.methods
      .bidCountByProduct(productId)
      .call();
    let productBids = [];
    for (let i = bidCount; i >= 1; i--) {
      const bid = await web3Instance.auction.methods
        .bidsByProduct(productId, i)
        .call();
      bid.user = await web3Instance.auction.methods
        .usersByAddress(bid.bidderAddress)
        .call();
      productBids.push(bid);
      if (maxBid < parseInt(bid.bidAmount)) {
        setMaxBid(bid.bidAmount);
      }
    }
    setBidList(productBids);
    setLoadBids(false);
  };

  const submitBid = async () => {
    setSubmitLoading(true);
    const web3Instance = await web3();
    const account = await web3Instance.accounts;
    const res = await web3Instance.auction.methods
      .placeBid(productId, currentBid)
      .send({ from: account[0] })
      .once("receipt", (receipt) => {
        setSubmitLoading(false);
        fetchBidHistory();
        notification.success({ message: "Your Bid is placed! " });
        // window.location.reload();
      });
  };

  useEffect(() => {
    fetchBidHistory();
    auctionEvents
      ? auctionEvents
          .NewBid({})
          .on("data", async function (event) {
            console.log(event.returnValues);
            notification.info({ message: "New bid placed!" });
          })
          .on("error", console.error)
      : "";
  }, []);

  const onChange = (value) => {
    setCurrentBid(value);
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
        <PageHeader ghost={false} title={`Max bid:  ${maxBid}`}></PageHeader>

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
                placeholder={`Minimum amount: ${parseInt(maxBid) + 1}`}
                onChange={onChange}
                style={{ width: "100%" }}
                required
              />
              <Button
                loading={submitLoading}
                disabled={parseInt(currentBid) < parseInt(maxBid) + 1}
                onClick={submitBid}
                size="large"
              >
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
                      title={`Bid Amount- ${parseInt(item.bidAmount)
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`}
                      description={item.bidderAddress}
                    />
                    <div>{item.user.firstName}</div>
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
