import React from "react";
import "./AdminImage.scss";
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
import { BsAlarm, BsAlarmFill, BsApp, BsBattery, BsCalculator, BsCart, BsMenuAppFill, BsSubtract } from "react-icons/bs";

const AdminImage = () => {
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
      <Container className="admin_container_btn">
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
          <Col xs={12}>Раздел "Изображения"</Col>
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
                  Этот раздел предназначен для информации о основных изображениях,
                  которые используются на сайте...
                </Alert.Heading>
                <p>Здесь ты можешь увидеть информацию о соотношении сторон используемых картинок, а так же о их размерах...</p>
              </Alert>
            ) : (
              ""
            )}
          </Col>
        </Row>
        <Row>
 
        </Row>
      </Container>

      <SideBar show={showSidebar} handleClose={handleCloseSidebar} />
    </>
  );
};
export default AdminImage;
