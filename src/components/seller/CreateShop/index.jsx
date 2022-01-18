import { Modal, Form, Input, Button, Typography } from "antd";

// address storeAddress;
// bytes32 storeName;
// bytes32 email;
// address arbiter;
// bytes32 storeFrontImage;
// uint balance;
// uint productCount;

const CreateShop = ({ isOpen, onClose, handleSubmit, loading }) => {
  return (
    <>
      <Modal
        title="Create Shop"
        visible={isOpen}
        onOk={handleSubmit}
        onCancel={onClose}
        footer={[]}
      >
        <Form initialValues={{}} onFinish={handleSubmit}>
          <Form.Item
            name="_name"
            rules={[{ required: true, message: "Please input shop name!" }]}
          >
            <Input size="large" placeholder="Shop Name" />
          </Form.Item>
          <Form.Item
            name="_email"
            rules={[{ required: true, message: "Please input shop email!" }]}
          >
            <Input size="large" placeholder="Shop Email" />
          </Form.Item>
          <Form.Item
            name="_storeFrontImage"
            rules={[
              { required: true, message: "Please input shop description!" },
            ]}
          >
            <Input.TextArea rows={5} placeholder="Description" />
          </Form.Item>
          <Form.Item>
            {/* <Typography.Text>Shop Photo</Typography.Text> */}
            {/* <Upload
              listType="picture-card"
              fileList={form.fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              beforeUpload={beforeUpload}
            >
              {form.fileList.length === 1 ? null : uploadButton}
            </Upload> */}
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
      {/* <Modal
        visible={preview.previewVisible}
        title={preview.previewTitle}
        footer={null}
        onCancel={() => setPreview({ previewVisible: false })}
      >
        <img
          alt="example"
          style={{ width: "100%" }}
          src={preview.previewImage}
        />
      </Modal></> */}
    </>
  );
};

export default CreateShop;
