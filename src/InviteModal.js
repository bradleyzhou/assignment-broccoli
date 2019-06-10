import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNameInput, useEmailInput } from './ValidInputHooks';
import "./InviteModal.css"

function InviteModal(props) {
  const { show, onSuccess } = props;

  const initInputEl = useRef(null);

  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (show) {
      initInputEl.current.focus();
    }
  }, [show]);

  const {
    onChangeName, name, isNameValid, checkIsNameEmpty, clearName,
  } = useNameInput('');

  return !show ? null : (
    <>
      <h1 className="modal-title">Request an invite</h1>
      <div className="modal-separator"></div>
      <form className="modal-form" onSubmit={onSuccess}>
        <input type="text" placeholder="Full Name" name="name"
          onChange={onNameChange} value={nameValue}
          ref={initInputEl} />
        { isNameDirty && !isNameValid &&
          <div className="validation-error">
            {isNameValid ? 'valid name' : 'invalid name'}
          </div> }
        <input type="text" placeholder="Enter Email" name="email" />
        <input type="text" placeholder="Confirm Email" name="email_confirm" />
        <button type="submit" className="send app-button">Send</button>
      </form>
    </>
  );
}

export default InviteModal;
