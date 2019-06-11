import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import App from './App';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it('renders without crashing', () => {
  ReactDOM.render(<App />, container);
});

it('shows invite modal when clicking', () => {
  act(() => {
    ReactDOM.render(<App />, container);
  });

  const button = container.querySelector('button');
  act(() => {
    button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });

  const modal = container.querySelector('.modal-canvas');
  expect(modal.className).toContain('modal-canvas');
});
