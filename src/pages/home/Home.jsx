import { useEffect, useContext, useState } from 'react';
import { Web3Context } from '../../components/Web3Context.js';
import CreateAccount from '../../components/user/CreateAccount.jsx';

import { Layout, Typography, Image, Spin, Button, message } from 'antd';

import logo from '../../assets/images/logo1.png';

const { Content } = Layout;
const { Title } = Typography;

const Home = () => {
  const web3 = useContext(Web3Context);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(false);
  const [modal, setModal] = useState(false);

  const handleSubmit = async (values) => {
    const web3Context = await web3();
    console.log(Object.values(values));
    const account = await web3Context.accounts;
    const res = await web3Context.auction.methods
      .addUser(account[0], ...Object.values(values))
      .send({ from: account[0] })
      .once('receipt', (receipt) => {
        setLoading(false);
        setModal(false);
        message.success(
          `Account Created Successfully! Transaction hash: ${receipt.transactionHash}`
        );
      });
  };

  useEffect(async () => {
    const web3Context = await web3();
    const res = await web3Context.auction.methods
      .getUser(web3Context.accounts[0])
      .call();
    console.log(web3Context.accounts[0]);
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
            '0x0000000000000000000000000000000000000000' ? (
              <Button
                onClick={() => {
                  setModal(true);
                }}
              >
                Please Create Account.
              </Button>
            ) : (
              <Button>Products</Button>
            )}
          </div>
        </div>
      </Content>
      <CreateAccount
        isOpen={modal}
        onClose={() => setModal(false)}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </>
  );
};

export default Home;
