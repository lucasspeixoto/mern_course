import React, { useState } from "react";

import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from "../../../core/helpers/validators";
import { useAuth } from "../../../core/hooks/useAuth";
import { useForm } from "../../../core/hooks/useForm";
import Input from "../../../shared/components/FormElements/Input";

import Button from "./../../../shared/components/FormElements/Button/index";
import { ButtonContainer, Form } from "./styles";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      //delete formState.inputs.name;
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = (event) => {
    event.preventDefault();
    login();
    navigate("/u1/places");
  };

  return (
    <React.Fragment>
      <Form onSubmit={authSubmitHandler}>
        {isLoginMode ? (
          <h2 className='center'>Login</h2>
        ) : (
          <h2 className='center'>Create Account</h2>
        )}
        <hr />
        {!isLoginMode && (
          <Input
            id='name'
            element='input'
            type='text'
            label='User Name'
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
            errorText='Please enter a valid name (at least 5 characters).'
            onInput={inputHandler}
          />
        )}

        <Input
          id='email'
          element='input'
          type='text'
          label='Email'
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
          errorText='Please enter a valid e-mail.'
          onInput={inputHandler}
        />
        <Input
          id='password'
          element='input'
          type='password'
          label='Password'
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText='Please enter a valid password (at least 5 characters).'
          onInput={inputHandler}
        />
        <ButtonContainer>
          <Button
            className='center'
            type='submit'
            disabled={!formState.isValid}
          >
            {isLoginMode ? "Login" : "Signup"}
          </Button>
          <Button
            inverse
            className='center'
            type='button'
            onClick={switchModeHandler}
          >
            {isLoginMode ? "Create Account" : "Go to Login"}
          </Button>
        </ButtonContainer>
      </Form>
    </React.Fragment>
  );
};

export default Auth;
