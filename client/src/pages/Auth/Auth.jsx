import "./Auth.scss";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { BsBootstrapFill, BsFacebook } from "react-icons/bs";
import { REGISTRATION_ROUTE, SHOP_ROUTE } from "../../utils/consts";
import { useContext, useEffect, useState } from "react";
import { Context } from "../..";
import { Link } from "react-router-dom";
import { login, social_VK_auth } from "../../http/userAPI";
import { observer } from "mobx-react-lite";
import {
  Card,
  Col,
  Container,
  FloatingLabel,
  Row,
  Toast,
} from "react-bootstrap";
import { AiFillGoogleCircle } from "react-icons/ai";

const Auth = observer(() => {
  const { user } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const VKAuthClick = () => {
    
    window.VK.Auth.login(function (data) {
      if (data.session) {
        window.VK.Api.call(
          "users.get",
          {
            user_ids: data.session.user.id,
            v: "5.131",
            fields: ["photo_100", "sex", "bdate", "email"],
          },
          function (r) {
            let response = r.response[0];
            let user_data = response;
            let gender = null;
            if (user_data.sex == 1) {
              gender = false;
            } else if (user_data.sex == 2) {
              gender = true;
            }
            try {
              let data;
              let email = user_data.id + "@vk.com";
              let password = user_data.id + "vk";
              let name = user_data.first_name;
              let family = user_data.last_name;
              let date_birthday = user_data.bdate;
              let numberPhone = user_data.id;
              let allowSpam = false;
              let id_social = user_data.id + "";
              let img_user = user_data.photo_100;
              data = social_VK_auth(
                email,
                password,
                name,
                family,
                date_birthday,
                numberPhone,
                gender,
                allowSpam,
                id_social,
                img_user
              ).then(data => {
                user.setUser(user);
                user.setIsAuth(true);
                window.location.href = SHOP_ROUTE;
              })
              
            } catch (e) {
              setErrorMessage(e.response.data.message);
              setShowToast(true);
            }
            console.log(user_data);
          }
        );
      }
    }, 4194308);
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setErrorMessage("Некоректный адрес электронной почты");
    } else {
      setErrorMessage("");
    }
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 3 || e.target.value.length > 15) {
      setErrorMessage(
        "Пароль не может быть менее 3-х и больше 15-nи символов..."
      );

      if (!e.target.value) {
        setErrorMessage("Пароль не может быть пустым...");
      }
    } else {
      setErrorMessage("");
    }
  };

  const click = async () => {
    if (errorMessage != "") {
      setShowToast(true);
    } else {
      try {
        let data;
        data = await login(email, password);
        user.setUser(user);
        user.setIsAuth(true);
        window.location.href = SHOP_ROUTE;
      } catch (e) {
        setErrorMessage(e.response.data.message);
        setShowToast(true);
      }
    }
  };

  return (
    <>
      <Container className="auth_container">
        <Row>
          <Col xs={12}>
            <Card className="auth_card">
              <Row
                className="d-flex justify-center w-100"
                style={{ "--bs-gutter-x": 0 }}
              >
                <Col
                  xs={12}
                  sm={12}
                  md={12}
                  lg={6}
                  xl={6}
                  xxl={6}
                  className="auth_card_left"
                >
                  <Row className="d-flex justify-center w-100">
                    <p className="title_auth">
                      Добро пожаловать в{" "}
                      <span className="name_shop">
                        SHOP
                        <span className="dot_shop">.</span>
                        RU
                      </span>
                    </p>
                  </Row>
                  <Row className="d-flex justify-center w-100">
                    <p className="sub_text">
                      Введите адрес электронной почты и пароль, чтобы войти в
                      свой аккаунт :)
                    </p>
                  </Row>
                  <Row className="auth_form_row">
                    <Col xs={12} className="w-100">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Электронная почта"
                      >
                        <Form.Control
                          type="email"
                          placeholder="name@example.com"
                          className="auth_card_input"
                          value={email}
                          onChange={(e) => emailHandler(e)}
                        />
                      </FloatingLabel>

                      <FloatingLabel
                        controlId="floatingPassword"
                        label="Пароль"
                      >
                        <Form.Control
                          className="auth_card_input"
                          type="password"
                          placeholder="*******"
                          value={password}
                          onChange={(e) => passwordHandler(e)}
                        />
                      </FloatingLabel>
                    </Col>
                  </Row>
                  <Row className="d-flex justify-center w-100 pt-3">
                    <Col className="d-flex justify-content-center">
                      <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="Запомнить"
                      />
                    </Col>
                    <Col className="d-flex justify-content-center">
                      <a href="http://">Забыли пароль?</a>
                    </Col>
                  </Row>
                  <Row className="d-flex flex-column justify-center w-100">
                    <Col
                      xs={12}
                      md={12}
                      className="d-flex justify-content-center pt-3"
                    >
                      <Button className="login_btn" onClick={click}>
                        Войти
                      </Button>
                    </Col>
                    <Col xs={12} md={12} className="d-lg-none d-md-flex pt-3">
                      <Button className="register_btn">
                        Зарегистрироваться
                      </Button>
                    </Col>
                  </Row>
                  <Row className="d-flex flex-column justify-center w-100">
                    <Col>
                      <hr />
                    </Col>
                  </Row>
                  <Row className="d-flex flex-column justify-center w-100">
                    <Col>
                      <p className="sub_text">
                        Или авторизуйтесь с помощью социальных сетей...
                      </p>
                    </Col>
                  </Row>
                  <Row className="d-flex flex-row justify-center w-100">
                    <Col xs={12} md={12}>
                      <Button className="auth_google_btn">
                        <AiFillGoogleCircle /> Google
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        className="auth_vk_btn"
                        onClick={() => VKAuthClick()}
                      >
                        <BsBootstrapFill /> VKontakte
                      </Button>
                    </Col>
                  </Row>
                </Col>
                <Col
                  lg={6}
                  xl={6}
                  xxl={6}
                  className="auth_card_right d-none d-lg-flex"
                >
                  <Row className="img_row h-100 w-100">
                    <Col className="img_col h-100 w-100">
                      <p className="register_text">
                        Если ты все еще не зарегистровался у нас на сайте, то
                        сделай это прямо сейчас!
                      </p>
                      <Link to={REGISTRATION_ROUTE}>
                        <Button className="register_btn">
                          Зарегистрироваться
                        </Button>
                      </Link>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>

      <Toast
        className="errorToast"
        onClose={() => setShowToast(false)}
        show={showToast}
        autohide
        delay={3000}
        bg="danger"
      >
        <Toast.Header>
          <strong className="me-auto">SHOP.RU</strong>
          <small>Ошибка авторизации!</small>
        </Toast.Header>
        <Toast.Body>{errorMessage}</Toast.Body>
      </Toast>
    </>
  );
});

export default Auth;