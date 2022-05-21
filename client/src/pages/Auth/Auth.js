import "./Auth.scss";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { BsFacebook } from "react-icons/bs";
import { BsGoogle } from "react-icons/bs";
import { FaVk } from "react-icons/fa";
import { REGISTRATION_ROUTE, SHOP_ROUTE } from "../../utils/consts";
import { useContext, useEffect, useState } from "react";
import { Context } from "../..";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../../http/userAPI";
import { observer } from "mobx-react-lite";
import { Toast, ToastContainer } from "react-bootstrap";

const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  //Show message state
  const [show, setShow] = useState(false);

  //Checked pass and email
  const [dirtyMail, setDirtyMail] = useState(false)
  const [dirtyPass, setDirtyPass] = useState(false)

  //Error message
  const [errorMessageMail, setErrorMessageMail] = useState('Email не может быть пустым...')
  const [errorMessagePassword, setErrorMessagePassword] = useState('Пароль не может быть пустым...')

  const [formValid, setFormValid] = useState(false)

  const blurHandle = (e) => {
    switch (e.target.name){
      case 'email':
        setDirtyMail(true)
        break
      case 'pass':
        setDirtyPass(true)
        break
    }
  }

  const emailHandler = (e) => {
    setEmail(e.target.value)
    const re =/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(!re.test(String(e.target.value).toLowerCase())){
      setErrorMessageMail('Некоректный адрес электронной почты')
    }
    else{
      setErrorMessageMail('')
    }
  }

  useEffect(() => {
    if(errorMessageMail || errorMessagePassword){
      setFormValid(false)
    }else{
      setFormValid(true)
    }
  }, [errorMessageMail, errorMessagePassword])



  const passwordHandler = (e) => {
    setPassword(e.target.value)
    if(e.target.value.length < 3 || e.target.value.length > 15){
      setErrorMessagePassword('Пароль не может быть менее 3-х и больше 15-nи символов...')
      if(!e.target.value){
        setErrorMessagePassword('Пароль не может быть пустым...')
      }
    }
    else{
      setErrorMessagePassword('')
    }
  }






  const click = async () => {
    try {
      let data;
      data = await login(email, password);
      user.setUser(user);
      user.setIsAuth(true);
      window.location.href = SHOP_ROUTE;
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <div className="auth">
      <div className="main_register">
        <div className="container">
          <div className="row d-flex ">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <h2>Войти</h2>

              <div className="form_register">
                <div className="main_auth">
                  <Form>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Почта</Form.Label>
                      <Form.Control
                        type="email"
                        name='email'
                        placeholder="example@email.com"
                        value={email}
                        onChange={e => emailHandler(e)}
                        onBlur={e => blurHandle(e)}
                      />
                    </Form.Group>
                    {(dirtyMail && errorMessageMail) && <div style={{color: 'red'}}>{errorMessageMail}</div>}
                    <Form.Group>
                      <Form.Label htmlFor="inputPassword5">Пароль</Form.Label>
                      <Form.Control
                        type="password"
                        name='pass'
                        id="inputPassword5"
                        aria-describedby="passwordHelpBlock"
                        value={password}
                        onChange={e => passwordHandler(e)}
                        onBlur={e => blurHandle(e)}
                      />
                    </Form.Group>
                    {(dirtyPass && errorMessagePassword) && <div style={{color: 'red'}}>{errorMessagePassword}</div>}
                    <Button
                      onClick={click}
                      className="auth_btn"
                      variant="outline-danger"
                      disabled={(!formValid)? true : false }
                    >
                      ВОЙТИ
                    </Button>{" "}
                  </Form>
                </div>

                <div className="auth_socweb text-center">
                  <h5>Авторизация через социальные сети</h5>
                  <div className="row m-0 align-items-center justify-content-center align-middle">
                    <div className="col-2 p-0">
                      <BsFacebook size="35px" />
                    </div>
                    <div className="col-2 p-0">
                      <BsGoogle size="35px" />
                    </div>
                    <div className="col-2 p-0">
                      <FaVk size="35px" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-1 d-md-none d-lg-block"></div>

            <div className="col-lg-5 col-md-6 col-sm-12 col-12">
              <h2>Создай аккаунт прямо сейчас:</h2>

              <div className="dop_reg">
                <p>Зарегистрируйся на сайте SHOP.RU сейчас, для того чтобы:</p>
                <p>
                  <ul>
                    <li>Начать совершать покупки</li>
                    <li>Отслеживать статус доставки</li>
                    <li>Получать выгодные предложения об акциях</li>
                    <li>Получить собственный список рекомендованных товаров</li>
                    <li>Просто быть стильным и модным...</li>
                  </ul>
                </p>
                <p>
                  Подробнее ознакомиться со всеми возможностями вы сможете после
                  регистрации в личном кабинете пользователя.
                </p>
                <Button variant="outline-danger" href={REGISTRATION_ROUTE}>
                  РЕГИСТРАЦИЯ
                </Button>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <ToastContainer position="bottom-end">
        <Toast className="d-inline-block m-1" bg={"danger"} onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
});

export default Auth;
