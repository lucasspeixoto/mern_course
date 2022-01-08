import React, { useState } from "react";

import toast, { Toaster } from "react-hot-toast";

import Button from "../../../shared/components/FormElements/Button";
import Modal from "../../../shared/components/UIElements/Modal/index";
import Map from "../../../shared/components/UIElements/Map";

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

import { useAuth } from "../../../core/hooks/useAuth";
import { useHttp } from "../../../core/hooks/useHttp";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";

const PlaceItem = ({
  id: placeId,
  image,
  title,
  address,
  creatorId,
  description,
  coordinates,
  onDelete,
}) => {
  const [showMap, setShowMap] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const { isLoading, sendRequest } = useHttp();

  const { userId, token } = useAuth();

  const deletePlaceHandler = async () => {
    const url = `http://localhost:5000/api/places/${placeId}`;
    setShowDelete(false);
    try {
      await sendRequest(url, "DELETE", null, {
        Authorization: `Bearer ${token}`,
      });
      onDelete(placeId);
    } catch (err) {
      toast.error(err.message, {
        style: { background: "#2b2b2b", color: "#fff" },
        duration: 2000,
      });
    }
  };

  return (
    <React.Fragment>
      <Toaster position='top-right' reverseOrder={false} />
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
      {isLoading ? (
        <LoadingSpinner asOverlay />
      ) : (
        <ListItem>
          <Card>
            <ImageContainer>
              <img src={`http://localhost:5000/${image}`} alt={title} />
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

              {creatorId === userId ? (
                <>
                  <Button to={`/places/${placeId}`}>Edit</Button>
                  <Button danger onClick={() => setShowDelete(true)}>
                    Delete
                  </Button>
                </>
              ) : null}
            </ActionsContainer>
          </Card>
        </ListItem>
      )}
    </React.Fragment>
  );
};

export default PlaceItem;
