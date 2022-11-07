import React from "react";
import { useState } from "react";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import { AiOutlineMenuFold } from "react-icons/ai";
import ChangeSlides from "../../../../components/modals/ChangeSlide";
import CreateSlider from "../../../../components/modals/CreateSlides";
import SideBar from "../../../../components/UI/AdminSideBar/SideBar";

const AdminSlider = () => {
  const [showAlert, setShowAlert] = useState(true);

  const [showSidebar, setShowSidebar] = useState(false);
  const [stateAccordion, setStateAccordion] = useState(false);

  const [slideCreateVisible, setSlideCreateVisible] = useState(false);
  const [slideChangeVisible, setSlideChangeVisible] = useState(false);

  const handleShowSidebar = () => {
    setShowSidebar(true);
  };

  const handleCloseSidebar = () => {
    setShowSidebar(false);
  };

  return (
    <>
      <Container className="admin_container">
        <Row className="admin_title">
          <Col xs={12}>
            <Button
              variant="outline-info"
              onClick={() => handleShowSidebar()}
              className="me-2"
            >
              <AiOutlineMenuFold />
            </Button>
            Админ-панель (v.1.2)
          </Col>
        </Row>
        <Row className="admin_subtitle">
          <Col xs={12}>Раздел "Слайдер"</Col>
        </Row>
        <Row>
          <Col xs={12}>
            {showAlert ? (
              <Alert
                variant="info"
                onClose={() => setShowAlert(false)}
                dismissible
              >
                <Alert.Heading>
                  Этот раздел предназначен для работы со слайдером...
                </Alert.Heading>
                <p>Здесь ты можешь работать со слайдером:</p>
                <ul>
                  <li>
                    Чтобы изменить информацию слайдера, нажмите кнопку
                    "Удалить/изменить слайдер", выбирите интересующий слайд и
                    укажите необходимую информацию.
                  </li>
                  <li>
                    Чтобы удалить слайд, нажмите кнопку "Удалить/изменить слайд,
                    выберите нужный слайд и нажмите кнопку "Удалить".
                  </li>
                  <li>
                    Чтобы добавить слайд, нажмите кнопку "Добавить слайд",
                    укажите необходимую информацию и нажмите кнопку "Добавить".
                  </li>
                </ul>
              </Alert>
            ) : (
              ""
            )}
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <Button
              variant={"outline-dark"}
              className="w-100"
              onClick={() => setSlideCreateVisible(true)}
            >
              Добавить слайд
            </Button>
          </Col>
          <Col xs={6}>
            <Button
              variant={"outline-dark"}
              className="w-100"
              onClick={() => setSlideChangeVisible(true)}
            >
              Удалить/Изменить слайд
            </Button>
          </Col>
        </Row>
      </Container>

      <SideBar show={showSidebar} handleClose={handleCloseSidebar} />

      <CreateSlider
        show={slideCreateVisible}
        onHide={() => setSlideCreateVisible(false)}
      />
      <ChangeSlides
        show={slideChangeVisible}
        onHide={() => setSlideChangeVisible(false)}
      />
    </>
  );
};
export default AdminSlider;
