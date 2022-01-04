import React, { useState } from "react";
import Button from "../../../shared/components/FormElements/Button";

import {
  Card,
  ActionsContainer,
  ImageContainer,
  InfoContainer,
  ListItem,
  ModalContent,
  ButtonsContainer,
  DeleteModalContent,
} from "./styles";

import Modal from "../../../shared/components/UIElements/Modal/index";
import Map from "../../../shared/components/UIElements/Map";
import { useAuth } from "../../../core/hooks/useAuth";

const PlaceItem = ({ id, image, title, address, description, coordinates }) => {
  const [showMap, setShowMap] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const { isLogged } = useAuth();

  const deletePlaceHandler = () => {
    console.log("delete");
  };
  return (
    <React.Fragment>
      {/* Map Modal */}
      <Modal
        show={showMap}
        onCancel={() => setShowMap(false)}
        header={address}
        footer={<Button onClick={() => setShowMap(false)}>Close</Button>}
      >
        <ModalContent>
          <Map center={coordinates} zoom={16} />
        </ModalContent>
      </Modal>
      {/* Delete Modal */}
      <Modal
        show={showDelete}
        onCancel={() => setShowDelete(false)}
        header='Are you sure ?'
        footer={
          <>
            <ButtonsContainer>
              <Button inverse onClick={() => setShowDelete(false)}>
                Cancel
              </Button>
              <Button danger onClick={deletePlaceHandler}>
                Confirm
              </Button>
            </ButtonsContainer>
          </>
        }
      >
        <DeleteModalContent>
          <p>
            {" "}
            Do you want to proceed and delete this place ? Please note that it
            can't be undone thereafter{" "}
          </p>
          <hr />
        </DeleteModalContent>
      </Modal>
      <ListItem>
        <Card>
          <ImageContainer>
            <img src={image} alt={title} />
          </ImageContainer>

          <InfoContainer>
            <h2>{title}</h2>
            <h3>{address}</h3>
            <p>{description}</p>
          </InfoContainer>

          <ActionsContainer>
            <Button inverse onClick={() => setShowMap(true)}>
              View on Map
            </Button>

            {isLogged ? (
              <>
                <Button to={`/places/${id}`}>Edit</Button>
                <Button danger onClick={() => setShowDelete(true)}>
                  Delete
                </Button>
              </>
            ) : null}
          </ActionsContainer>
        </Card>
      </ListItem>
    </React.Fragment>
  );
};

export default PlaceItem;
