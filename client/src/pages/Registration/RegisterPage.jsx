import "./RegisterPage.scss";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { BsBootstrapFill, BsFacebook } from "react-icons/bs";
import { BsGoogle } from "react-icons/bs";
import { FaVk } from "react-icons/fa";
import { Context } from "../..";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, SHOP_ROUTE } from "../../utils/consts";
import { registration } from "../../http/userAPI";
import { Card, Col, Container, FloatingLabel, Row } from "react-bootstrap";
import { AiFillGoogleCircle } from "react-icons/ai";

function Register() {
  const { user } = useContext(Context);
  const location = useLocation();
  const history = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [date, setDate] = useState("");
  const [gender, setGender] = useState(true);
  const [phone, setPhone] = useState("");
  const [allowSpam, setAllowSpam] = useState(false);

  console.log(gender);
  const click = async () => {
    try {
      let data;
      data = await registration(
        email,
        password,
        name,
        lastName,
        date,
        phone,
        gender,
        allowSpam
      );
      user.setUser(user);
      user.setIsAuth(true);
      history(SHOP_ROUTE);
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <>
      <Container className="reg_container">
        <Row>
          <Col xs={12}>
            <Card className="reg_card">
              <Row
                className="d-flex justify-center w-100"
                style={{ "--bs-gutter-x": 0 }}
              >
                <Col
                  lg={7}
                  xl={7}
                  xxl={7}
                  className="reg_card_left d-none d-lg-flex"
                >
                  <Row className="img_row h-100 w-100">
                    <Col className="img_col h-100 w-100">
                      <p className="register_text">
                        Присоединяйся к нам, чтобы быть всегда в центре
                        внимания...
                      </p>
                    </Col>
                  </Row>
                </Col>
                <Col
                  xs={12}
                  sm={12}
                  md={12}
                  lg={5}
                  xl={5}
                  xxl={5}
                  className="reg_card_right flex-column pr-5 pl-5"
                >
                  <Row>
                    <Col>
                      <p className="title">
                        Регистрация в{" "}
                        <span className="name_shop">
                          SHOP
                          <span className="dot_shop">.</span>
                          RU
                        </span>
                      </p>
                    </Col>
                  </Row>
                  <Row className="d-flex flex-row justify-center w-100 mb-3">
                    <Col xs={12} md={12}>
                      <Button className="auth_google_btn">
                        <AiFillGoogleCircle /> Google
                      </Button>
                    </Col>
                    <Col>
                      <Button className="auth_vk_btn">
                        <BsBootstrapFill /> VKontakte
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p className="sub_text">
                        Введите все указанные данные для того, чтобы
                        зарегистрироваться на сайте :)
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <p className="title_form">Личная информация</p>
                  </Row>
                  <Row>
                    <FloatingLabel controlId="floatingInputq" label="Имя">
                      <Form.Control
                        type="text"
                        className="reg_card_input"
                        placeholder="Иван"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingInputw" label="Фамилия">
                      <Form.Control
                        type="text"
                        className="reg_card_input"
                        placeholder="Иванов"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </FloatingLabel>

                    <FloatingLabel
                      controlId="floatingInpute"
                      label="Дата рождения"
                    >
                      <Form.Control
                        type="date"
                        className="reg_card_input"
                        placeholder="02.06.1999"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingInputr" label="Пол">
                      <Form.Select
                        onChange={(e) => setGender(e.target.value)}
                        aria-label="Default select example"
                      >
                        <option value={true}>Мужской</option>
                        <option value={false}>Женский</option>
                      </Form.Select>
                    </FloatingLabel>
                  </Row>
                  <Row>
                    {" "}
                    <p className="title_form">Данные для входа в аккаунт</p>
                  </Row>
                  <Row>
                    <FloatingLabel controlId="floatingInputt" label="Почта">
                      <Form.Control
                        type="mail"
                        className="reg_card_input"
                        placeholder="example@mail.ru"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingInputy" label="Пароль">
                      <Form.Control
                        type="password"
                        className="reg_card_input"
                        placeholder="*********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </FloatingLabel>

                    <FloatingLabel
                      controlId="floatingInputu"
                      label="Номер телефона"
                    >
                      <Form.Control
                        type="tel"
                        className="reg_card_input"
                        placeholder="89999993737"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </FloatingLabel>
                  </Row>
                  <Row className="mt-3">
                    <Form.Group>
                      <Form.Check
                        inline
                        label="* Согласен с политикой конфиденциальности"
                        name="group1"
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Check
                        inline
                        label="Хочу получать рассылку на почту и телефон"
                        name="group1"
                        checked={allowSpam}
                        onChange={() => setAllowSpam(!allowSpam)}
                      />
                    </Form.Group>
                  </Row>
                  <Row className="d-flex justify-content-center mt-3">
                    <Button onClick={click} className="register_btn">
                      Зарегистрироваться
                    </Button>
                  </Row>
                  <Row className="d-flex justify-content-center mt-3">
                    <Link className="remove_login" to={LOGIN_ROUTE}>
                      Уже есть аккаунт...
                    </Link>
                  </Row>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Register;
