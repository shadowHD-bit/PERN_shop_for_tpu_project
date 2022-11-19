import React from "react";
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
import { createQuestion } from "../../../../http/questionAPI";
import SuccessAddQuestionModal from "../SuccessAddQuestionModal/SuccessAddQuestionModal";
import './QuestionModal.scss'


const QuestionModal = ({
  id_user,
  id_product,
  showQuestionModal,
  handleCloseQuestionModal,
}) => {
  const [stateQuestion, setStateQuestion] = useState("");

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const handleCloseSuccessModal = () => setShowSuccessModal(false);
  const handleShowSuccessModal = () => setShowSuccessModal(true);

  const createQuestionUser = () => {
    const formData = new FormData();
    formData.append("text_question", stateQuestion);
    formData.append("id_product", id_product);
    formData.append("id_user_question", id_user);
    createQuestion(formData).then((data) =>{
        handleCloseQuestionModal();
        handleShowSuccessModal();
    });
  };

  return (
    <>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showQuestionModal}
        onHide={handleCloseQuestionModal}
        className="modal_add_question"
      >
        <Modal.Header closeButton>
          <Modal.Title>Задать вопрос...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={12} md={4}>
              <Image
                src={process.env.PUBLIC_URL + "/img/productcard/chatting.png"}
                width={250}
              />
            </Col>
            <Col xs={12} md={8}>
              <InputGroup>
                <Form.Control
                  className="form_question"
                  value={stateQuestion}
                  placeholder="Введите свой вопрос..."
                  as="textarea"
                  onChange={(e) => setStateQuestion(e.target.value)}
                />
              </InputGroup>
            </Col>
          </Row>
          <Row></Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseQuestionModal}>
            Закрыть
          </Button>
          <Button variant="primary" onClick={createQuestionUser}>
            Задать вопрос
          </Button>
        </Modal.Footer>
      </Modal>

      <SuccessAddQuestionModal stateModal={showSuccessModal} handleCloseModal={handleCloseSuccessModal} />
    </>
  );
};
export default QuestionModal;
