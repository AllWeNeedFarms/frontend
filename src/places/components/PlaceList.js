import React from "react";

import Card from "../../shared/components/UIElements/Card";
import PlaceItem from "./PlaceItem";
import Button from "../../shared/components/FormElements/Button";
import "./PlaceList.css";

const PlaceList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No farms found. Maybe create one?</h2>
          <Button to="/farms/new">Share Place</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {props.items.map((farm) => (
        <PlaceItem
          key={farm.id}
          id={farm.id}
          image={farm.image}
          title={farm.title}
          description={farm.description}
          address={farm.address}
          creatorId={farm.creator}
          coordinates={farm.location}
          onDelete={props.onDeleteFarm} // UserPlaces
        />
      ))}
    </ul>
  );
};

export default PlaceList;
