import React, { useContext, useEffect, useState } from "react";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import { AiOutlineMenuFold } from "react-icons/ai";
import { Link } from "react-router-dom";
import SideBar from "../../components/UI/AdminSideBar/SideBar";
import { fetchBadge, fetchBrands, fetchProduct, fetchSizes, fetchTypes } from "../../http/productAPI";
import { fetchQuestion } from "../../http/questionAPI";
import { fetchSlider } from "../../http/sliderAPI";
import { ADMIN_BADGE_ROUTE, ADMIN_BRANDANDTYPE_ROUTE, ADMIN_PRODUCT_ROUTE, ADMIN_QUESTION_ROUTE, ADMIN_SIZE_ROUTE, ADMIN_SLIDER_ROUTE } from "../../utils/consts";
import "./Admin.scss";

const Admin = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const handleShowSidebar = () => {
    setShowSidebar(true);
  };

  const handleCloseSidebar = () => {
    setShowSidebar(false);
  };

  const [countProduct, setCountProduct] = useState(0)
  const [countType, setCountType] = useState(0)
  const [countBrand, setCountBrand] = useState(0)
  const [countQuestion, setCountQuestion] = useState(0)

  const [countSize, setCountSize] = useState(0)
  const [countBadge, setCountBadge] = useState(0)
  const [countUser, setCountUser] = useState(0)
  const [countSlide, setCountSlide] = useState(0)

  useEffect(() => {
    fetchProduct().then(data => {
      setCountProduct(data.count)
    })
    fetchTypes().then(data => {
      setCountType(data.count)
    })
    fetchBrands().then(data => {
      setCountBrand(data.count)
    })
    fetchQuestion({ limit: 1000, page: 1000 }).then(data => {
      setCountQuestion(data.count)
    })
    fetchSizes().then(data => {
      setCountSize(data.count)
    })
    fetchBadge().then(data => {
      setCountBadge(data.count)
    })
    // fetchBrands().then(data => {
    //   setCountBrand(data.count)
    // })
    fetchSlider().then(data => {
      setCountSlide(data.length)
    })
  }, [])

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
        <Row>
          <Col xs={12} md={6} xl={3}>
            <Link to={ADMIN_PRODUCT_ROUTE}>
              <Alert variant="success">
                <Alert.Heading>{countProduct}</Alert.Heading>
                Количество товаров
              </Alert>
            </Link>
          </Col>

          <Col xs={12} md={6} xl={3}>
            <Link to={ADMIN_BRANDANDTYPE_ROUTE}>
              <Alert variant="danger">
                <Alert.Heading>{countType}</Alert.Heading>
                Количество типов
              </Alert>
            </Link>
          </Col>

          <Col xs={12} md={6} xl={3}>
            <Link to={ADMIN_BRANDANDTYPE_ROUTE}>
              <Alert variant="warning">
                <Alert.Heading>{countBrand}</Alert.Heading>
                Количество брендов
              </Alert>
            </Link>
          </Col>

          <Col xs={12} md={6} xl={3}>
            <Link to={ADMIN_QUESTION_ROUTE}>
              <Alert variant="info">
                <Alert.Heading>{countQuestion}</Alert.Heading>
                Количество вопросов
              </Alert>
            </Link>
          </Col>

          <Col xs={12} md={6} xl={3}>
            <Link to={ADMIN_SIZE_ROUTE}>
              <Alert variant="secondary">
                <Alert.Heading>{countSize}</Alert.Heading>
                Количество размеров
              </Alert>
            </Link>
          </Col>

          <Col xs={12} md={6} xl={3}>
            <Link to={ADMIN_BADGE_ROUTE}>
              <Alert variant="success">
                <Alert.Heading>{countBadge}</Alert.Heading>
                Количество бэйджов
              </Alert>
            </Link>
          </Col>

          <Col xs={12} md={6} xl={3}>
            <Link to={ADMIN_PRODUCT_ROUTE}>
              <Alert variant="danger">
                <Alert.Heading>{countUser}</Alert.Heading>
                Количество пользователей
              </Alert>
            </Link>
          </Col>

          <Col xs={12} md={6} xl={3}>
            <Link to={ADMIN_SLIDER_ROUTE}>
              <Alert variant="warning">
                <Alert.Heading>{countSlide}</Alert.Heading>
                Количество слайдов
              </Alert>
            </Link>
          </Col>

        </Row>
      </Container>

      <SideBar show={showSidebar} handleClose={handleCloseSidebar} />
    </>
  );
};

export default Admin;
