import React, { useState, useEffect, useRef } from 'react';
import { useNameInput, useEmailInput } from './ValidInputHooks';
import { requestInvite } from './RequestInvite';
import "./InviteModal.scss"

/**
 * The invite modal component. Must be wrapped in an element of .modal-canvas > .modal-content
 */
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

  const [errorMessage, setErrorMessage] = useState('');

  const doSubmit = () => {
    if ([checkIsNameEmpty(), checkIsEmailEmpty(), checkIsConfirmEmpty()].some(v => v)) {
      // since we allow the input fields to be empty while typing, we should check it here when submit
      return;
    }

    if (!isNameValid || !isEmailValid || !isConfirmValid) {
      return;
    }

    setSending(true);
    setErrorMessage('');

    requestInvite(name, email)
    .then(() => {
      onSuccess();
      clearName();
      clearEmail();
      clearConfirm();
    })
    .catch((err) => {
      const msg = err.response.data.errorMessage;
      setErrorMessage(msg);
    })
    .finally(() => {
      setSending(false);
    });
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
        <button type="button" onClick={doSubmit} className="modal-action button"
         disabled={sending}
        >
          {sending ? "Sending, please wait ...": "Send"}
        </button>
        <div className="validation-error">{errorMessage}</div>
      </form>
    </>
  );
}

export default InviteModal;
