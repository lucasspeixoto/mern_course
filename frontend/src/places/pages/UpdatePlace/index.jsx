import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../core/helpers/validators";
import { useForm } from "../../../core/hooks/useForm";
import { useHttp } from "../../../core/hooks/useHttp";
import Button from "../../../shared/components/FormElements/Button";
import Input from "../../../shared/components/FormElements/Input";
import { BackLink, ButtonsContainer, Form } from "./styles";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";
import { useAuth } from "../../../core/hooks/useAuth";

/* const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Old Suomenlinna Fortification",
    description:
      "An inhabited sea fortress built on eight islands about 4 km southeast of the city center of Helsinki, the capital of Finland.",
    imageUrl:
      "http://www.burningwell.org/gallery/var/albums/Cityscapes/dscn1782.jpg?m=1575118302",
    address: "00190 Helsinki, Finland",
    location: {
      lat: 60.14541,
      lng: 24.98814,
    },
    creator: "u2",
  },
]; */

const UpdatePlace = () => {
  const placeId = useParams().placeId;

  const [loadedPlace, setLoadedPlace] = useState();

  const { isLoading, sendRequest } = useHttp();
  const { userId } = useAuth();
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const navigate = useNavigate();

  useEffect(() => {
    const url = `http://localhost:5000/api/places/${placeId}`;
    const getPlace = async () => {
      try {
        const responseData = await sendRequest(url);
        setLoadedPlace(responseData.place);
        setFormData(
          {
            title: {
              value: responseData.place.title,
              isValid: true,
            },
            description: {
              value: responseData.place.description,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {
        setLoadedPlace();
        toast.error(err.message, {
          style: { background: "#2b2b2b", color: "#fff" },
          duration: 2000,
        });
      }
    };

    getPlace();
  }, [sendRequest, placeId, setFormData]);

  const placeUpdateSubmitHandler = async (event) => {
    event.preventDefault();

    const url = `http://localhost:5000/api/places/${placeId}`;

    try {
      await sendRequest(
        url,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      navigate(`/${userId}/places`);
    } catch (err) {
      toast.error(err.message, {
        style: { background: "#2b2b2b", color: "#fff" },
        duration: 2000,
      });
    }
  };

  if (!loadedPlace) {
    return (
      <div className='center'>
        <h2>Could not find place!</h2>
      </div>
    );
  }

  return (
    <React.Fragment>
      <Toaster position='top-right' reverseOrder={false} />

      {!isLoading && loadedPlace ? (
        <Form onSubmit={placeUpdateSubmitHandler}>
          <Input
            id='title'
            element='input'
            type='text'
            label='Title'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please enter a new valid title.'
            onInput={inputHandler}
            initialValue={loadedPlace.title}
            initialValid={true}
          />
          <Input
            id='description'
            element='textarea'
            label='Description'
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText='Please enter a new valid description (min. 5 characters).'
            onInput={inputHandler}
            initialValue={loadedPlace.description}
            initialValid={true}
          />
          <ButtonsContainer>
            <Button type='submit' disabled={!formState.isValid}>
              Update
            </Button>
            <BackLink to={`/${userId}/places`}>Go Back</BackLink>
          </ButtonsContainer>
        </Form>
      ) : (
        <LoadingSpinner />
      )}
    </React.Fragment>
  );
};

export default UpdatePlace;
