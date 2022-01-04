import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../core/helpers/validators";
import { useForm } from "../../../core/hooks/useForm";
import Button from "../../../shared/components/FormElements/Button";
import Input from "../../../shared/components/FormElements/Input";
import { BackLink, ButtonsContainer, Form } from "./styles";

const DUMMY_PLACES = [
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
];

const UpdatePlace = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const placeId = useParams().placeId;

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

  const identifiedPlace = DUMMY_PLACES.find((place) => place.id === placeId);

  useEffect(() => {
    if (identifiedPlace) {
      setUserId(identifiedPlace.creator);
      setFormData(
        {
          title: {
            value: identifiedPlace.title,
            isValid: true,
          },
          description: {
            value: identifiedPlace.description,
            isValid: true,
          },
        },
        true
      );
    }
    setIsLoading(false);
  }, [setFormData, identifiedPlace]);

  const placeUpdateSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  const loading = (
    <div className='center'>
      <h2>...Loading</h2>
    </div>
  );

  if (isLoading || !formState.inputs.title.value) {
    return loading;
  }

  if (!identifiedPlace) {
    return (
      <div className='center'>
        <h2>Could not find place!</h2>
      </div>
    );
  }

  return (
    <Form onSubmit={placeUpdateSubmitHandler}>
      <Input
        id='title'
        element='input'
        type='text'
        label='Title'
        validators={[VALIDATOR_REQUIRE()]}
        errorText='Please enter a new valid title.'
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id='description'
        element='textarea'
        label='Description'
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText='Please enter a new valid description (min. 5 characters).'
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
      <ButtonsContainer>
        <Button type='submit' disabled={!formState.isValid}>
          Update
        </Button>
       {/*  <Button type='button' inverse component={Link} to={`/${userId}/places`}>
          Go Back
        </Button> */}
        <BackLink to={`/${userId}/places`}>Go Back</BackLink>
      </ButtonsContainer>
    </Form>
  );
};

export default UpdatePlace;
