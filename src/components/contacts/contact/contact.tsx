import React, { useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { v4 as uuidv4 } from "uuid";
import contactsStyle from '../contacts.module.scss';
import { Input, InputRef, Button } from 'antd';

import {
  toggleEditStatus,
  editContact,
  removeContact
} from "../../../features/slices/MainSlice";
// import { TypeOfTag } from 'typescript';


export default function Contact(props: {
  serialNumber: number | undefined,
  currentContact: any,
  editStatus: boolean | undefined,
  isLast: boolean,
}) {
  const dispatch = useAppDispatch();

  const handleFormSubmit = (evt: React.BaseSyntheticEvent) => {
    if (evt.target.value.trim() === "add new contact") {
      dispatch(toggleEditStatus(serialNumber));
    }
    else if (evt.target.value.trim() !== "") {
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

  const generateContactFields =(serial: number | undefined, fieldIsLast: boolean, contact: typeof currentContact) => {
    let withLastCalled = false;
    const generateContactField = (serial: number | undefined, fieldIsLast: boolean, contact: typeof currentContact): JSX.Element => {
      // console.log(`fieldIsLast: ${fieldIsLast}`);
      // console.log(`withLastCalled ${withLastCalled}`);
      
      if(fieldIsLast && !withLastCalled) {
        withLastCalled = true;
        // generateContactField(serial + 1, fieldIsLast, "add new contact");
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
    return generateContactField(serial, fieldIsLast, contact);
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
    generateContactFields(serialNumber, isLast, currentContact);
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
