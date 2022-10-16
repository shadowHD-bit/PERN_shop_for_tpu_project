import React, { useState, useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";

//import style Bootstrap
import "./Header.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import { Offcanvas, Dropdown, Button, Badge } from "react-bootstrap";
import { BsFacebook } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";
import { BsGoogle } from "react-icons/bs";
import { FaVk } from "react-icons/fa";

import { MdMenu } from "react-icons/md";
import { Context } from "../..";
import {
  ABOUT_ROUTE,
  ADMIN_ROUTE,
  BASKET_ROUTE,
  LOCATIONPLACES_ROUTE,
  LOGIN_ROUTE,
  ORDERS_ROUTE,
  PRODUCT_ROUTE,
  RULES_ROUTE,
  SHOP_ROUTE,
  USERPROFILE_ROUTE,
} from "../../utils/consts";
import { useNavigate } from "react-router-dom";
import { getData } from "../../http/userAPI";
import { CgProfile } from "react-icons/cg";
import { BsCart } from "react-icons/bs";

const Header = observer(() => {
  const navigate = useNavigate();
  const { user, basket } = useContext(Context);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function logOut() {
    localStorage.clear();
    window.location.href = SHOP_ROUTE;
  }

  const [load, setload] = useState(false);
  useEffect(() => {
    getData(user.user.id).then((data) => {
      user.setUserProf(data);
    });
  }, [load]);

  if (user.isAuth) {
    return (
      <div className="header h-100">
        <div
          className="header_top"
          style={{
            width: "100%",
            height: "30px",
            borderBottom: "1px solid rgb(132 83 82)",
            color: "white",
            fontWeight: "100",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="container d-flex flex-row justify-content-between">
            <div className="info__header">
              Здравствуйте, <a href={USERPROFILE_ROUTE}>{user.userProf.name}</a>
            </div>
            <div className="icons__header_top">
              <a href="#">
                <BsFacebook className="social_header" size={"20px"} />
              </a>
              <a href="#">
                <BsTwitter className="social_header" size={"20px"} />
              </a>
              <a href="#">
                <BsGoogle className="social_header" size={"20px"} />
              </a>
              <a href="#">
                <FaVk className="social_header last" size={"20px"} />
              </a>
            </div>
          </div>
        </div>
        <div className="container h-100">
          <div className="row align-items-center justify-content-center align-middle">
            <div className="col">
              <a href="/">
                <img src="../../img/header/default_logo.png" />
              </a>
            </div>
            <div className="col text-right">
              <div className="col main_header_block">
                <div className="link_block">
                  <a href={USERPROFILE_ROUTE}>
                    <CgProfile size={"30px"} />
                    <span>Профиль</span>
                  </a>
                </div>
                <div className="link_block">
                  <a href={BASKET_ROUTE}>
                    <BsCart size={"30px"} /> <span>{basket.Price} РУБ</span>
                  </a>
                </div>
                <div className="link_block">
                  <a href={ORDERS_ROUTE}>
                    <span>Заказы</span>
                  </a>
                </div>
                <div className="link_block">
                  <a
                    className="right_menu"
                    style={{ border: "none" }}
                    type="button"
                    onClick={handleShow}
                  >
                    <MdMenu className="mdmenu" size={"30px"} />
                  </a>
                </div>
              </div>
              <Offcanvas
                className="Offs"
                placement="end"
                show={show}
                onHide={handleClose}
              >
                <Offcanvas.Header>
                  <h5 id="offcanvasRightLabel">Be sure of yourself...</h5>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Button
                    variant="none"
                    className="btn btn-outline-danger mt-3"
                    type="button"
                    href="/shop-news"
                  >
                    Главная
                  </Button>
                  <Dropdown className="dropdown mt-3">
                    <Dropdown.Toggle
                      variant="none"
                      className="btn btn-outline-danger dropdown-toggle"
                    >
                      Товары
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu">
                      <Dropdown.Item
                        className="dropdown-item"
                        href={PRODUCT_ROUTE}
                      >
                        Все товары
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="dropdown-item"
                        href="#/action-1"
                      >
                        Мужская одежда
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="dropdown-item"
                        href="#/action-2"
                      >
                        Женская одежда
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="dropdown-item"
                        href="#/action-3"
                      >
                        Обувь
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Button
                    variant="none"
                    className="btn btn-outline-danger mt-3"
                    type="button"
                    href="/shop-news"
                  >
                    Новости
                  </Button>
                  <Dropdown className="dropdown mt-3">
                    <Dropdown.Toggle
                      variant="none"
                      className="btn btn-outline-danger dropdown-toggle"
                    >
                      Прочее
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu">
                      <Dropdown.Item
                        className="dropdown-item"
                        href={ABOUT_ROUTE}
                      >
                        О нас
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="dropdown-item"
                        href="#/action-2"
                      >
                        Контакты
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="dropdown-item"
                        href={LOCATIONPLACES_ROUTE}
                      >
                        Основные адреса
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="dropdown-item"
                        href={RULES_ROUTE}
                      >
                        Правила
                      </Dropdown.Item>
                      {user.isAuth && user.isAdmin == true ? (
                        <Dropdown.Item
                          className="dropdown-item"
                          onClick={() => navigate(ADMIN_ROUTE)}
                        >
                          Админка
                        </Dropdown.Item>
                      ) : (
                        <div></div>
                      )}
                    </Dropdown.Menu>
                  </Dropdown>

                  {user.isAuth ? (
                    <Button
                      variant="none"
                      className="btn btn-outline-success mt-3"
                      type="button"
                      href="/myprofile"
                    >
                      Личный кабинет
                    </Button>
                  ) : (
                    <div></div>
                  )}

                  {user.isAuth ? (
                    <Button
                      variant="none"
                      className="btn btn-outline-success mt-3"
                      type="button"
                      href={BASKET_ROUTE}
                    >
                      Корзина{" "}
                      <Badge pill bg="success">
                        {basket.Price} РУБ
                      </Badge>{" "}
                    </Button>
                  ) : (
                    <div></div>
                  )}

                  <hr></hr>

                  {user.isAuth ? (
                    <Button
                      variant="none"
                      id="exit"
                      className="btn btn-outline-danger exit mt-3"
                      type="button"
                      onClick={() => logOut()}
                    >
                      Выйти
                    </Button>
                  ) : (
                    <Button
                      variant="none"
                      className="btn btn-outline-success mt-3"
                      type="button"
                      onClick={() => navigate(LOGIN_ROUTE)}
                    >
                      Вход / Регистрация
                    </Button>
                  )}
                </Offcanvas.Body>
              </Offcanvas>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="header h-100">
        <div className="container h-100">
          <div className="row align-items-center justify-content-center align-middle">
            <div className="col">
              <a href="/">
                <img src="../../img/header/default_logo.png" />
              </a>
            </div>
            <div className="col text-right">
              <div className="col social_header_block">
                <a href="dsv">
                  <BsFacebook className="social_header" size={"30px"} />
                </a>
                <a>
                  <BsTwitter className="social_header" size={"30px"} />
                </a>
                <a>
                  <BsGoogle className="social_header" size={"30px"} />
                </a>
                <a>
                  <FaVk className="social_header last" size={"30px"} />
                </a>
                <a className="right_menu" type="button" onClick={handleShow}>
                  <MdMenu className="mdmenu" size={"30px"} />
                </a>
              </div>
              <Offcanvas
                className="Offs"
                placement="end"
                show={show}
                onHide={handleClose}
              >
                <Offcanvas.Header>
                  <h5 id="offcanvasRightLabel">Be sure of yourself...</h5>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Button
                    variant="none"
                    className="btn btn-outline-danger mt-3"
                    type="button"
                    href="/shop-news"
                  >
                    Главная
                  </Button>
                  <Dropdown className="dropdown mt-3">
                    <Dropdown.Toggle
                      variant="none"
                      className="btn btn-outline-danger dropdown-toggle"
                    >
                      Товары
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu">
                      <Dropdown.Item
                        className="dropdown-item"
                        href={PRODUCT_ROUTE}
                      >
                        Все товары
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="dropdown-item"
                        href="#/action-1"
                      >
                        Мужская одежда
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="dropdown-item"
                        href="#/action-2"
                      >
                        Женская одежда
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="dropdown-item"
                        href="#/action-3"
                      >
                        Обувь
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Button
                    variant="none"
                    className="btn btn-outline-danger mt-3"
                    type="button"
                    href="/shop-news"
                  >
                    Новости
                  </Button>
                  <Dropdown className="dropdown mt-3">
                    <Dropdown.Toggle
                      variant="none"
                      className="btn btn-outline-danger dropdown-toggle"
                    >
                      Прочее
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu">
                      <Dropdown.Item
                        className="dropdown-item"
                        href={ABOUT_ROUTE}
                      >
                        О нас
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="dropdown-item"
                        href="#/action-2"
                      >
                        Контакты
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="dropdown-item"
                        href={LOCATIONPLACES_ROUTE}
                      >
                        Основные адреса
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="dropdown-item"
                        href={RULES_ROUTE}
                      >
                        Правила
                      </Dropdown.Item>
                      {user.isAuth && user.isAdmin == true ? (
                        <Dropdown.Item
                          className="dropdown-item"
                          onClick={() => navigate(ADMIN_ROUTE)}
                        >
                          Админка
                        </Dropdown.Item>
                      ) : (
                        <div></div>
                      )}
                    </Dropdown.Menu>
                  </Dropdown>

                  {user.isAuth ? (
                    <Button
                      variant="none"
                      className="btn btn-outline-success mt-3"
                      type="button"
                      href="/myprofile"
                    >
                      Личный кабинет
                    </Button>
                  ) : (
                    <div></div>
                  )}

                  {user.isAuth ? (
                    <Button
                      variant="none"
                      className="btn btn-outline-success mt-3"
                      type="button"
                      href={BASKET_ROUTE}
                    >
                      Корзина{" "}
                      <Badge pill bg="success">
                        {basket.Price} РУБ
                      </Badge>{" "}
                    </Button>
                  ) : (
                    <div></div>
                  )}

                  <hr></hr>

                  {user.isAuth ? (
                    <Button
                      variant="none"
                      id="exit"
                      className="btn btn-outline-danger exit mt-3"
                      type="button"
                      onClick={() => logOut()}
                    >
                      Выйти
                    </Button>
                  ) : (
                    <Button
                      variant="none"
                      className="btn btn-outline-success mt-3"
                      type="button"
                      onClick={() => navigate(LOGIN_ROUTE)}
                    >
                      Вход / Регистрация
                    </Button>
                  )}
                </Offcanvas.Body>
              </Offcanvas>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default Header;
