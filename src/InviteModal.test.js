import React from 'react';
import ReactDOM from 'react-dom';
import { act, Simulate } from 'react-dom/test-utils';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import InviteModal from './InviteModal';
import { requestInviteUrl } from './RequestInvite';
import { async } from 'q';

let container;

let mockAxios = new MockAdapter(axios);

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it('validates name when changing name input', () => {
  const onSuccess = jest.fn();
  act(() => {
    ReactDOM.render(<InviteModal show={true} onSuccess={onSuccess}/>, container);
  });

  let input = container.querySelector('input[name=name]');
  expect(input.className).toContain('valid');

  act(() => {
    input.value = 'a';
    Simulate.change(input);
  });
  input = container.querySelector('input[name=name]');
  expect(input.className).toContain('invalid');

  act(() => {
    input.value = 'aaa';
    Simulate.change(input);
  });
  input = container.querySelector('input[name=name]');
  expect(input.className).toContain('valid');

  act(() => {
    input.value = '';
    Simulate.change(input);
  });
  input = container.querySelector('input[name=name]');
  expect(input.className).toContain('valid');
});

it('validates email when changing email input', () => {
  const onSuccess = jest.fn();
  act(() => {
    ReactDOM.render(<InviteModal show={true} onSuccess={onSuccess}/>, container);
  });

  let input = container.querySelector('input[name=email]');
  expect(input.className).toContain('valid');

  act(() => {
    input.value = 'a';
    Simulate.change(input);
  });
  input = container.querySelector('input[name=email]');
  expect(input.className).toContain('invalid');

  act(() => {
    input.value = 'a@a.aa';
    Simulate.change(input);
  });
  input = container.querySelector('input[name=email]');
  expect(input.className).toContain('valid');

  act(() => {
    input.value = '';
    Simulate.change(input);
  });
  input = container.querySelector('input[name=email]');
  expect(input.className).toContain('valid');
});

it('validates confirm-email when changing confirm-email input', () => {
  const onSuccess = jest.fn();
  act(() => {
    ReactDOM.render(<InviteModal show={true} onSuccess={onSuccess}/>, container);
  });

  let emailInput = container.querySelector('input[name=email]');
  let confirmInput = container.querySelector('input[name=email_confirm]');
  expect(confirmInput.className).toContain('valid');

  act(() => {
    emailInput.value = 'a@a.aa';
    Simulate.change(emailInput);
    confirmInput.value = 'aa';
    Simulate.change(confirmInput);
  });
  confirmInput = container.querySelector('input[name=email_confirm]');
  expect(confirmInput.className).toContain('invalid');

  act(() => {
    confirmInput.value = 'a@a.aa';
    Simulate.change(confirmInput);
  });
  confirmInput = container.querySelector('input[name=email_confirm]');
  expect(confirmInput.className).toContain('valid');

  act(() => {
    confirmInput.value = '';
    Simulate.change(confirmInput);
  });
  confirmInput = container.querySelector('input[name=email_confirm]');
  expect(confirmInput.className).toContain('valid');
});

it('prevents submission with empty values when clicking button', () => {
  const onSuccess = jest.fn();
  act(() => {
    ReactDOM.render(<InviteModal show={true} onSuccess={onSuccess}/>, container);
  });

  const initialInvalidInputs = container.querySelectorAll('input.invalid');
  expect(initialInvalidInputs.length).toEqual(0);

  const button = container.querySelector('button');
  act(() => {
    button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
  expect(onSuccess).not.toBeCalled();

  const invalidInputs = container.querySelectorAll('input.invalid');
  expect(invalidInputs.length).toEqual(3);
});

it('prevents submission with invalid values when clicking button', () => {
  const onSuccess = jest.fn();
  act(() => {
    ReactDOM.render(<InviteModal show={true} onSuccess={onSuccess}/>, container);
  });

  const nameInput = container.querySelector('input[name=name]');
  const emailInput = container.querySelector('input[name=email]');
  const confirmInput = container.querySelector('input[name=email_confirm]');
  const button = container.querySelector('button');
  act(() => {
    nameInput.value = 'John';
    emailInput.value = 'john@john';
    confirmInput.value = 'john@john';
    Simulate.change(nameInput);
    Simulate.change(emailInput);
    Simulate.change(confirmInput);
    button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
  expect(onSuccess).not.toBeCalled();

  const invalidInputs = container.querySelectorAll('input.invalid');
  expect(invalidInputs.length).toBeGreaterThan(0);
});

// TODO: make async testing with act() work
// it('submits with valid values when clicking button', (done) => {
//   const onSuccess = jest.fn();
//   act(() => {
//     ReactDOM.render(<InviteModal show={true} onSuccess={onSuccess}/>, container);
//   });

//   const requestPromise = mockAxios.onPost(requestInviteUrl).reply(200, "OK");

//   const nameInput = container.querySelector('input[name=name]');
//   const emailInput = container.querySelector('input[name=email]');
//   const confirmInput = container.querySelector('input[name=email_confirm]');
//   const button = container.querySelector('button');

//   act(() => {
//     nameInput.value = 'John';
//     emailInput.value = 'john@john.com';
//     confirmInput.value = 'john@john.com';
//     Simulate.change(nameInput);
//     Simulate.change(emailInput);
//     Simulate.change(confirmInput);
//   });

//   act(() => {
//     button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
//   });

//   setTimeout(() => {
//     expect(onSuccess).toBeCalled();
//     done();
//   });
// });
