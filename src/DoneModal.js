import React from 'react';

function DoneModal(props) {
  const {show, closer} = props;

  return !show ? null : (
    <>
      <h1 className="modal-title">All done!</h1>
      <div className="modal-separator"></div>
      <form className="modal-form">
        <p>You will be one of the first to experience Broccoli & Co. when we launch.</p>
        <button type="button" className="modal-action button" onClick={closer}>OK</button>
      </form>
    </>
  );
}

export default DoneModal;
