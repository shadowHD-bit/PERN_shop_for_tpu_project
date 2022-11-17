import React from "react";
import { Button, Modal } from "react-bootstrap";
import { deleteReviewsProduct } from "../../http/reviewsAPI";

const DeleteReview = ({show, handleClose, id_review, reRender}) => {

const deleteReviewInModal = () => {
    deleteReviewsProduct(id_review).then(() => {
        reRender()
        handleClose()
    })
}

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
          <Modal.Title>Удаление отзыва №{id_review}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Вы уверены, что хотите удалить отзыв №{id_review}?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => deleteReviewInModal()}>
            Удалить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default DeleteReview