

import ProductionTable from './ProductionTable';
import { Button, Form, Input,InputNumber, Select, DatePicker } from 'antd';
const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 6,
  },
};


const ProductionEntry = () => {
  const [form] = Form.useForm();



  const onFinish = (values) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({
      note: 'Hello world!',
      gender: 'male',
    });
  };

  return (
    <>
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}
    style={{marginTop:'50px'}}
    >
      <Form.Item
        name="Production Name"
        label="Production Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="Production Quantity"
        label="Production Quantity"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <InputNumber/>
      </Form.Item>
      <Form.Item
        name="Net Price"
        label="Net Price"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <InputNumber/>
      </Form.Item>
      <Form.Item
        name="Date"
        label="Date"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <DatePicker disabled/>
      </Form.Item>
     
      <Form.Item >
        <Button type="primary" htmlType="submit"
        style={{marginLeft:'515px'}}>
          Save
        </Button>
    </Form.Item>
    </Form>
{/* // 
////// Production Table ////////
//  */}

<ProductionTable/>
</>




  );
};

export default ProductionEntry;













// Styled Components

// // const mainDiv = styled.di`

// `