import React, { useState, useEffect, useRef } from 'react';
import InviteModal from './InviteModal';
import './normalize.css';
import './App.css';
import './Modal.css';
import DoneModal from './DoneModal';

function App() {
  const [modalShown, setModalShown] = useState(false);
  const [inviteShown, setInviteShown] = useState(false);
  const [done, setDone] = useState(false);

  const modalEl = useRef(null);

  const showModal = () => {
    setModalShown(true);
    setDone(false);
    setInviteShown(true);
    modalEl.current.style.display = "block";
  }
  const closeModal = () => {
    showModal(false);
    modalEl.current.style.display = "none";
  }

  const onInviteSent = () => {
    setInviteShown(false);
    setDone(true);
  }

  return (
    <div className="app">
      <header className="app-header">
        <p className="header-item">Broccoli & Co.</p>
      </header>
      <div className="app-content">
        <h1 className="banner-title">A better way<br />to enjoy every day.</h1>
        <p className="banner-subtitle">Be the first to know when we launch.</p>
        <button className="request-invite app-button" onClick={showModal}>Request an invite</button>
      </div>
      <footer className="app-footer">
        <p>Made with ❤ in Shanghai.</p>
        <p>© 2019 Broccoli & Co. All rights reserved.</p>
      </footer>
      <div className="modal" ref={modalEl}>
        <InviteModal show={inviteShown} onSuccess={onInviteSent}/>
        <DoneModal show={done} closer={closeModal} />
      </div>
    </div>
  );
}

export default App;
