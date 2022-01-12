import React, { useState } from "react";
import Navbar from "./components/common/Navbar/index.jsx";
import FooterNew from "./components/common/Footer/index.jsx";
import Shops from "./pages/Shops.jsx";
import { Switch, Route } from "react-router-dom";
import { Layout } from "antd";
import "./css/app.css";

const { Content } = Layout;

const App = () => {
  return (
    <>
      <Layout className="layout">
        <Navbar />
        <Content style={{ padding: "0 50px" }}>
          <Switch>
            <div className="site-layout-content">
              <Route exact path="/">a</Route>
              <Route path="/shops">
                <Shops />
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
