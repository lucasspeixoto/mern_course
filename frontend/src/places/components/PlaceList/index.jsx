import React from "react";
import Button from "../../../shared/components/FormElements/Button";
import PlaceItem from "./../PlaceItem/index";
import { Container, Card, List } from "./styles";

const PlaceList = ({ items, onDeletePlace }) => {
  if (items.length === 0) {
    return (
      <Container className="center">
        <Card>
          <h2>No places found. Maybe create one?</h2>
          <Button to="/places/new">Share Place</Button>
        </Card>
      </Container>
    );
  }

  return (
    <List>
      {items.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.image}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          coordinates={place.location}
          onDelete={onDeletePlace}
        />
      ))}
    </List>
  );
};

export default PlaceList;
