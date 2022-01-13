import { useState, useEffect } from "react";
import ShopCard from "../components/seller/ShopCard/index.jsx";
import CreateShop from "../components/seller/CreateShop/index.jsx";
import {
  Typography,
  Divider,
  Button,
  Row,
  Col,
  Spin,
  Space,
  message,
} from "antd";
import { useContext } from "react";
import { Web3Context } from "../components/Web3Context";
import StoreProductList from "../components/product/StoreProductList.jsx";
import CreateProduct from "../components/product/CreateProduct.jsx";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

const { Title } = Typography;

const Shops = () => {
  const web3 = useContext(Web3Context);
  const [isModalOpen, setCreateShopModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [shopList, setShopList] = useState([]);
  const [selectedShop, setSelectedShop] = useState();
  const [createProductModal, setCreateProductModal] = useState();
  const [currentAccount, setCurrentAccount] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [selectedUserAddress, setSelectedUserAddress] = useState();

  const handleShopSubmit = async (values) => {
    setLoading(true);
    const web3Instance = await web3();
    const account = await web3Instance.accounts;
    await web3Instance.auction.methods
      .addStore(values["_name"], values["_email"], values["_storeFrontImage"])
      .send({ from: account[0] })
      .once("receipt", (receipt) => {
        setLoading(false);
        setCreateShopModal(false);
        message.success(
          `Shop Created Successfully! ${receipt.transactionHash}`
        );
        window.location.reload();
      });
  };

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
      .once("receipt", (receipt) => {
        setLoading(false);
        setCreateProductModal(false);
      });
    message.success("Product Added Successfully!");
    window.location.reload();
  };

  const loadShops = async () => {
    setLoading(true);
    const web3Instance = await web3();
    const storesCount = await web3Instance.auction.methods.storesCount().call();
    const account = await web3Instance.accounts;
    for (let i = 1; i <= storesCount; i++) {
      const shop = await web3Instance.auction.methods.storesById(i).call();
      shop.owner = await web3Instance.auction.methods
        .usersByAddress(shop.userAddress)
        .call();
      setShopList((shopList) => [...shopList, shop]);
      if (shop.userAddress === account[0]) {
        setSelectedShop(shop);
        setCurrentAccount(true);
      } else {
        setSelectedShop(shop);
      }
    }
    setLoading(false);
  };

  const handleCardClicked = async (shop) => {
    setSelectedShop(shop);
    console.log(shop.userAddress);
    setSelectedUserAddress(shop.userAddress);
  };

  useEffect(() => {
    loadShops();
  }, []);

  

  if (loading && !selectedShop) {
    return (
      <div
        style={{
          width: "100%",
          height: "200px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin tip="Loading ..." />
      </div>
    );
  }

  if(redirect){
    return <Redirect to={redirect} />;
  }
  return (
    <>
      <Row>
        <Col flex={5}>
          <div style={{ textAlign: "center" }}>
            <Title>Shop List</Title>
          </div>
        </Col>
        <Col span={3}>
          {!currentAccount ? (
            <Button
              type="primary"
              shape="round"
              size="large"
              onClick={() => {
                const hasAccount = window.document.cookie.split(";")[6].split("=")[1];
                if (hasAccount==="false") {
                  message.error("Please create your account!");
                  setRedirect("/register");
                } else {
                  setCreateShopModal(true);
                }
              }}
            >
              Create Shop
            </Button>
          ) : (
            <Button
              type="primary"
              shape="round"
              size="large"
              onClick={() => setCreateProductModal(true)}
            >
              Add Product
            </Button>
          )}
        </Col>
      </Row>
      <Divider></Divider>
      <Row>
        <Col flex={16}>
          <Row
            style={{
              maxWidth: "864px",
              height: "100vh",
              marginRight: "4px",
              overflowY: "scroll",
            }}
          >
            {shopList.length > 0 ? (
              shopList.map((s) => {
                return (
                  <Col span={8} style={{ marginTop: "10px" }}>
                    <ShopCard
                      onCardClicked={handleCardClicked}
                      shop={s}
                      key={s.userAddress}
                    />
                  </Col>
                );
              })
            ) : (
              <Col span={8} style={{ marginTop: "10px" }}>
                <div>No Shops found!</div>
              </Col>
            )}
          </Row>
        </Col>
        <Col span={8}>
          <StoreProductList web3={web3} shop={selectedShop} shopUserAddress={selectedUserAddress} />
        </Col>
      </Row>

      <CreateShop
        isOpen={isModalOpen}
        onClose={() => setCreateShopModal(false)}
        handleSubmit={handleShopSubmit}
        loading={loading}
      />
      <CreateProduct
        isOpen={createProductModal}
        onClose={() => setCreateProductModal(false)}
        handleSubmit={handleProductSubmit}
        loading={loading}
      />
    </>
  );
};

export default Shops;
