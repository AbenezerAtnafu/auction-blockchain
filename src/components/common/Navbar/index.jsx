import { useEffect, useState } from 'react';
import { Layout, Menu, Dropdown, Space, Typography, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Web3Context } from '../../Web3Context';

const { Header } = Layout;
const { Text } = Typography;

const Navbar = () => {
  const web3 = useContext(Web3Context);
  const [account, setAccount] = useState();
  useEffect(async () => {
    const web3Instance = await web3();
    setAccount(web3Instance.accounts);
  }, []);
  return (
    <Header>
      <div className="logo" />
      <div
        style={{
          paddingRight: '30px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'left',
        }}
      >
        <Space theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Link to="/">
            <Text style={{ color: 'white' }}>Eshi Bidding</Text>
          </Link>
        </Space>

        <Space size={'large'}>
          <Link to="/shops">Shops</Link>
          <Link to="/products">Products</Link>
          <Link to="/bids">Bids</Link>
        </Space>

        <Dropdown
          overlay={
            <Menu>
              <Menu.Item>{account}</Menu.Item>
            </Menu>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Space direction="horizontal" size="middle">
              <Typography.Text
                style={{
                  color: 'white',
                }}
              >
                User Address
              </Typography.Text>

              <Avatar size="default" icon={<UserOutlined />}></Avatar>
            </Space>
          </div>
        </Dropdown>
      </div>
    </Header>
  );
};

export default Navbar;
