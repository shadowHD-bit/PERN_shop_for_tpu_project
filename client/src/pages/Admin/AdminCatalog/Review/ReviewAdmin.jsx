import React, { useEffect } from "react";
import { useState } from "react";
import { Accordion, Alert, Button, Col, Container, Row, Table } from "react-bootstrap";
import { AiOutlineMenuFold } from "react-icons/ai";
import ReviewItemAdmin from "../../../../components/AdminItems/ReviewItemAdmin";
import SideBar from "../../../../components/UI/AdminSideBar/SideBar";
import { fetchReviews } from "../../../../http/reviewsAPI";
import "./ReviewAdmin.scss";

const ReviewAdmin = () => {
  const [showAlert, setShowAlert] = useState(true);

  const [showSidebar, setShowSidebar] = useState(false);
  const [stateAccordion, setStateAccordion] = useState(false);

  const [reviews, setReviews] = useState([]);

  const [rerenderReview, setRerenderReview] = useState(false);

  const handleShowSidebar = () => {
    setShowSidebar(true);
  };

  const handleCloseSidebar = () => {
    setShowSidebar(false);
  };

  useEffect(() => {
    fetchReviews().then((data) => {
      setReviews(data);
    });
  }, []);

  //re-render after change status, or delete some order
  useEffect(() => {
    fetchReviews().then((data) => {
        setReviews(data);
      });
  }, [rerenderReview]);

  const reRender = () => {
    setRerenderReview(!rerenderReview);
  };

  return (
    <>
      <Container className="admin_container">
        <Row className="admin_title">
          <Col xs={12}>
            <Button
              variant="outline-success"
              onClick={() => handleShowSidebar()}
              className="me-2"
            >
              <AiOutlineMenuFold />
            </Button>
            Админ-панель (v.1.2)
          </Col>
        </Row>
        <Row className="admin_subtitle">
          <Col xs={12}>Раздел "Вопросы"</Col>
        </Row>
        <Row>
          <Col xs={12}>
            {showAlert ? (
              <Alert
                variant="success"
                onClose={() => setShowAlert(false)}
                dismissible
              >
                <Alert.Heading>
                  Этот раздел предназначен для работы с вопросами...
                </Alert.Heading>
                <p>Здесь ты можешь работать с вопросами:</p>
                <ul>
                  <li>
                    Если вопрос задан не по теме или содержит элементы цензуры,
                    то возможно удалить вопрос, нажав на кнопку "Удалить" в
                    строке соответствующего вопроса в таблице.
                  </li>
                  <li>
                    Если необходимо изменить ответ на вопрос, то нажмите кнопку
                    "Изменить" в строке соответствующего вопроса.
                  </li>
                  <li>
                    Чтобы просмотреть текст вопроса и увидеть всю информацию о
                    вопросе, нажмите кнопку "Информация" в соответствующей
                    строке вопроса в таблице.
                  </li>
                </ul>
              </Alert>
            ) : (
              ""
            )}
          </Col>
        </Row>
        <Row>
          <Accordion>
            <Accordion.Item
              eventKey=""
              className="mt-4 mb-4"
              onClick={() => setStateAccordion(true)}
            >
              <Accordion.Header>Список отзывов</Accordion.Header>
              <Accordion.Body>
                <Table striped bordered hover className="mt-4 p-2">
                  <thead>
                    <tr>
                      <th>ID отзыва</th>
                      <th>ID товара</th>
                      <th>Подробнее</th>
                      <th>Удалить</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                        reviews.rows?.map((item) => (
                            <ReviewItemAdmin 
                            key={item.id}
                            review_data={item}
                            reRender={reRender}
                            />
                        ))
                    }
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Row>
      </Container>

      <SideBar show={showSidebar} handleClose={handleCloseSidebar} />
    </>
  );
};
export default ReviewAdmin;
