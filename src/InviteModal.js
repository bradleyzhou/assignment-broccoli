import React, { useState, useEffect, useRef } from 'react';
import "./InviteModal.css"

export function useNameInput(initialValue = '') {
  const [value, setValue] = useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const [isDirty, setIsDirty] = useState(false);
  const [isValid, setIsValid] = useState(true);
  useEffect(() => {
    const dirty = (value !== initialValue);
    setIsDirty(dirty);
    if (dirty && value.length < 3) {
      // only if user has actual input do we check for username
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [value]);

  return { onChange, value, isValid, isDirty }
}

export function useEmailInput(initialValue = '') {
  const [value, setValue] = useState(initialValue);
  const [confirm, setConfirm] = useState(initialValue);
  const onChangeValue = e => setValue(e.target.value);
  const onChangeConfirm = e => setConfirm(e.target.value);
  return { onChangeValue, value, onChangeConfirm, confirm }
}

function InviteModal(props) {
  const { show, onSuccess } = props;

  const initInputEl = useRef(null);

  useEffect(() => {
    if (show) {
      initInputEl.current.focus();
    }
  }, [show]);

  const {
    onChange: onNameChange,
    value: nameValue,
    isValid: isNameValid,
    isDirty: isNameDirty,
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
