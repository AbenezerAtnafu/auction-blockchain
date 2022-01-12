import { useState } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  Upload,
  Typography,
  message,
  Select,
  DatePicker,
} from "antd";

const { RangePicker } = DatePicker;
const { Option } = Select;

const CreateProduct = ({ isOpen, onClose, handleSubmit, loading }) => {
  const [productName, setProductName] = useState();
  const [category, setCategory] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [price, setPrice] = useState(0);
  const [productCondition, setProductCondition] = useState("New");

  const productCategories = [
    "Vehicles",
    "Food",
    "Drink",
    "House For Rent",
    "House for Sell",
  ];
  const onProductNameChange = (n) => {
    setProductName(n.target.value);
  };
  const onCategoryChange = (c) => {
    setCategory(c);
  };
  const onDateChange = (d) => {
    console.log(new Date( d[0]._d).getTime().toString());
    setStartTime(new Date( d[0]._d).getTime());
    setEndTime(new Date( d[1]._d).getTime());
  };
  const onPriceChange = (p) => {
    setPrice(p.target.value);
  };
  const onProductConditionChange = (c) => {
    setProductCondition(c);
  };

  return (
    <>
      <Modal
        title="Create Product"
        visible={isOpen}
        onOk={handleSubmit}
        onCancel={onClose}
        footer={[]}
      >
        <Form
          initialValues={{}}
          onFinish={()=>{handleSubmit(productName, category, startTime, endTime, price, productCondition)}}
        >
          <Form.Item
            name="productName"
            rules={[{ required: true, message: "Please input product name!" }]}
          >
            <Input
              size="large"
              placeholder="Product Name"
              onChange={onProductNameChange}
            />
          </Form.Item>
          <Form.Item
            name="_email"
            rules={[
              { required: true, message: "Please input product category!" },
            ]}
          >
            <Select
              size="large"
              placeholder="Select Product Category"
              onChange={onCategoryChange}
              allowClear
              showSearch
            >
              {productCategories.map((pc) => (
                <Option value={pc}>{pc}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name=""
            rules={[
              { required: true, message: "Please input start Date and Time!" },
            ]}
          >
            <RangePicker
                size="large"
              renderExtraFooter={() => "Start And End Time"}
              showTime
              onChange={onDateChange}
            />
          </Form.Item>
          <Form.Item
            name="price"
            rules={[{ required: true, message: "Please input product price!" }]}
          >
            <Input
              size="large"
              placeholder="Price"
              type="number"
              onChange={onPriceChange}
            />
          </Form.Item>
          <Form.Item
            name="productCondition"
            rules={[
              { required: true, message: "Please input product condition!" },
            ]}
          >
            <Select
                size="large"
              placeholder="Select Product Condition"
              onChange={onProductConditionChange}
              allowClear
              showSearch
            >
              <Option value="0">New</Option>
              <Option value="1">Used</Option>
            </Select>
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

export default CreateProduct;
