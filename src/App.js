import React, { useState } from 'react';
import InviteModal from './InviteModal';
import DoneModal from './DoneModal';
import './normalize.css';
import './App.scss';
import './Modal.scss';

function App() {
  const [modalCanvasShown, setModalCanvasShown] = useState(false);
  const [inviteShown, setInviteShown] = useState(false);
  const [done, setDone] = useState(false);

  const showModal = () => {
    setModalCanvasShown(true);
    setDone(false);
    setInviteShown(true);
  }
  const closeModal = () => {
    setModalCanvasShown(false);
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
        <button className="request-invite button" onClick={showModal}>Request an invite</button>
      </div>
      <footer className="app-footer">
        <p>Made with ❤ in Shanghai.</p>
        <p>© 2019 Broccoli & Co. All rights reserved.</p>
      </footer>
      {modalCanvasShown &&
        <div className="modal-canvas">
          <div className="modal-content">
            <InviteModal show={inviteShown} onSuccess={onInviteSent}/>
            <DoneModal show={done} closer={closeModal} />
          </div>
        </div>
      }
    </div>
  );
}

export default App;
