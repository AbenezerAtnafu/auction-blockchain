import { useState, useContext, useEffect } from "react";
import { Web3Context } from "../Web3Context";
import { Modal, Form, Input, Button, Upload, Typography, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

const CreateAccount = ({ userPk, onClose }) => {
  const web3 = useContext(Web3Context);
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState();

  const handleSubmit = async (values) => {
    setLoading(true);
    const web3Context = await web3();
    const account = await web3Context.accounts;
    const res = await web3Context.auction.methods
      .addUser(account[0], ...Object.values(values))
      .send({ from: account[0] })
      .once("receipt", (receipt) => {
        setLoading(false);
        message.success(
          `Account Created Successfully! Transaction hash: ${receipt.transactionHash}`
        );
        setRedirect("/");
      });
  };

  useEffect(() => {
    const hasAccount = window.document.cookie.split(";")[2].split("=")[1];
    if (hasAccount === "true") {
      setRedirect("/");
    }
  }, []);

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  return (
    <>
      <Form
        initialValues={{}}
        onFinish={(values) => handleSubmit(values)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
          flexDirection: "column",
        }}
      >
        <Typography.Title>
          Your current address is: {window.document.cookie.split(";")[2]}
        </Typography.Title>
        <Form.Item
          name="firstName"
          rules={[{ required: true, message: "Please input first name!" }]}
        >
          <Input size="large" placeholder="First Name" />
        </Form.Item>
        <Form.Item
          name="lastName"
          rules={[{ required: true, message: "Please input last name!" }]}
        >
          <Input size="large" placeholder="Last Name" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input email!" }]}
        >
          <Input size="large" placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          rules={[{ required: true, message: "Please input phone number!" }]}
        >
          <Input size="large" placeholder="Phone Number" />
        </Form.Item>
        <Form.Item>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "150px" }}
              loading={loading}
            >
              Submit
            </Button>
          </div>
        </Form.Item>
      </Form>
      {/* </Modal> */}
    </>
  );
};

export default CreateAccount;
