import axios from 'axios';

/**
 * Send a request-invite to the backend API.
 */
export function requestInvite(name, email) {
  return axios.post('https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth', {
    name,
    email,
  });
}

/**
 * Send a mock request-invite. Does not talk to the backend API.
 * Useful when developing.
 */
export function requestInviteMock(name, email) {
  return new Promise(function(resolve, reject) {
    if (email === 'usedemail@airwallex.com') {
      setTimeout(() => {
        reject({ response: {
          status: 400,
          data: {
            errorMessage: "Bad Request: Email is already in use",
          }
        } });
      }, 1500);
    } else {
      setTimeout(function() {
        resolve('foo');
      }, 1500);
    }
  });
}
