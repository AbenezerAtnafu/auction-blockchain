import { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Web3Context } from "../../Web3Context";

const { Header } = Layout;

const Navbar = () => {
  const web3 = useContext(Web3Context);
  const [account, setAccount] = useState();
  useEffect(async() => {
    const web3Instance = await web3();
    setAccount(web3Instance.accounts)
  }, []);
  return (
    <Header>
      <div className="logo" />
      <div
        style={{
          paddingRight: "30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "left",
        }}
      >
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          <Link to="/shops">
            <Menu.Item key="1">Shops</Menu.Item>
          </Link>

          <Menu.Item>User ADDRESS : {account}</Menu.Item>
        </Menu>
      </div>
    </Header>
  );
};

export default Navbar;
