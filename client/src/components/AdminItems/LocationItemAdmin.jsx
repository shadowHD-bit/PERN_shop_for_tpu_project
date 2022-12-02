import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { BsPencil, BsTrashFill } from "react-icons/bs";
import { deleteLocationsApi, fetchOneLocations } from "../../http/locationAPI";
import ChangeLocation from "../modals/ChangeLocation";

const LocationItemAdmin = ({ item, reRender }) => {
  const [stateChangeModal, setStateChangeModal] = useState(false);

  const handleShowLocationChange = () => {
    setStateChangeModal(true);
  };

  const handleCloseLocationChange = () => {
    setStateChangeModal(false);
  };

  const deleteLocation = (id) => {
    deleteLocationsApi(id).then((data) => {
      reRender();
    });
  };
  return (
    <>
      <tr>
        <td>{item.id}</td>
        <td>{item.title}</td>
        <td>{item.text_address}</td>
        <td>
          [{item.x_coordination}, {item.y_coordination}]
        </td>
        <td>
          <Button variant="warning" onClick={() => handleShowLocationChange()}>
            <BsPencil />
          </Button>
        </td>
        <td>
          <Button variant="danger" onClick={() => deleteLocation(item.id)}>
            <BsTrashFill />
          </Button>
        </td>
      </tr>

      <ChangeLocation
        item={item}
        reRender={reRender}
        show={stateChangeModal}
        onHide={handleCloseLocationChange}
      />
    </>
  );
};
export default LocationItemAdmin;
