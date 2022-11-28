import React from "react";
import "./AdminColors.scss";
import {
  Alert,
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import SideBar from "../../../../components/UI/AdminSideBar/SideBar";
import { AiOutlineMenuFold } from "react-icons/ai";
import { useEffect } from "react";
import { useState } from "react";

const AdminColors = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showAlert, setShowAlert] = useState(true);

  const handleShowSidebar = () => {
    setShowSidebar(true);
  };

  const handleCloseSidebar = () => {
    setShowSidebar(false);
  };

  return (
    <>
      <Container className="admin_container_colors">
        <Row className="admin_title">
          <Col xs={12}>
            <Button
              variant="outline-primary"
              onClick={() => handleShowSidebar()}
              className="me-2"
            >
              <AiOutlineMenuFold />
            </Button>
            Админ-панель (v.1.2)
          </Col>
        </Row>
        <Row className="admin_subtitle">
          <Col xs={12}>Раздел "Цвета"</Col>
        </Row>
        <Row>
          <Col xs={12}>
            {showAlert ? (
              <Alert
                variant="primary"
                onClose={() => setShowAlert(false)}
                dismissible
              >
                <Alert.Heading>
                  Этот раздел предназначен для информации о основных палитрах
                  цветов, которые используются на сайте...
                </Alert.Heading>
                <p>Здесь ты можешь увидеть следующую информацию:</p>
                <ul>
                  <li>Палитра цыетов текстовых данных;</li>
                  <li>Палитра цветов основыних блоков;</li>
                  <li>Палитра всех цветов;</li>
                  <li>Палитра цветов библиотеки стилей bootstrap;</li>
                </ul>
              </Alert>
            ) : (
              ""
            )}
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6} xl={4}>
            <Card>
              <Card.Title>
                <p className="title_col">Палитра цветов текста</p>
              </Card.Title>
              <Card.Body>
                <p class="text-red">.text-red</p>
                <p class="text-white-red">.text-white-red</p>
                <p class="text-grey">.text-grey</p>
                <p class="text-white bg-grey">.text-white</p>
                <p class="text-black">.text-black</p>
                <p class="text-pink-red">.text-pink-red</p>
                <p class="text-pink">.text-pink</p>
                <p class="text-green">.text-green</p>
                <p class="text-white-green">.text-white-green</p>
                <p class="text-success">.text-success</p>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6} xl={4}>
            <Card>
              <Card.Title>
                <p className="title_col">Палитра цветов блоков</p>
              </Card.Title>
              <Card.Body>
                <div class="p-2 mb-1 bg-red text-white">.bg-red</div>
                <div class="p-2 mb-1 bg-white-red text-white">
                  .bg-white-red
                </div>
                <div class="p-2 mb-1 bg-grey text-white">.bg-grey</div>
                <div class="p-2 mb-1 bg-white text-black">.bg-white</div>
                <div class="p-2 mb-1 bg-black text-white">.bg-black</div>
                <div class="p-2 mb-1 bg-pink-red text-white">.bg-pink-red</div>
                <div class="p-2 mb-1 bg-pink text-white">.bg-pink</div>
                <div class="p-2 mb-1 bg-green text-white">.bg-green</div>
                <div class="p-2 mb-1 bg-white-green text-white">
                  .bg-white-green
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6} xl={4}>
            <Card>
              <Card.Title>
                <p className="title_col">Палитра серых оттенков</p>
              </Card.Title>
              <Card.Body>
                <div class="p-2 mb-1 bg-gray-100 text-white">.bg-gray-100</div>
                <div class="p-2 mb-1 bg-gray-200 text-white">.bg-gray-200</div>
                <div class="p-2 mb-1 bg-gray-300 text-white">.bg-gray-300</div>
                <div class="p-2 mb-1 bg-gray-400 text-white">.bg-gray-400</div>
                <div class="p-2 mb-1 bg-gray-500 text-white">.bg-gray-500</div>
                <div class="p-2 mb-1 bg-gray-600 text-white">.bg-gray-600</div>
                <div class="p-2 mb-1 bg-gray-700 text-white">.bg-gray-700</div>
                <div class="p-2 mb-1 bg-gray-800 text-white">.bg-gray-800</div>
                <div class="p-2 mb-1 bg-gray-900 text-white">.bg-gray-900</div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6} xl={4}>
            <Card>
              <Card.Title>
                <p className="title_col">Палитра цветов текста Bootstrap</p>
              </Card.Title>
              <Card.Body>
                <p class="text-primary">.text-primary</p>
                <p class="text-secondary">.text-secondary</p>
                <p class="text-success">.text-success</p>
                <p class="text-danger">.text-danger</p>
                <p class="text-warning">.text-warning</p>
                <p class="text-info">.text-info</p>
                <p class="text-light bg-dark">.text-light</p>
                <p class="text-dark">.text-dark</p>
                <p class="text-muted">.text-muted</p>
                <p class="text-white bg-dark">.text-white</p>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6} xl={4}>
            <Card>
              <Card.Title>
                <p className="title_col">Палитра цветов ссылки Bootstrap</p>
              </Card.Title>
              <Card.Body>
                <p>
                  <a href="#" class="text-primary">
                    Primary link
                  </a>
                </p>
                <p>
                  <a href="#" class="text-secondary">
                    Secondary link
                  </a>
                </p>
                <p>
                  <a href="#" class="text-success">
                    Success link
                  </a>
                </p>
                <p>
                  <a href="#" class="text-danger">
                    Danger link
                  </a>
                </p>
                <p>
                  <a href="#" class="text-warning">
                    Warning link
                  </a>
                </p>
                <p>
                  <a href="#" class="text-info">
                    Info link
                  </a>
                </p>
                <p>
                  <a href="#" class="text-light bg-dark">
                    Light link
                  </a>
                </p>
                <p>
                  <a href="#" class="text-dark">
                    Dark link
                  </a>
                </p>
                <p>
                  <a href="#" class="text-muted">
                    Muted link
                  </a>
                </p>
                <p>
                  <a href="#" class="text-white bg-dark">
                    White link
                  </a>
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6} xl={4}>
            <Card>
              <Card.Title>
                <p className="title_col">Палитра цветов блоков Bootstrap</p>
              </Card.Title>
              <Card.Body>
                <div class="p-2 mb-1 bg-primary text-white">.bg-primary</div>
                <div class="p-2 mb-1 bg-secondary text-white">
                  .bg-secondary
                </div>
                <div class="p-2 mb-1 bg-success text-white">.bg-success</div>
                <div class="p-2 mb-1 bg-danger text-white">.bg-danger</div>
                <div class="p-2 mb-1 bg-warning text-dark">.bg-warning</div>
                <div class="p-2 mb-1 bg-info text-white">.bg-info</div>
                <div class="p-2 mb-1 bg-light text-dark">.bg-light</div>
                <div class="p-2 mb-1 bg-dark text-white">.bg-dark</div>
                <div class="p-2 mb-1 bg-white text-dark">.bg-white</div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <SideBar show={showSidebar} handleClose={handleCloseSidebar} />
    </>
  );
};
export default AdminColors;
