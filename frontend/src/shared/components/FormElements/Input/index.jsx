import React, { useReducer, useEffect } from "react";
import { validate } from "../../../../core/helpers/validators";
import { Container } from "./styles";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input = ({
  id,
  label,
  element,
  type,
  placeholder,
  rows,
  errorText,
  validators,
  onInput,
  initialValue,
  initialValid
}) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: initialValue || "",
    isValid: false,
    isTouched: initialValid || false,
  });

  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [onInput, id, value, isValid]);

  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  const elementToSet =
    element === "input" ? (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={id}
        rows={rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );

  return (
    <Container
      className={
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }
    >
      <label htmlFor={id}>{label}</label>
      {elementToSet}
      {!inputState.isValid && inputState.isTouched && <p>{errorText}</p>}
    </Container>
  );
};

export default Input;
