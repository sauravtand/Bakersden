// import ProductionTable from './ProductionTable';
import { Button, Form, InputNumber, Select, Switch } from 'antd';
// import {Input} from 'antd'
// import moment from 'moment';
// import { dateFormat, todaydate, todaydateISO } from '../../Helpers/TodayDate';
import { InsertUpdateDayWiseProductionDetail } from '../../Services/appServices/ProductionService';
import Header from '../../Components/Common/Header';
import TextArea from 'antd/lib/input/TextArea';
import { useState } from 'react';
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
  const [isbutdis, setisbutdis] = useState(false)


  const onFinish = (values) => {
    setisbutdis(true)

    let data = {
      "PId": 0,
      "ItemId": values.ProductionName,
      "Quantity": values.ProductionQuantity,
      "Remarks": values.remarks,
      "UserId": 5,
      "EntryDate": date,
      "IsActive": values.isActive === undefined || values.isActive === true ? true : false
    }

    // console.log("data", data)
    // setisbutdis(false)
    InsertUpdateDayWiseProductionDetail(data, (res) => {
      if (res?.SuccessMsg === true) {
        alert("The data is saved")
        setisbutdis(false)
        onReset()
      } else {
        alert("Error!")
        setisbutdis(false)
      }
    })

  };

  const onReset = () => {
    form.resetFields();
  }
  return (
    <>
      <Header title={'Add Product'}></Header>

      <div className="mainContainer">

        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}
          style={{ marginTop: '50px' }}
          id="productionEntry"
        >
          <Form.Item
            name="ProductionName"
            label="Production Name"
            id="productionName"
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
            id="productQuantity"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="remarks"
            label="remarks"
            id="remark"
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
              style={{ marginLeft: '515px' }} id="saveBtn" disabled={isbutdis} loading={isbutdis}

            >
              Save
            </Button>
          </Form.Item>

        </Form>
      </div>

    </>
  )
};

export default ProductionEntry;

