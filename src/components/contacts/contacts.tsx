import React, { useEffect } from 'react';
import { useAppSelector,useAppDispatch } from '../../app/hooks';
import { v4 as uuidv4 } from "uuid";
// import { useAppDispatch } from '../../app/hooks';

import {
  getContacts,
} from "../../features/login/MainSlice";

import { Form, Input, Button, Checkbox } from 'antd';

export default function Contacts() {
  const dispatch = useAppDispatch();

  // const user = useAppSelector((state) => state.handleLogin.user);
  const accessToken = useAppSelector((state) => state.handleLogin.accessToken);
  const userId = useAppSelector((state) => state.handleLogin.user?.id);
  const contactsList = useAppSelector((state) => state.handleLogin.contactsList);
  // console.log(user);
  // console.log(accessToken);
  // console.log(stateCopy);

  let renderedContacts;

  useEffect(() => {
    console.log();
    if (userId &&
      accessToken) {
      dispatch(getContacts({
        id: userId,
        token: accessToken,
      }));
    }
  }, [accessToken, userId]);
  
  renderedContacts = contactsList ?
  contactsList.map((currentContact) => {
    return (
      <div 
      // className={ticketsFoundStyles.tickets__ticket} 
      key={uuidv4()}>{currentContact}</div>
    );
  }):
  <div>your contacts will be here</div>;

  return (
    <React.Fragment>
      { renderedContacts }
    </React.Fragment>
  );
}
