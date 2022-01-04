import React from "react";
import { useParams } from "react-router-dom";
import PlaceList from "../../components/PlaceList";

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
      "An inhabited sea fortress built on eight islands about 4 km southeast of the city center of Helsinki, the capital of Finlands",
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

const UserPlaces = () => {
  const userId = useParams().userId;

  const loadedPlaces = DUMMY_PLACES.filter((place) => place.creator === userId);

  return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;
