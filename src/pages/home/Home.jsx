import React from 'react';

import { Layout, Typography } from 'antd';

const { Content } = Layout;
const { Title } = Typography;

const Home = () => {
  return (
    <>
      <Content>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '69vh',
          }}
        >
          <Title>Welcome to Eshi Bidding</Title>
        </div>
      </Content>
    </>
  );
};

export default Home;
