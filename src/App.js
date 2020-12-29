import React from 'react'
import { Form, Input, InputNumber, Switch, Button } from 'antd';

/* global chrome */

function App() {
  const [host, setHost] = React.useState(localStorage.getItem('host'))
  const [port, setPort] = React.useState(localStorage.getItem('port') || 1081)
  const [enable, setEnable] = React.useState(eval(localStorage.getItem('enable')))
  const handleChange = (values) => {
    for (let key in values) {
      localStorage.setItem(key, values[key])
    }
    setHost(values.host)
    setPort(values.port)
    setEnable(values.enable)
    chrome.runtime.sendMessage(values)
  }
  return (
    <div style={{ padding: '20px' }}>
      <Form name="form" initialValues={{ host, port, enable }} layout="vertical" onFinish={handleChange}>
        <Form.Item rules={[{
          required: true,
          pattern: /((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}/g,
          message: '请输入正确的IP地址'
        }]} name="host" label="服务器地址">
          <Input style={{ width: '100%' }}></Input>
        </Form.Item>
        <Form.Item rules={[{
          required: true,
          message: '请输入端口号'
        }]} name="port" label="服务器端口">
          <InputNumber min={0} max={65535} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="enable" label="是否启用">
          <Switch defaultChecked />
        </Form.Item>
        <Form.Item labelAlign="center">
          <Button block type="primary" htmlType="submit">
            生效
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default App;
