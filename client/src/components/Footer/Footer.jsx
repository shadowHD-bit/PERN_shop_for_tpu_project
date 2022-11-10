import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { SHOP_ROUTE } from "../../utils/consts";
import { Link } from "react-router-dom";

import "./Footer.scss";

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <Container fluid className="m-0 p-0">
          <Container className="footer_container">
            <Row>
              <Col className="d-flex w-100 justify-content-center">
                <Link to={SHOP_ROUTE}>
                  <p className="text_logo">
                    SHOP<span className="logo_dot">.</span>RU
                  </p>
                </Link>
              </Col>
            </Row>
            <Row className="d-flex flex-row justify-content-center align-items-center p-4">
              <Link className="footer_link" to={SHOP_ROUTE}>
                Главная
              </Link>
              <Link className="footer_link" to={SHOP_ROUTE}>
                Товары
              </Link>
              <Link className="footer_link" to={SHOP_ROUTE}>
                О нас
              </Link>
              <Link className="footer_link" to={SHOP_ROUTE}>
                Правила
              </Link>
              <Link className="footer_link" to={SHOP_ROUTE}>
                Вопросы
              </Link>
              <Link className="footer_link" to={SHOP_ROUTE}>
                Основные адреса
              </Link>
              <Link className="footer_link" to={SHOP_ROUTE}>
                Доставка
              </Link>
            </Row>
          </Container>
          <Row className="copyright">
            <Col>
              <p className="copyright_text">
                Copyright © 2022. All rights recerved | This app is made by
                Alexandr Krivikov
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}
