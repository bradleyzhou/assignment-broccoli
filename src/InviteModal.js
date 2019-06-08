import React, { useState, useEffect, useRef } from 'react';
import "./InviteModal.css"

function InviteModal(props) {
  const {show, onSuccess} = props;

  const initInputEl = useRef(null);

  useEffect(() => {
    if (show) {
      initInputEl.current.focus();
    }
  }, [show]);

  return !show ? null : (
    <div className="modal-content">
      <h1 className="modal-title">Request an invite</h1>
      <div className="modal-separator"></div>
      <form className="modal-form">
        <input type="text" placeholder="Full Name" name="name" ref={initInputEl} />
        <input type="text" placeholder="Enter Email" name="email" />
        <input type="text" placeholder="Confirm Email" name="email_confirm" />
        <button type="submit" className="send app-button" onClick={onSuccess}>Send</button>
      </form>
    </div>
  );
}

export default InviteModal;
