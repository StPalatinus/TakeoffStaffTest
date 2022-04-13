import React from 'react';
import { Routes, Route, Navigate, Link } from "react-router-dom";
import { useAppSelector } from './app/hooks';
import appStyles from './index.module.scss';

import {
  logout,
  toggleLoginFormToLogout,
} from "./features/slices/MainSlice";


import LoginPage from './components/loginpage/login-page';
import Contacts from './components/contacts/contacts';
import './App.css';
import 'antd/dist/antd.css'
import { Layout, Button  } from 'antd';
import { useAppDispatch } from './app/hooks';
const { Header, Footer, Sider, Content } = Layout;



function App() {
  const dispatch = useAppDispatch();
  const isLogedIng = useAppSelector((state) => state.handleLogin.isLogedIng);
  
  const loginButton  =  isLogedIng ? 
  <Link to="/home">
    <Button onClick={() => dispatch(logout())}>logout</Button> 
  </Link>:
  <Link to="/home">
    <Button onClick={() => dispatch(toggleLoginFormToLogout())}>login</Button>
  </Link>;

  return (
    <Layout>
      <Header>
        {loginButton}
      </Header>
      <Layout>
        <Sider className={appStyles.nav}>
        <nav>
        <ul className={appStyles["nav-link"]}>
          <li>
          <Link to="/home"><Button>Home</Button></Link>
          </li>
          <li>
            <Link to="/contacts"><Button>Contacts</Button></Link>
          </li>
        </ul>
      </nav>
        </Sider>
        <Content className={appStyles.content}>
        <Routes>
        <Route
          path="/home"
          element={
            <LoginPage></LoginPage> 
          }
        ></Route>
        <Route
          path="/contacts"
          element={
            <Contacts></Contacts>
          }
        ></Route>
        <Route path="/" element={<Navigate replace to="/home" />} />
        </Routes>
        </Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
    
  );
}

export default App;
