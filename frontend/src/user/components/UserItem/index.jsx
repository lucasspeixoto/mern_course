import React from "react";

import Avatar from "../../../shared/components/UIElements/Avatar/index";
import {
  UserItemCard,
  UserItemImage,
  UserItemInfo,
  UserItemLink,
  UserItemList,
} from "./styles";

const UserItem = ({ id, image, name, placeCount }) => {
  return (
    <UserItemList>
      <UserItemCard>
        <UserItemLink to={`/${id}/places`}>
          <UserItemImage>
            <Avatar image={`http://localhost:5000/${image}`} alt={name} />
          </UserItemImage>
          <UserItemInfo>
            <h2>{name}</h2>
            <h3>
              {placeCount} {placeCount === 1 ? "Place" : "Places"}
            </h3>
          </UserItemInfo>
        </UserItemLink>
      </UserItemCard>
    </UserItemList>
  );
};

export default UserItem;
