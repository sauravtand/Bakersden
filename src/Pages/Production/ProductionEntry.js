import ProductionTable from './ProductionTable';
import { Button, Form, Input, InputNumber, Select, DatePicker, Switch } from 'antd';
import moment from 'moment';
import { dateFormat, todaydate, todaydateISO } from '../../Helpers/TodayDate';
import { InsertUpdateDayWiseProductionDetail } from '../../Services/appServices/ProductionService';
import Header from '../../Components/Common/Header';
import TextArea from 'antd/lib/input/TextArea';
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

    // console.log("data", data)

    InsertUpdateDayWiseProductionDetail(data, (res) => {

    })

  };

  const onReset = () => {
    form.resetFields();
  };



  return (
    <>
      <Header title={'Add Product'}></Header>

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
            <Select
              showSearch
              filterOption={(input, option) => {
                return (
                  option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                  option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                );
              }}
            >
              {
                dummydata.map(e => (
                  <Option title={e.name} value={e.id} key={e.id}>{e.name}</Option>
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
            <InputNumber style={{width: "100%"}}/>
          </Form.Item>
          <Form.Item
            name="remarks"
            label="remarks"
          >
            <TextArea />
          </Form.Item>
          <Form.Item
            name="isActive"
            label="isActive"
            valuePropName='Checked'

          ><Switch defaultChecked />

          </Form.Item>


          <Form.Item >
            <Button type="primary" htmlType="submit"
              style={{ marginLeft: '515px' }}>
              Save
            </Button>
          </Form.Item>

        </Form>
      </div>

    </>
  );
};

export default ProductionEntry;

