import React, { useState, useContext } from "react";
import { observer } from "mobx-react-lite";

//import style Bootstrap
import "./Header.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import { Offcanvas, Dropdown, Button } from "react-bootstrap";
import { BsFacebook } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";
import { BsGoogle } from "react-icons/bs";
import { FaVk } from "react-icons/fa";

import { MdMenu } from "react-icons/md";
import { Context } from "../..";
import {
  ABOUT_ROUTE,
  ADMIN_ROUTE,
  LOCATIONPLACES_ROUTE,
  LOGIN_ROUTE,
  PRODUCT_ROUTE,
  RULES_ROUTE,
  SHOP_ROUTE,
} from "../../utils/consts";
import { useNavigate } from "react-router-dom";

const Header = observer(() => {
  const navigate = useNavigate();
  const { user } = useContext(Context);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function logOut() {
    localStorage.clear();
    window.location.href = "/";
  }

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
                    <Dropdown.Item className="dropdown-item" href="#/action-1">
                      Мужская одежда
                    </Dropdown.Item>
                    <Dropdown.Item className="dropdown-item" href="#/action-2">
                      Женская одежда
                    </Dropdown.Item>
                    <Dropdown.Item className="dropdown-item" href="#/action-3">
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
                    <Dropdown.Item className="dropdown-item" href={ABOUT_ROUTE}>
                      О нас
                    </Dropdown.Item>
                    <Dropdown.Item className="dropdown-item" href="#/action-2">
                      Контакты
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="dropdown-item"
                      href={LOCATIONPLACES_ROUTE}
                    >
                      Основные адреса
                    </Dropdown.Item>
                    <Dropdown.Item className="dropdown-item" href={RULES_ROUTE}>
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
                  >
                    Корзина
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
});

export default Header;
