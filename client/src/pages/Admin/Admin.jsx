import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { AiOutlineMenuFold } from "react-icons/ai";
import SideBar from "../../components/UI/AdminSideBar/SideBar";
import "./Admin.scss";


const Admin = () => {
  
  const [showSidebar, setShowSidebar] = useState(false);

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
          <Col xs={12}>Раздел "Главная"</Col>
        </Row>
        </Container>

        <SideBar show={showSidebar} handleClose={handleCloseSidebar} />

    </>
  );
};

export default Admin;
