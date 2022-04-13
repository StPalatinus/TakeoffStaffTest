import React, { useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { v4 as uuidv4 } from "uuid";
import contactsStyle from '../contacts.module.scss';
import { Input, InputRef } from 'antd';

import {
  toggleEditStatus,
  editContact,
} from "../../../features/slices/MainSlice";


export default function Contact(props: {
  serialNumber: number,
  currentContact: any,
  editStatus: boolean | undefined,
  // handleStatusChange: () => void,
  // editContact: () => void,
}) {
  const dispatch = useAppDispatch();

  const handleFormSubmit = (evt: React.BaseSyntheticEvent) => {
    console.log(evt.target.value);
    if (evt.target.value.trim() !== "") {
      dispatch(editContact({
        serialNumber,
        newContact: evt.target.value,
      }));
      dispatch(toggleEditStatus(serialNumber));
    }
  }

  const inputRef = useRef<InputRef>(null);
  
  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, []);

  // const EditContact = <input type="text" value={currentContact}></input>

  const { serialNumber, currentContact, editStatus } =  props;

  const contactField = editStatus ? 
  <Input 
    type="text" 
    defaultValue={currentContact} 
    className={contactsStyle.contact} 
    onPressEnter={handleFormSubmit} 
    ref={inputRef}></Input> :
  <div 
    className={contactsStyle.contact}
    key={uuidv4()}
    onClick={() => {
      dispatch(toggleEditStatus(serialNumber));
    }}
    >
      {currentContact}
  </div>

    return (
      <React.Fragment>
        {contactField}
      </React.Fragment>
    );
}
