import React from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import loginStyles from './login.module.scss';

import {
  login,
  logout,
} from "../../features/login/MainSlice";

import { Form, Input, Button, Checkbox } from 'antd';

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const isLogedIng = useAppSelector((state) => state.handleLogin.isLogedIng);
  const pending = useAppSelector((state) => state.handleLogin.pending);
  const isLoginButtonClicked = useAppSelector((state) => state.handleLogin.isLoginButtonClicked);
  const userName = useAppSelector((state) => state.handleLogin.user?.email);


  const onFinish = (values: {
    password: string,
    remember: boolean,
    email: string,
  }) => {
    dispatch(login(values));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const loginButton  = pending ? 
  <Button loading type="primary" htmlType="submit" onSubmit={() => dispatch(logout())}>pending</Button> :
  <Button type="primary" htmlType="submit" onSubmit={() => dispatch(logout())}>login</Button>;

  const pageContent = isLogedIng ? 
  <div className={loginStyles["notifications-general"]}>Welcome {userName}</div> :
  isLoginButtonClicked ?
  <div>
      <Form
      name="login"
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 5, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
        { loginButton }
      </Form.Item>
    </Form>
    </div> :
    <div className={loginStyles["notifications-general"]}>Please log in</div>;


  return (
    <React.Fragment>
      { pageContent }
    </React.Fragment>
  );
}
