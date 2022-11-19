import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { BsPencilFill } from "react-icons/bs";
import ChangeBrand from "../modals/ChangeBrand";
import DeleteBrandModal from "../modals/DeleteBrandModal";

const BrandItemAdmin = ({ id, name, img_now, handleShowToast, reRender }) => {
  const [showDelete, setShowDelete] = useState(false);

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  const [showChange, setShowChange] = useState(false);

  const handleCloseChange = () => setShowChange(false);
  const handleShowChange = () => setShowChange(true);

  return (
    <>
      <tr>
        <td>{id}</td>
        <td>{name}</td>
        <td>
          <Button variant="warning">
            <BsPencilFill size={15} onClick={() => handleShowChange()}/>
          </Button>
        </td>
        <td>
          <Button variant="danger">
            <AiFillDelete size={15} onClick={() => handleShowDelete()} />
          </Button>
        </td>
      </tr>

      <ChangeBrand 
      id={id}
      name={name}
      show={showChange}
      onHide={handleCloseChange}
      reRender={reRender}
      img_now={img_now}
      />

      <DeleteBrandModal
        id={id}
        name={name}
        show={showDelete}
        handleClose={handleCloseDelete}
        reRender={reRender}
      />
    </>
  );
};
export default BrandItemAdmin;
