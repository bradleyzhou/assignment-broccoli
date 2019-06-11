import { useState, useEffect } from 'react';

/**
 * Creates a custom hook for the validation of an input element.
 * This can be used as a template for different types of input elements.
 *
 * Example:
 * ```jsx
 *   const {onChange, value, isValid, checkIsEmpty, clearValue} = useValidInput();
 *   <input onChange={onChange} value={value} className={isValid ? "valid" : "invalid"}/>
 *   checkIsEmpty(); // will change isValid to false if value is an empty string
 *   clearValue();   // will reset the value to initialValue
 * ```
 */
function useValidInput(initialValue = '', validator = () => true, triggers = []) {
  const [value, setValue] = useState(initialValue);
  const onChange = e => setValue(e.target.value);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    // only if user has actual input do we check for input validity
    const dirty = (value !== initialValue);
    const valid = (!dirty || validator(value));
    (valid !== isValid) && setIsValid(valid);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value].concat(triggers));

  const checkIsEmpty = () => {
    if (!value || value === '') {
      setIsValid(false);
      return true;
    } else {
      return false;
    }
  };

  const clearValue = () => setValue(initialValue);

  return { onChange, value, isValid, checkIsEmpty, clearValue };
}

/**
 * A hook for an <input> for user name.
 * 
 * Example:
 * ```jsx
 *   const {onChangeName, name, isNameValid, checkIsNameEmpty, clearName} = useNameInput();
 *   <input onChange={onChangeName} value={name} className={isNameValid ? "valid" : "invalid"} />
 *   checkIsNameEmpty(); // will change isNameValid to false if name is an empty string
 *   clearName();   // will reset the name to ''
 * ```
 */
export function useNameInput() {
  const validator = (value) => value.length >= 3;

  const {
    onChange: onChangeName,
    value: name,
    isValid: isNameValid,
    checkIsEmpty: checkIsNameEmpty,
    clearValue: clearName,
  } = useValidInput('', validator);

  return { onChangeName, name, isNameValid, checkIsNameEmpty, clearName };
}

// taken from https://stackoverflow.com/a/46181/1779202
// eslint-disable-next-line no-useless-escape
let EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * A hook for two <input> dealing with email (an email and a confirm email).
 * 
 * * Example:
 * ```jsx
 *   const {
 *     onChangeEmail, email, isEmailValid, checkIsEmailEmpty, clearEmail,
 *     onChangeConfirm, confirm, isConfirmValid, checkIsConfirmEmpty, clearConfirm,
 *   } = useEmailInput();
 *   <input onChange={onChangeEmail} value={email} className={isEmailValid ? "valid" : "invalid"} />
 *   <input onChange={onChangeConfirm} value={confirm}
 *          className={isConfirmValid ? "valid" : "invalid"} />
 *   checkIsEmailEmpty(); // will change isEmailValid to false if email is an empty string
 *   checkIsConfirmEmpty(); // will change isConfirmValid to false if confirm-email is an empty string
 *   clearEmail();   // will reset email to ''
 *   clearConfirm();   // will reset confirm-email to ''
 * ```
 */
export function useEmailInput() {
  const emailValidator = email => EMAIL_REGEX.test(email);
  const {
    onChange: onChangeEmail,
    value: email,
    isValid: isEmailValid,
    checkIsEmpty: checkIsEmailEmpty,
    clearValue: clearEmail,
  } = useValidInput('', emailValidator);

  const confirmValidator = confirm => confirm === email;
  const {
    onChange: onChangeConfirm,
    value: confirm,
    isValid: isConfirmValid,
    checkIsEmpty: checkIsConfirmEmpty,
    clearValue: clearConfirm
  } = useValidInput('', confirmValidator, [email]);

  return { onChangeEmail, email, isEmailValid, checkIsEmailEmpty, clearEmail,
           onChangeConfirm, confirm, isConfirmValid, checkIsConfirmEmpty, clearConfirm };
}
