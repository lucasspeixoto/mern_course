import React from "react";

import toast, { Toaster } from "react-hot-toast";

import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../core/helpers/validators";
import Input from "../../../shared/components/FormElements/Input";
import Button from "../../../shared/components/FormElements/Button";
import { Form } from "./styles";
import { useForm } from "../../../core/hooks/useForm";
import { useHttp } from "../../../core/hooks/useHttp";
import { useAuth } from "../../../core/hooks/useAuth";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";
import { useNavigate } from "react-router-dom";

const NewPlace = () => {
  const { isLoading, sendRequest } = useHttp();
  const { userId } = useAuth();
  const navigate = useNavigate();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        "http://localhost:5000/api/places",
        "POST",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          address: formState.inputs.address.value,
          creator: userId,
        }),
        {
          "Content-Type": "application/json",
        }
      );

      navigate("/");
    } catch (err) {
      toast.error(err.message, {
        style: { background: "#2b2b2b", color: "#fff" },
        duration: 2000,
      });
    }
  };

  return (
    <React.Fragment>
      <Toaster position="top-right" reverseOrder={false} />
      <Form onSubmit={placeSubmitHandler}>
        {isLoading ? <LoadingSpinner /> : null}
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
          initialValue={formState.inputs.title.value}
          initialValid={formState.inputs.title.isValid}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
          initialValue={formState.inputs.description.value}
          initialValid={formState.inputs.description.isValid}
        />
        <Input
          id="address"
          element="input"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address."
          onInput={inputHandler}
          initialValue={formState.inputs.address.value}
          initialValid={formState.inputs.address.isValid}
        />
        <Button type="submit" disabled={!formState.isValid && isLoading}>
          Add Place
        </Button>
      </Form>
    </React.Fragment>
  );
};

export default NewPlace;
