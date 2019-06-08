import React, { useState, useEffect, useRef } from 'react';
import "./DoneModal.css"

function DoneModal(props) {
  const {show, closer} = props;

  return !show ? null : (
    <>
      <h1 className="modal-title">All done!</h1>
      <div className="modal-separator"></div>
      <form className="modal-form">
        <p>You will be one of the first to experience Broccoli & Co. when we launch.</p>
        <button className="modal-ok app-button" onClick={closer}>OK</button>
      </form>
    </>
  );
}

export default DoneModal;
