import './RegisterPage.scss';
import Header from '../../components/Header/Header';


import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { BsFacebook } from 'react-icons/bs'; 
import { BsGoogle } from 'react-icons/bs'; 
import { FaVk } from 'react-icons/fa'; 


function Register() {
    return (
      
      <div className="register">

        <div className='main_register'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-5'>
                <h2>Регистрация</h2>

                <div className='form_register'>

                <div className='reg_socialweb text-center'>
                  <h5 className='social_reg_text'>Регистрация через социальные сети</h5>
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


               <Form>

               <div className='personal_data'>

               <h5>Персональные данные</h5>
               <Form.Group controlId="formBasicName">
                <Form.Label>Имя*</Form.Label>
                <Form.Control type="text" placeholder="Иван" />
              </Form.Group>

              <Form.Group controlId="formBasicLastName">
                <Form.Label>Фамилия*</Form.Label>
                <Form.Control type="text" placeholder="Иванов" />
              </Form.Group>

              <Form.Group>
                <Form.Label>Пол</Form.Label>
                <Form.Select aria-label="Default select example">
                  <option value="1">Мужской</option>
                  <option value="2">Женский</option>
                  <option value="3">Не указывать</option>
                </Form.Select>
              </Form.Group>

              </div>

              <div className='data_auth'>

              <h5>Данные для входа в аккаунт</h5>

               <Form.Group controlId="formBasicEmail">
                <Form.Label>Почта*</Form.Label>
                <Form.Control type="email" placeholder="example@email.com" />
                <Form.Text className="text-muted">
                  Никогда не делитесь своей почтой с мошениками...
                </Form.Text>
              </Form.Group>

                 <Form.Group>
                  <Form.Label htmlFor="inputPassword5">Пароль*</Form.Label>
                    <Form.Control
                      type="password"
                      id="inputPassword5"
                      aria-describedby="passwordHelpBlock"
                      
                    />
                    <Form.Text id="passwordHelpBlock" muted>
                      Пароль должен содержать 8-20 символов, букв и цифр, и не содержать пробелы, специальные знаки, или emoji.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group>
                  <Form.Label htmlFor="inputPassword5">Повторите пароль*</Form.Label>
                    <Form.Control
                      type="password"
                      id="inputPassword5"
                      aria-describedby="passwordHelpBlock"
                    />
                  </Form.Group>

                  <Form.Group>
                  <Form.Label>Номер телефона*</Form.Label>
                  <div className='row classic'>
                    <div className='col-2 p-0'>
                      <Form.Select aria-label="Default select example">
                        <option value="1">+7</option>
                        <option value="2">+375</option>
                        <option value="3">+996</option>
                    </Form.Select>
                    </div>

                    <div className='col-9'>
                    <Form.Control type="tel" placeholder="" />
                    </div>
                  </div>
                  
                </Form.Group>

                </div>

              
                  <Form.Group>
                  <Form.Check
                    inline
                    label="*Согласен с политикой конфиденциальности"
                    name="group1"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Check
                    inline
                    label="  Хочу получать рассылку на почту и телефон"
                    name="group1"
                  />
                </Form.Group>
                <Button variant="outline-danger">ЗАРЕГИСТРИРОВАТЬСЯ</Button>{' '}
                </Form>
               </div>
              </div>

              <div className='col-md-1'></div>

              <div className='col-md-6'>
                <h2>Создай аккаунт прямо сейчас:</h2>

                <div className='info_text_right'>
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
                </div>

              </div>
            </div>
          </div>
        </div>  
      </div>
    );
  }
  
  export default Register;
  