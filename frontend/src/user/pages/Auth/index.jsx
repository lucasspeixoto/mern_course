import React, { useState, useCallback } from "react";

import toast, { Toaster } from "react-hot-toast";

import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from "../../../core/helpers/validators";
import { useAuth } from "../../../core/hooks/useAuth";
import { useForm } from "../../../core/hooks/useForm";
import { useHttp } from "../../../core/hooks/useHttp";
import Input from "../../../shared/components/FormElements/Input";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";

import Button from "./../../../shared/components/FormElements/Button/index";
import { ButtonContainer, Form } from "./styles";

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
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

  const { sendRequest, isLoading } = useHttp();

  const switchModeHandler = useCallback(() => {
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
  }, [formState.inputs, isLoginMode, setFormData]);

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );

        login(responseData.user.id);
      } catch (err) {
        toast.error(err.message, {
          style: { background: "#2b2b2b", color: "#fff" },
          duration: 2000,
        });
      }
    } else {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/signup",
          "POST",
          JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );

        login(responseData.user.id);
      } catch (err) {
        toast.error(err.message, {
          style: { background: "#2b2b2b", color: "#fff" },
          duration: 2000,
        });
      }
    }
  };

  return (
    <React.Fragment>
      {isLoading ? <LoadingSpinner asOverlay /> : null}
      <Toaster position='top-right' reverseOrder={false} />
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
          validators={[VALIDATOR_MINLENGTH(6)]}
          errorText='Please enter a valid password (at least 6 characters).'
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
