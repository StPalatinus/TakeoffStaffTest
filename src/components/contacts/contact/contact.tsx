import React, { useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { v4 as uuidv4 } from "uuid";
import contactsStyle from '../contacts.module.scss';
import { Input, InputRef, Button } from 'antd';

import {
  toggleEditStatus,
  editContact,
  removeContact,
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
    // serialNumber && 
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
      // console.log(`fieldIsLast: ${fieldIsLast}`);
      // console.log(`withLastCalled ${withLastCalled}`);
      
      if(fieldIsLast && !withLastCalled) {
        withLastCalled = true;
        // renderContactField(serial + 1, fieldIsLast, "add new contact");
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
      // console.log("contact rendered");
      return (
        <div 
          className={contactsStyle.contact}
          key={uuidv4()}
          onClick={() => {
            dispatch(toggleEditStatus(serial));
          }}
        > {contact}
            <Button 
            className={contactsStyle["remove-button"]} 
            onClick={(evt: React.BaseSyntheticEvent) => {
              evt.stopPropagation();
              dispatch(removeContact(serial))
            }}
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
  // <React.Fragment>
  // <div 
  //   className={contactsStyle.contact}
  //   key={uuidv4()}
  //   onClick={() => {
  //     dispatch(toggleEditStatus(serialNumber));
  //   }}
  // > {currentContact}
  //     <Button 
  //     className={contactsStyle["remove-button"]} 
  //     onClick={() => {dispatch(removeContact(serialNumber))}}
  //     >
  //       &#10006;
  //     </Button>
  // </div>
  // </React.Fragment>;
  

    return (
      <React.Fragment>
        {contactField}
      </React.Fragment>
    );
}
