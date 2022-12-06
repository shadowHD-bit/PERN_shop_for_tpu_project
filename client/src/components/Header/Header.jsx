import React, { useState, useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import "./Header.scss";
import {
  Button,
  Badge,
  Container,
  Col,
  Row,
  InputGroup,
  Form,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import {
  BsBag,
  BsBasket,
  BsBell,
  BsHeart,
  BsPerson,
  BsPinMap,
  BsSearch,
  BsTruck,
} from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";
import { BsGoogle } from "react-icons/bs";
import { FaVk } from "react-icons/fa";

import { MdOutlineLogin } from "react-icons/md";
import { Context } from "../..";
import {
  BASKET_ROUTE,
  LIKES_ROUTER,
  LOCATIONPLACES_ROUTE,
  LOGIN_ROUTE,
  NOTIFICATION_ROUTE,
  ORDERS_ROUTE,
  SHOP_ROUTE,
  USERPROFILE_ROUTE,
} from "../../utils/consts";
import { Link, useNavigate } from "react-router-dom";
import { getData } from "../../http/userAPI";
import SocialHeader from "../UI/Social/Header/SocialHeader";
import { AiOutlineMenu } from "react-icons/ai";
import Sidebar from "../UI/SideBar/Sidebar";
import { fetchNotificationOneUser } from "../../http/notificationAPI";

const Header = observer(() => {
  const { user, basket, likes, notifications } = useContext(Context);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [load, setload] = useState(false);
  useEffect(() => {
    getData(user.user.id).then((data) => {
      user.setUserProf(data);
    });
  }, [load]);

  if (user.isAuth) {
    return (
      <>
        <header className="header">
          <Container fluid className="header_container">
            <Row className="header_top">
              <Col
                className="header_top_left"
                xs={12}
                sm={12}
                md={6}
                lg={6}
                xl={4}
                xxl={4}
              >
                <SocialHeader />
              </Col>
              <Col
                className="header_top_center d-none d-xl-flex"
                xl={4}
                xxl={4}
              >
                <p className="top_text">
                  Одевайся стильно и будь уверен в себе...
                </p>
              </Col>
              <Col
                className="header_top_right d-none d-md-flex"
                md={6}
                lg={6}
                xl={4}
                xxl={4}
              >
                <a className="right_text" href="tel:+7 (908) 956-60-33">
                  +7 (908) 956-60-33
                </a>
                <a className="right_text" href="mailto:adk26@tpu.ru">
                  adk26@tpu.ru
                </a>
              </Col>
            </Row>
            <Row className="header_main">
              <Container>
                <Row>
                  <Col
                    className="header_logo"
                    xs={6}
                    sm={6}
                    md={6}
                    lg={6}
                    xl={4}
                    xxl={4}
                  >
                    <Link to={SHOP_ROUTE}>
                      <p className="text_logo">
                        SHOP<span className="logo_dot">.</span>RU
                      </p>
                    </Link>
                  </Col>
                  <Col
                    className="header_search d-none d-xl-flex"
                    xl={4}
                    xxl={4}
                  >
                    <InputGroup>
                      <InputGroup.Text
                        id="basic-addon1"
                        className="search_text"
                      >
                        <BsSearch />
                      </InputGroup.Text>
                      <Form.Control
                        className="search_input"
                        placeholder="Что вас интересует?"
                        aria-label="search"
                        aria-describedby="basic-addon1"
                      />
                    </InputGroup>
                  </Col>
                  <Col
                    className="header_user_navigation"
                    xs={6}
                    md={6}
                    sm={6}
                    lg={6}
                    xl={4}
                    xxl={4}
                  >
                    <OverlayTrigger
                      placement="bottom"
                      delay={{ show: 250, hide: 400 }}
                      overlay={
                        <Tooltip id="button-tooltip">Уведомления</Tooltip>
                      }
                    >
                      <Link to={NOTIFICATION_ROUTE}>
                        <BsBell className="user_icon" size={25} />
                        {notifications.count != 0 ? (
                        <Badge pill={true}>{notifications.count}</Badge>
                      ) : (
                        ""
                      )}
                      </Link>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="bottom"
                      delay={{ show: 250, hide: 400 }}
                      overlay={
                        <Tooltip id="button-tooltip">Корзина</Tooltip>
                      }
                    >
                    <Link to={BASKET_ROUTE}>
                      <BsBasket className="user_icon" size={25} />
                      {basket._count != 0 ? (
                        <Badge pill={true}>{basket._count}</Badge>
                      ) : (
                        ""
                      )}
                    </Link>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="bottom"
                      delay={{ show: 250, hide: 400 }}
                      overlay={
                        <Tooltip id="button-tooltip">Заказы</Tooltip>
                      }
                    >
                    <Link to={ORDERS_ROUTE}>
                      <BsBag className="user_icon" size={25} />
                    </Link>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="bottom"
                      delay={{ show: 250, hide: 400 }}
                      overlay={
                        <Tooltip id="button-tooltip">Лайки</Tooltip>
                      }
                    >
                    <Link to={LIKES_ROUTER}>
                      <BsHeart className="user_icon" size={25} />
                      {likes._likes.length != 0 ? (
                        <Badge pill={true}>{likes._likes.length}</Badge>
                      ) : (
                        ""
                      )}
                    </Link>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="bottom"
                      delay={{ show: 250, hide: 400 }}
                      overlay={
                        <Tooltip id="button-tooltip">Кабинет</Tooltip>
                      }
                    >
                    <Link to={USERPROFILE_ROUTE}>
                      <BsPerson className="user_icon" size={25} />
                    </Link>
                    </OverlayTrigger>
                    <Button
                      variant="outline-dark"
                      className="off_btn"
                      onClick={handleShow}
                    >
                      <AiOutlineMenu className="off_icons" />
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Row>
          </Container>
        </header>

        <Sidebar
          show={show}
          handleClose={handleClose}
          isAdmin={user.isAdmin}
          isAuth={user.isAuth}
          basket={basket}
          likes={likes}
        />
      </>
    );
  } else {
    return (
      <>
        <header className="header">
          <Container fluid className="header_container">
            <Row className="header_top">
              <Col
                className="header_top_left"
                xs={12}
                sm={12}
                md={6}
                lg={6}
                xl={4}
                xxl={4}
              >
                <SocialHeader />
              </Col>
              <Col
                className="header_top_center d-none d-xl-flex"
                xl={4}
                xxl={4}
              >
                <p className="top_text">
                  Dress stylishly and be confident in yourself...
                </p>
              </Col>
              <Col
                className="header_top_right d-none d-md-flex"
                md={6}
                lg={6}
                xl={4}
                xxl={4}
              >
                <a className="right_text" href="tel:+7 (908) 956-60-33">
                  +7 (908) 956-60-33
                </a>
                <a className="right_text" href="mailto:adk26@tpu.ru">
                  adk26@tpu.ru
                </a>
              </Col>
            </Row>
            <Row className="header_main">
              <Container>
                <Row>
                  <Col
                    className="header_logo"
                    xs={6}
                    sm={6}
                    md={6}
                    lg={6}
                    xl={4}
                    xxl={4}
                  >
                    <Link to={SHOP_ROUTE}>
                      <p className="text_logo">
                        SHOP<span className="logo_dot">.</span>RU
                      </p>
                    </Link>
                  </Col>
                  <Col
                    className="header_search d-none d-xl-flex"
                    xl={4}
                    xxl={4}
                  >
                    <InputGroup>
                      <InputGroup.Text
                        id="basic-addon1"
                        className="search_text"
                      >
                        <BsSearch />
                      </InputGroup.Text>
                      <Form.Control
                        className="search_input"
                        placeholder="Что вас интересует?"
                        aria-label="search"
                        aria-describedby="basic-addon1"
                      />
                    </InputGroup>
                  </Col>
                  <Col
                    className="header_user_navigation"
                    xs={6}
                    md={6}
                    sm={6}
                    lg={6}
                    xl={4}
                    xxl={4}
                  >
                    <OverlayTrigger
                      placement="bottom"
                      delay={{ show: 250, hide: 400 }}
                      overlay={
                        <Tooltip id="button-tooltip">Войти</Tooltip>
                      }
                    >
                    <Link to={LOGIN_ROUTE}>
                      <MdOutlineLogin className="user_icon" size={25} />
                    </Link>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="bottom"
                      delay={{ show: 250, hide: 400 }}
                      overlay={
                        <Tooltip id="button-tooltip">Куда идти?</Tooltip>
                      }
                    >
                    <Link to={LOCATIONPLACES_ROUTE}>
                      <BsPinMap className="user_icon" size={25} />
                    </Link>
                    </OverlayTrigger>
                    <Button
                      variant="outline-dark"
                      className="off_btn"
                      onClick={handleShow}
                    >
                      <AiOutlineMenu className="off_icons" />
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Row>
          </Container>
        </header>

        <Sidebar
          show={show}
          handleClose={handleClose}
          isAdmin={user.isAdmin}
          isAuth={user.isAuth}
          basket={basket}
          likes={likes}
        />
      </>
    );
  }
});

export default Header;
