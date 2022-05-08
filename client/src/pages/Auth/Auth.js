import './Auth.scss';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { BsFacebook } from 'react-icons/bs'; 
import { BsGoogle } from 'react-icons/bs'; 
import { FaVk } from 'react-icons/fa'; 
import { REGISTRATION_ROUTE, SHOP_ROUTE } from '../../utils/consts';
import { useContext, useState } from 'react';
import { Context } from '../..';
import { useLocation, useNavigate } from 'react-router-dom';
import { login } from '../../http/userAPI';
import { observer } from 'mobx-react-lite';


const Auth = observer(() => {

  const {user} = useContext(Context)
  const location = useLocation()
  const history = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const click = async () => {
      try {
          let data;
          data = await login(email, password);
          user.setUser(user)
          user.setIsAuth(true)
          window.location.href = SHOP_ROUTE
      } catch (e) {
          alert(e.response.data.message)
      }

  }

    return (
      <div className="auth">

      <div className='main_register'>
        <div className='container'>
          <div className='row d-flex '>
            <div className='col-lg-6 col-md-6 col-sm-12 col-12'>
              <h2>Войти</h2>

              <div className='form_register'>

          <div className='main_auth'>
            <Form>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Почта</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="example@email.com" 
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Form.Group>

              <Form.Group>
                <Form.Label htmlFor="inputPassword5">Пароль</Form.Label>
                  <Form.Control
                    type="password"
                    id="inputPassword5"
                    aria-describedby="passwordHelpBlock"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </Form.Group>

              <Button onClick={click} className='auth_btn' variant="outline-danger">ВОЙТИ</Button>{' '}


              </Form>

              </div>

              <div className='auth_socweb text-center'>
                <h5>Авторизация через социальные сети</h5>
                <div className='row m-0 align-items-center justify-content-center align-middle'>
                  <div className='col-2 p-0'>
                    <BsFacebook size="35px"/>
                  </div>
                  <div className='col-2 p-0'>
                    <BsGoogle size="35px"/>
                  </div>
                  <div className='col-2 p-0'>
                    <FaVk size="35px" />
                  </div>
                </div>
              </div>


            </div>
            </div>

            <div className='col-lg-1 d-md-none d-lg-block'></div>

            <div className='col-lg-5 col-md-6 col-sm-12 col-12'>

              
              <h2>Создай аккаунт прямо сейчас:</h2>

              <div className='dop_reg'>
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
                Подробнее ознакомиться со всеми возможностями вы сможете после регистрации в личном кабинете пользователя.
              </p>

              <Button variant="outline-danger" href={REGISTRATION_ROUTE}>РЕГИСТРАЦИЯ</Button>{' '}

              </div>
            </div>
          </div>
        </div>
      </div>
      <br/>
      <br/>
      <br/>
      <br/><br/><br/>

</div>
    );
  })
  
  export default Auth;
  