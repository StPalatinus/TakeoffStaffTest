import React, { useEffect } from 'react';
import { useAppSelector,useAppDispatch } from '../../app/hooks';
import { v4 as uuidv4 } from "uuid";
import contactsStyle from './contacts.module.scss';
import Contact from "./contact/contact";

import {
  getContacts,
  editContact,
} from "../../features/slices/MainSlice";

export default function Contacts() {
  const dispatch = useAppDispatch();

  const accessToken = useAppSelector((state) => state.handleLogin.accessToken);
  const userId = useAppSelector((state) => state.handleLogin.user?.id);
  const viewedСontacts = useAppSelector((state) => state.handleLogin.viewedСontacts);
  const statusList = useAppSelector((state) => state.handleLogin.viewedСontacts.statusList)

  // const showState = useAppSelector((state) => state);
  // console.log(showState);

  useEffect(() => {
    if (userId &&
      accessToken) {
      dispatch(getContacts({
        id: userId,
        token: accessToken,
      }));
    }
  }, [accessToken, userId, dispatch]);

  let renderedContacts = viewedСontacts ?
  viewedСontacts.contactsList?.map((currentContact, i) => {
    
    if (i + 1 === viewedСontacts.contactsList?.length) {
      return (
        <React.Fragment key={uuidv4()}>
          <Contact
          serialNumber = { i }
          currentContact = { currentContact }
          editStatus = {statusList?.[i]}
          // editContact={() => {
          //   dispatch(editContact({
          //     contactNum: i,
          //     newContact: "zzz"
          //   }));
          // }}
          ></Contact>
          <Contact
          serialNumber = { i + 1 }
          currentContact = { `add new contact` }
          editStatus = {statusList?.[i + 1]}
          // editContact={() => {
          //   dispatch(editContact({
          //     contactNum: i,
          //     newContact: "zzz"
          //   }));
          // }}
          ></Contact>
        </React.Fragment>
      );
    }
    return (
      <Contact
        key={uuidv4()}
        serialNumber = { i }
        currentContact = { currentContact }
        editStatus = {statusList?.[i]}
        // editContact={() => {
        //   dispatch(editContact({
        //     contactNum: i,
        //     newContact: "zzz"
        //   }));
        // }}
      ></Contact>
    );
  }):
  <div className={contactsStyle["notifications-general"]}>your contacts will be here</div>;

  return (
    <React.Fragment>
      { renderedContacts }
    </React.Fragment>
  );
}
