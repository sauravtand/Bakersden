import ProductionTable from './ProductionTable';
import { Button, Form, Input, InputNumber, Select, DatePicker, Switch } from 'antd';
import moment from 'moment';
import { dateFormat, todaydate, todaydateISO } from '../../Helpers/TodayDate';
const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 6,
  },
};

const dummydata = [
  {
    name: "Dark Forest",
    price: '20', 
    id: 1,
  },
  {
    name: "Red valvet",
    price: '110', 
    id: 2,
  },
  {
    name: "White Forest",
    price: '200', 
    id: 3,
  },
  {
    name: "Butter Scothc Cake",
    price: '2500', 
    id: 4,
  },
  {
    name: "Banana Vake",
    price: '2500', 
    id: 5,
  }
]


const ProductionEntry = () => {
  const [form] = Form.useForm();
  const date = new Date().toISOString();

  const onFinish = (values) => {
    // console.log("value", values);
    let data = {
      "PId": 0,
      "ItemId": values.ProductionName,
      "Quantity": values.ProductionQuantity,
      "Remarks": values.remarks,
      "UserId": 5,
      "EntryDate": date,
      "IsActive": values.isActive === undefined ? true : 'values.isActive'
    }

    console.log("data", data)
  };

  const onReset = () => {
    form.resetFields();
  };



  return (
    <div className="mainContainer">
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}
        style={{ marginTop: '50px' }}
      >
        <Form.Item
          name="ProductionName"
          label="Production Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          {/* <Input /> */}
          <Select showSearch>
            {
              dummydata.map(e => (
                <Option value={e.id} key={e.id}>{e.name}</Option>
              ))
            }
          </Select>
        </Form.Item>
        <Form.Item
          name="ProductionQuantity"
          label="Production Quantity"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        {/* <Form.Item
          name="Net Price"
          label="Net Price"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber />
        </Form.Item> */}
        {/* <Form.Item
          name="Date"
          label="Date"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <DatePicker format={dateFormat} />
          
        </Form.Item> */}
        <Form.Item
          name="isActive"
          label="isActive"
          valuePropName='Checked'
          
        ><Switch defaultChecked/>

        </Form.Item>
        <Form.Item
          name="remarks"
          label="remarks"
        >
          <Input />
        </Form.Item>

        <Form.Item >
          <Button type="primary" htmlType="submit"
            style={{ marginLeft: '515px' }}>
            Save
          </Button>
        </Form.Item>
        
      </Form>
      {/* // 
////// Production Table ////////
//  */}

      <ProductionTable />
    </div>




  );
};

export default ProductionEntry;

