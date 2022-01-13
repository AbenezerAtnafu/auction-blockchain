import React, { useState } from 'react';
import Navbar from './components/common/Navbar/index.jsx';
import FooterNew from './components/common/Footer/index.jsx';
import Shops from './pages/Shops.jsx';
import { Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import './css/app.css';
import Home from './pages/home/Home.jsx';
import Products from './pages/Products.jsx';
import Bids from './pages/Bids.jsx';

const { Content } = Layout;

const App = () => {
  return (
    <>
      <Layout className="layout">
        <Navbar />
        <Content>
          <Switch>
            <div className="site-layout-content">
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/shops">
                <Shops />
              </Route>
              <Route path="/products">
                <Products />
              </Route>
              <Route path="/bids">
                <Bids />
              </Route>
            </div>
          </Switch>
        </Content>
        <FooterNew />
      </Layout>
    </>
  );
};

export default App;
