


import {DatePicker, Form, Input, InputNumber, Switch } from 'antd';
import React from 'react';
import styled from 'styled-components';

const ChalaniClient = () => {
 

  return (
    <FormStyled>
    
    <Form
      name="basic"
      labelCol={{
        span: 12,
      }}
      wrapperCol={{
        span: 18,
      }}
      initialValues={{
        remember: true,
      }}
      className="ChalaniClient"
      
      
      autoComplete="off"
    >
      <h2>Party Details:</h2>
      <Form.Item
        label="Party Name"
        name="PartyName"
        rules={[
          {
            required: true,
            message: 'Please input your Party Name!',
          },
        ]}
      >
        <Input />
        </Form.Item>
      <Form.Item
        label="Party Address"
        name="PartyAddress"
        rules={[
                {
                  required: true,
                  message: 'Please input Party Address!',
                },
              ]}
            >
              <Input />
      </Form.Item>
     
      <Form.Item
        label="Entry Date"
        name="PartyName"
        rules={[
          {
            required: true,
            message: 'Please input Entry Date!',
          },
        ]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        label="Remarks"
        name="Remarks"
        rules={[
                {
                  required: true,
                  message: 'Please input Remarks!',
                },
              ]}
            >
              <Input />
      </Form.Item>
      {/* <Form.Item
        label="IsActive"
        name="IsActive"
        rules={[
                {
                  required: true,
                  message: 'Please input Remarks!',
                },
              ]}
              
            >
              <Switch/>
      </Form.Item> */}
      
      
    </Form>
    
    
    </FormStyled>
    
  );
};

export default ChalaniClient;


const FormStyled = styled.div`
margin: 2% 5%;
padding-right: 10%;
border-right: 2px solid #c8cacb;


`