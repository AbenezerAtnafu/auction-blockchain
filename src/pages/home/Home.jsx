import { useEffect, useContext, useState } from 'react';
import { Web3Context } from '../../components/Web3Context.js';
import CreateAccount from '../../components/user/CreateAccount.jsx';

import { Layout, Typography, Image, Spin, Button, message } from 'antd';

import logo from '../../assets/images/logo1.png';
import { Link } from 'react-router-dom';

const { Content } = Layout;
const { Title } = Typography;

const Home = () => {
  const web3 = useContext(Web3Context);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(false);
  const [modal, setModal] = useState(false);


  useEffect(async () => {
    const web3Context = await web3();
    const res = await web3Context.auction.methods
      .getUser(web3Context.accounts[0])
      .call();
    setUser(res);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <>
        <Content>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '80vh',
              flexDirection: 'column',
            }}
          >
            <Title>Welcome to Eshi Bidding</Title>
            <div>
              <Spin tip="Verifying your account. Please Wait..." />
            </div>
          </div>
        </Content>
      </>
    );
  }

  return (
    <>
      <Content>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '69vh',
            flexDirection: 'column',
          }}
        >
          <Image preview={false} width={200} src={`${logo}`} />
          <Title>Welcome to Eshi Bidding</Title>
          <div>
            {user._userAddress.toString() ==
            "0x0000000000000000000000000000000000000000" ? (
              <Link
                to={"/register"}
              >
                <h2 style={{color:"blue"}}>

                Please Create an Account.
                </h2>
              </Link>
            ) : (
              <Link to={"/products"}>Start Bidding</Link>
            )}
          </div>
        </div>
      </Content>
    
    </>
  );
};

export default Home;
