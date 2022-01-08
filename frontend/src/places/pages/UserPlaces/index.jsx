import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import PlaceList from "../../components/PlaceList";
import { useHttp } from "./../../../core/hooks/useHttp";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";

const UserPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const { isLoading, sendRequest } = useHttp();
  const userId = useParams().userId;

  useEffect(() => {
    const url = `http://localhost:5000/api/places/user/${userId}`;
    const getPlacesByUserId = async () => {
      try {
        const responseData = await sendRequest(url);
        setLoadedPlaces(responseData.places);
      } catch (err) { 
        setLoadedPlaces([]);
        toast.error(err.message, {
          style: { background: "#2b2b2b", color: "#fff" },
          duration: 2000,
        });
      }
    };

    getPlacesByUserId();
  }, [sendRequest, userId]);

  const deletePlaceHandler = (deletedPlaceId) => {
    setLoadedPlaces(prevPlaces => prevPlaces.filter(place => place.id !== deletedPlaceId));
  }

  return (
    <React.Fragment>
      <Toaster position='top-right' reverseOrder={false} />
      {isLoading ? <LoadingSpinner /> : null}
      {!isLoading && loadedPlaces ? <PlaceList items={loadedPlaces} onDeletePlace={deletePlaceHandler}/> : null}
    </React.Fragment>
  );
};

export default UserPlaces;
