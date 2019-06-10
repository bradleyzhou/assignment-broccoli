import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import DoneModal from './DoneModal';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it('calls closer when clicking button', () => {
  const closer = jest.fn();
  act(() => {
    ReactDOM.render(<DoneModal show={true} closer={closer}/>, container);
  });

  const button = container.querySelector('button');
  act(() => {
    button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
  expect(closer).toBeCalled();
});
