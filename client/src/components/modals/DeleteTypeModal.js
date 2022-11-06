import React from "react";
import { Button, Modal } from "react-bootstrap";
import { deleteType } from "../../http/productAPI";

const DeleteTypeModal = ({ id, name, show, handleClose, reRender }) => {
  const deleteTypeInModal = async (id) => {
    await deleteType(id).then((data) => {
      handleClose();
      reRender()
    });
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Удаление типа "{name}"</Modal.Title>
        </Modal.Header>
        <Modal.Body>Вы уверены, что хотите удалить тип "{name}"?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => deleteTypeInModal(id)}>
            Удалить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default DeleteTypeModal;
