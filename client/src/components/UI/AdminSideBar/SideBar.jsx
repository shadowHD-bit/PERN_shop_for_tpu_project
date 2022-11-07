import React from "react";
import { Button, Col, Container, Nav, Row, Offcanvas } from "react-bootstrap";
import {
    MdColorLens,
  MdDocumentScanner,
  MdImage,
  MdOutlineDomainVerification,
  MdPattern,
  MdQuestionAnswer,
  MdQuiz,
  MdReviews,
  MdSmartButton,
  MdSupport,
  MdTabletMac,
  MdTextSnippet,
  MdToys,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { ADMIN_BRANDANDTYPE_ROUTE, ADMIN_EXCEL_ROUTE, ADMIN_ORDER_ROUTE, ADMIN_PRODUCT_ROUTE, ADMIN_QUESTION_ROUTE, ADMIN_ROUTE, ADMIN_SLIDER_ROUTE } from "../../../utils/consts";
import "./SideBar.scss";

const SideBar = ({show, handleClose}) => {
  return (
    <>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Навигация</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Container fluid className="sidebar_container">
            <Row className="sidebar_row_dop">
              <Col xs={12} className="sidebar_col_dop">
                ОСНОВНЫЕ НАСТРОЙКИ
              </Col>
            </Row>

            <Row className="sidebar_row">
            <Link to={ADMIN_ROUTE}>
              <Col xs={12} className="sidebar_col">
                <Row>
                  <Col xs={6} className="sidebar_row_icons">
                    <MdOutlineDomainVerification size={"30px"} />
                  </Col>
                  <Col xs={6} className="sidebar_row_text">
                    Главная
                  </Col>
                </Row>
              </Col>
              </Link>
            </Row>

            <Row className="sidebar_row">
              <Col xs={12} className="sidebar_col">
                <Row>
                  <Col xs={6} className="sidebar_row_icons">
                    <MdSupport size={"30px"} />
                  </Col>
                  <Col xs={6} className="sidebar_row_text">
                    Статистика
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row className="sidebar_row">
            <Link to={ADMIN_BRANDANDTYPE_ROUTE}>
              <Col xs={12} className="sidebar_col">
                <Row>
                  <Col xs={6} className="sidebar_row_icons">
                    <MdSupport size={"30px"} />
                  </Col>
                  <Col xs={6} className="sidebar_row_text">
                    Бренды и типы
                  </Col>
                </Row>
              </Col>
              </Link>
            </Row>

            <Row className="sidebar_row">
              <Link to={ADMIN_PRODUCT_ROUTE}>
              <Col xs={12} className="sidebar_col">
                <Row>
                  <Col xs={6} className="sidebar_row_icons">
                    <MdToys size={"30px"} />
                  </Col>
                  <Col xs={6} className="sidebar_row_text">
                    Товары
                  </Col>
                </Row>
              </Col>
              </Link>
            </Row>

            <Row className="sidebar_row">
              <Link to={ADMIN_ORDER_ROUTE}>
              <Col xs={12} className="sidebar_col">
                <Row>
                  <Col xs={6} className="sidebar_row_icons">
                    <MdDocumentScanner size={"30px"} />
                  </Col>
                  <Col xs={6} className="sidebar_row_text">
                    Заказы
                  </Col>
                </Row>
              </Col>
              </Link>
            </Row>

            <Row className="sidebar_row">
              <Link to={ADMIN_EXCEL_ROUTE}>
              <Col xs={12} className="sidebar_col">
                <Row>
                  <Col xs={6} className="sidebar_row_icons">
                    <MdTextSnippet size={"30px"} />
                  </Col>
                  <Col xs={6} className="sidebar_row_text">
                    Документы
                  </Col>
                </Row>
              </Col>
              </Link>
            </Row>

            <Row className="sidebar_row">
              <Link to={ADMIN_SLIDER_ROUTE}>
              <Col xs={12} className="sidebar_col">
                <Row>
                  <Col xs={6} className="sidebar_row_icons">
                    <MdTabletMac size={"30px"} />
                  </Col>
                  <Col xs={6} className="sidebar_row_text">
                    Слайдер
                  </Col>
                </Row>
              </Col>
              </Link>
            </Row>

            <Row className="sidebar_row">
              <Link to={ADMIN_QUESTION_ROUTE}>
              <Col xs={12} className="sidebar_col">
                <Row>
                  <Col xs={6} className="sidebar_row_icons">
                    <MdQuestionAnswer size={"30px"} />
                  </Col>
                  <Col xs={6} className="sidebar_row_text">
                    Вопросы
                  </Col>
                </Row>
              </Col>
              </Link>
            </Row>

            <Row className="sidebar_row">
              <Col xs={12} className="sidebar_col">
                <Row>
                  <Col xs={6} className="sidebar_row_icons">
                    <MdReviews size={"30px"} />
                  </Col>
                  <Col xs={6} className="sidebar_row_text">
                    Отзывы
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row className="sidebar_row">
              <Col xs={12} className="sidebar_col">
                <Row>
                  <Col xs={6} className="sidebar_row_icons">
                    <MdQuiz size={"30px"} />
                  </Col>
                  <Col xs={6} className="sidebar_row_text">
                    Основные вопросы
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row className="sidebar_row_dop">
              <Col xs={12} className="sidebar_col_dop">
                ДЛЯ РАЗРАБОТЧИКА
              </Col>
            </Row>

            <Row className="sidebar_row">
              <Col xs={12} className="sidebar_col">
                <Row>
                  <Col xs={6} className="sidebar_row_icons">
                    <MdColorLens size={"30px"} />
                  </Col>
                  <Col xs={6} className="sidebar_row_text">
                    Цвета
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row className="sidebar_row">
              <Col xs={12} className="sidebar_col">
                <Row>
                  <Col xs={6} className="sidebar_row_icons">
                    <MdPattern size={"30px"} />
                  </Col>
                  <Col xs={6} className="sidebar_row_text">
                    Шаблоны
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row className="sidebar_row">
              <Col xs={12} className="sidebar_col">
                <Row>
                  <Col xs={6} className="sidebar_row_icons">
                    <MdSmartButton size={"30px"} />
                  </Col>
                  <Col xs={6} className="sidebar_row_text">
                    Кнопки
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row className="sidebar_row">
              <Col xs={12} className="sidebar_col">
                <Row>
                  <Col xs={6} className="sidebar_row_icons">
                    <MdImage size={"30px"} />
                  </Col>
                  <Col xs={6} className="sidebar_row_text">
                    Изображения
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default SideBar;
