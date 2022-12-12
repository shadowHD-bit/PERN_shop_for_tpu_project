import React from "react";
import { Button, Col, Image, Modal, Row, Table } from "react-bootstrap";
const DetailsPostedReview = ({ show, handleClose, review }) => {
  console.log(review);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title>Информация об отзыве</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>Текст отзыва: {review[0]?.text_reviews}</Col>
          </Row>
          <Row>
            <Col>
              Соответствие описанию:{" "}
              {review[0]?.description_true
                ? "Cоответствует"
                : "Не соответствует"}
            </Col>
          </Row>
          <Row>
            <Col>
              Соответствие размера:{" "}
              {review[0]?.size_true ? "Cоответствует" : "Не соответствует"}
            </Col>
          </Row>
          <Row>
            <Col>
              Соответствие доставки:{" "}
              {review[0]?.delivery_true ? "Cоответствует" : "Не соответствует"}
            </Col>
          </Row>
          <Row>
            <Col>
              {review[0]?.img_reviews == "not img" ? (
                "Изображение не прикреплено!"
              ) : (
                <img
                  width={"10%"}
                  src={process.env.REACT_APP_API_URL + review[0]?.img_reviews}
                />
              )}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={() => handleClose()}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default DetailsPostedReview;
