import { useState } from "react";
import { Modal, Form, Input, Button, Upload, Typography, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const CreateAccount = ({ isOpen, onClose, handleSubmit, loading }) => {
  
  return (
    <>
      <Modal
        title="Create Account"
        visible={isOpen}
        onOk={handleSubmit}
        onCancel={onClose}
        footer={[]}
      >
        <Form initialValues={{}} onFinish={handleSubmit}>
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
      </Modal>
    </>
  );
};

export default CreateAccount;
