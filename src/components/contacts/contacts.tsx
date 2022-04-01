import React, { useEffect } from 'react';
import { useAppSelector,useAppDispatch } from '../../app/hooks';
import { v4 as uuidv4 } from "uuid";
import contactsStyle from './contacts.module.scss';

import {
  getContacts,
} from "../../features/login/MainSlice";

export default function Contacts() {
  const dispatch = useAppDispatch();

  const accessToken = useAppSelector((state) => state.handleLogin.accessToken);
  const userId = useAppSelector((state) => state.handleLogin.user?.id);
  const contactsList = useAppSelector((state) => state.handleLogin.contactsList);

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
  }, [accessToken, userId, dispatch]);
  
  renderedContacts = contactsList ?
  contactsList.map((currentContact) => {
    return (
      <div 
      className={contactsStyle.contact}
      key={uuidv4()}>{currentContact}
      </div>
    );
  }):
  <div className={contactsStyle["notifications-general"]}>your contacts will be here</div>;

  return (
    <React.Fragment>
      { renderedContacts }
    </React.Fragment>
  );
}
