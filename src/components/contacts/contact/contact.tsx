import React, { useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { v4 as uuidv4 } from "uuid";
import contactsStyle from '../contacts.module.scss';
import { Input, InputRef, Button } from 'antd';

import {
  toggleEditStatus,
  removeContact,
  editContact,
  modifyContacts,
} from "../../../features/slices/MainSlice";


export default function Contact(props: {
  serialNumber: number,
  currentContact: string,
  editStatus: boolean | undefined,
  isLast: boolean,
}) {
  const dispatch = useAppDispatch();

  const accessToken = useAppSelector((state) => state.handleLogin.accessToken);
  const userId = useAppSelector((state) => state.handleLogin.user?.id);
  const currentContacts = useAppSelector((state) => state.handleLogin.viewedСontacts.contactsList);

  const handleFormSubmit = (evt: React.BaseSyntheticEvent) => {
    if (evt.target.value.trim() === "add new contact") {
      dispatch(toggleEditStatus(serialNumber));
    }
    else if (evt.target.value.trim() !== "" && 
    userId && 
    accessToken && 
    currentContacts
    ) {
      dispatch(toggleEditStatus(serialNumber));
      dispatch(editContact({
        serialNumber,
        newContact: evt.target.value,
      }));
      let newContacts = [...currentContacts];
      newContacts[serialNumber] = evt.target.value;
      dispatch(modifyContacts({
        id: userId,
        token: accessToken,
        serialNumber,
        newContacts,
      }));
    }
  }

  const handleContactDelete = () => {
    dispatch(removeContact(serialNumber));
    if ( 
    userId && 
    accessToken && 
    currentContacts
    ) {
      dispatch(toggleEditStatus(serialNumber));
      let newContacts = [...currentContacts];
      newContacts.splice(serialNumber, 1);
      dispatch(modifyContacts({
        id: userId,
        token: accessToken,
        serialNumber,
        newContacts,
      }));
    }
  }

  const inputRef = useRef<InputRef>(null);
  
  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, []);

  const renderContactFields =(serial: number | undefined, fieldIsLast: boolean, contact: typeof currentContact) => {
    let withLastCalled = false;
    const renderContactField = (serial: number | undefined, fieldIsLast: boolean, contact: typeof currentContact): JSX.Element => {
      
      if(fieldIsLast && !withLastCalled) {
        withLastCalled = true;
        return (
          <div 
            className={contactsStyle.contact}
            key={uuidv4()}
            onClick={() => {
              dispatch(toggleEditStatus(serial));
            }}
          > {contact}
          </div>
        )
      }
      return (
        <div 
          className={contactsStyle.contact}
          key={uuidv4()}
          onClick={(evt) => {
            evt.stopPropagation();
            dispatch(toggleEditStatus(serial));
          }}
        > {contact}
            <Button 
            className={contactsStyle["remove-button"]} 
            onClick={handleContactDelete}
            >
              &#10006;
            </Button>
        </div>
      )
    }
    return renderContactField(serial, fieldIsLast, contact);
  }

  const { serialNumber, currentContact, editStatus, isLast } =  props;

  const contactField = editStatus ? 
  <Input 
    type="text" 
    defaultValue={currentContact} 
    className={contactsStyle.contact} 
    onPressEnter={handleFormSubmit} 
    onBlur={handleFormSubmit} 
    ref={inputRef}></Input> :
    renderContactFields(serialNumber, isLast, currentContact);  

    return (
      <React.Fragment>
        {contactField}
      </React.Fragment>
    );
}
