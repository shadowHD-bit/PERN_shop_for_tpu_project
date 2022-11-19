import React from 'react'
import './ErrorAuthModalQuestion.scss'
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

const ErrorAuthModalQuestion = ({stateModal, handleCloseModal}) => {
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
          <Modal.Title>Упсс... Кажеться вы забыли войти</Modal.Title>
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
                <p className="error_text">
                    Только авторизированные пользователи могут задавать вопросы по интересующим их товарам... Пожалуйста авторизируйтесь или зарегистрируйтесь на сайте! )
                </p>
                <Button className='auth_question_btn'>
                    Войти на сайт
                </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  )
}
export default ErrorAuthModalQuestion