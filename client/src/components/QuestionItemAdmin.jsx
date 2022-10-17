import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";
import { createAnswer, updateAnswerText } from "../http/answerAPI";
import { changeStatusQuestion, deleteQuestion } from "../http/questionAPI";
import { PRODUCT_ROUTE } from "../utils/consts";

const QuestionItemAdmin = ({
  id_question,
  userId,
  productId,
  product_name,
  createdAt,
  updatedAt,
  completeQuestion,
  product,
  answer,
  reRenderQuestion,
  question_text,
}) => {
  // const [modalDelete, setShowDelete] = useState(false);
  // const [modalStatus, setShowStatus] = useState(false);
  const [modalInfo, setShowInfo] = useState(false);
  const [modalDelete, setShowDelete] = useState(false);

  // //modal delete
  // const handleCloseDelete = () => setShowDelete(false);
  // const handleShowDelete = () => setShowDelete(true);
  // const deleteOrder = () => {
  //     fetchDeleteOrder({id}).then(() => {
  //         setShowStatus(false);
  //         setTimeout(() => reRender(), 250);
  //     })
  // }

  // //modal status
  // const handleCloseStatus = () => setShowStatus(false);
  // const handleShowStatus = () => setShowStatus(true);
  // const changeStatusOrder = () => {
  //     fetchChangeStatusOrder({complete: !complete, id}).then(() => {
  //         setShowStatus(false);
  //         setTimeout(() => reRender(), 250);
  //     })
  // }

  //modal info
  const handleCloseInfo = () => setShowInfo(false);
  const handleShowInfo = () => setShowInfo(true);

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  const watchInfo = () => {
    handleShowInfo();
  };

  //Format date (createdAt)
  const formatDate = (propsDate) => {
    const date = new Date(Date.parse(propsDate));
    const options = {
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      timezone: "UTC",
    };
    return date.toLocaleString("en-US", options);
  };

  const [modalAnswer, setShowAnswer] = useState(false);

  // //modal delete
  const handleCloseAnswer = () => setShowAnswer(false);
  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const [stateAnswer, setStateAnswer] = useState("");

  const addAnswer = (id_question, name_user, answer) => {
    const formDataAnswer = new FormData();
    formDataAnswer.append("id_question", id_question);
    formDataAnswer.append("id_user_answer", name_user);
    formDataAnswer.append("text_answer", answer);
    createAnswer(formDataAnswer);
    changeStatusQuestion({
      complete_question: !completeQuestion,
      id_question,
    }).then(() => {
      handleCloseAnswer();
      setTimeout(() => reRenderQuestion(), 250);
    });
  };

  const [modalChangeAnswer, setShowChangeAnswer] = useState(false);

  const handleCloseChangeAnswer = () => setShowChangeAnswer(false);
  const handleShowChangeAnswer = () => {
    setShowChangeAnswer(true);
  };

  const openChangeModal = () => {
    handleShowChangeAnswer();
    setChangeText(answer.answer_text);
  };

  const [changeText, setChangeText] = useState("");

  const changeAnswerText = (id_answer, text_answer) => {
    updateAnswerText({ id_answer, text_answer }).then(() => {
      handleCloseChangeAnswer();
      setTimeout(() => reRenderQuestion(), 250);
    });
  };

  const deleteQA = (id) => {
    deleteQuestion({id}).then(() => {
      handleCloseDelete();
      setTimeout(() => reRenderQuestion(), 250);
    })
  }

  // const createQuestionUser = () => {

  //   // id_product, id_user_question, text_question
  //   const formData = new FormData();
  //   formData.append("text_question", stateQuestion);
  //   formData.append("id_product", id);
  //   formData.append("id_user_question", user.user.id);
  //   createQuestion(formData).then((data) => setShowQuestionModal(false));
  // };

  // useEffect(() => {
  //     getOneOrderProducts(id).then(data => setProductInfo(data))
  // }, [])

  return (
    <>
      <tr>
        <td>{id_question}</td>
        <td>
          <a href={PRODUCT_ROUTE + "/" + productId}>{productId}</a>
        </td>
        <td>{userId}</td>
        <td>{product.name}</td>
        <td>{formatDate(createdAt)}</td>
        <td>{completeQuestion ? "Есть ответ" : "Нет ответа"}</td>
        <td>{completeQuestion ? formatDate(updatedAt) : "-"}</td>
        <td>
          <Button variant="info" onClick={() => watchInfo()}>
            Подробнее
          </Button>
        </td>
        <td>
          {answer != null ? (
            <Button variant="success" onClick={() => openChangeModal()}>
              Изменить
            </Button>
          ) : (
            <Button variant="success" onClick={() => handleShowAnswer()}>
              Ответить
            </Button>
          )}
        </td>
        <td>
          <Button variant="danger" onClick={handleShowDelete}>Удалить</Button>
        </td>
      </tr>

      {/*modal confirm change status*/}
      <Modal show={modalInfo} onHide={handleCloseInfo}>
        <Modal.Header closeButton>
          <Modal.Title>Информация о вопросе</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li>ID вопроса: {id_question}</li>
            <li>ID товара: {productId}</li>
            <li>ID пользователя: {userId}</li>
            <li>Название товара: {product.name}</li>
            <li>Вопрос: {question_text}</li>
            <li>Дата вопроса: {formatDate(createdAt)}</li>
            <li>
              Ответ на вопрос: {answer != null ? answer.answer_text : "-"}
            </li>
            <li>
              Дата ответа: {answer != null ? formatDate(answer.updatedAt) : "-"}
            </li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseInfo}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>

      {/*modal confirm answer order*/}
      <Modal show={modalAnswer} onHide={handleCloseAnswer}>
        <Modal.Header closeButton>
          <Modal.Title>Окно ответа на вопрос</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Вопрос: {question_text}
          <br />
          Введите ответ:
          <InputGroup>
            <Form.Control
              value={stateAnswer}
              as="textarea"
              onChange={(e) => setStateAnswer(e.target.value)}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAnswer}>
            Закрыть
          </Button>
          <Button
            variant="danger"
            onClick={() => addAnswer(id_question, userId, stateAnswer)}
          >
            Добавить ответ
          </Button>
        </Modal.Footer>
      </Modal>

      {/*modal confirm change order*/}
      <Modal
        show={modalChangeAnswer}
        onHide={handleCloseChangeAnswer}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Окно изменения ответа
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li>ID вопроса: {id_question}</li>
            <li>ID товара: {productId}</li>
            <li>ID пользователя: {userId}</li>
            <li>Название товара: {product.name}</li>
            <li>Вопрос: {question_text}</li>
            <li>Дата вопроса: {formatDate(createdAt)}</li>
          </ul>
          Ответ:
          <InputGroup>
            <Form.Control
              value={changeText}
              as="textarea"
              onChange={(e) => setChangeText(e.target.value)}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={() => changeAnswerText(answer.id_answer, changeText)}
          >
            Сохранить изменения
          </Button>
          <Button variant="secondary" onClick={handleCloseChangeAnswer}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>

      {/*modal confirm delete order*/}
      <Modal
        show={modalDelete}
        onHide={handleCloseDelete}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Подтверждение удаления вопроса
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         Вы действитель хотите удалить вопрос?
        </Modal.Body>
        <Modal.Footer>
        <Button variant="danger" onClick={() => deleteQA(id_question)}>
            Удалить
          </Button>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default QuestionItemAdmin;
