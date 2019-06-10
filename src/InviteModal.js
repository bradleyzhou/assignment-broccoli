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

  const {
    onChangeEmail, email, isEmailValid, checkIsEmailEmpty, clearEmail,
    onChangeConfirm, confirm, isConfirmValid, checkIsConfirmEmpty, clearConfirm,
  } = useEmailInput('');

  const doSubmit = () => {
    if ([checkIsNameEmpty(), checkIsEmailEmpty(), checkIsConfirmEmpty()].some(v => v)) {
      // since we allow the input fields to be empty while typing, we should check it here when submit
      return;
    }

    setSending(true);

  };

  return !show ? null : (
    <>
      <h1 className="modal-title">Request an invite</h1>
      <div className="modal-separator"></div>
      <form className="modal-form">
        <input type="text" placeholder="Full Name" name="name"
          onChange={onChangeName} value={name}
          className={isNameValid ? "valid" : "invalid"}
          ref={initInputEl}
        />
        <input type="text" placeholder="Enter Email" name="email"
          onChange={onChangeEmail} value={email}
          className={isEmailValid ? "valid" : "invalid"}
        />
        <input type="text" placeholder="Confirm Email" name="email_confirm"
          onChange={onChangeConfirm} value={confirm}
          className={isConfirmValid ? "valid" : "invalid"}
        />
        <button type="button" onClick={doSubmit} className="send app-button"
         disabled={sending}
        >
          {sending ? "Sending, please wait ...": "Send"}
        </button>
      </form>
    </>
  );
}

export default InviteModal;
