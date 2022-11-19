import React from "react";
import "./SuccessAddQuestionModal.scss";
import { useState } from "react";
import {
  Button,
  Col,
  Form,
  Image,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";

const SuccessAddQuestionModal = ({ stateModal, handleCloseModal }) => {
  return (
    <>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={stateModal}
        onHide={handleCloseModal}
        className="modal_add_question"
      >
        <Modal.Header closeButton>
          <Modal.Title>Ваш вопрос отправлен!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={12} md={4}>
              <Image
                src={process.env.PUBLIC_URL + "/img/productcard/tea-time.png"}
                width={250}
              />
            </Col>
            <Col xs={12} md={8}>
              <p className="success_text">
                Мы приняли ваш вопрос по данному товару! В ближайшее время мы ответим на него... Мы оповестим вас в разделе уведомлений.
              </p>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default SuccessAddQuestionModal;
