import React, {useState, useContext } from 'react'
import {observer} from "mobx-react-lite";


//import style Bootstrap
import './Header.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Offcanvas, Dropdown, Button} from 'react-bootstrap'
import { BsFacebook } from 'react-icons/bs'; 
import { BsTwitter } from 'react-icons/bs'; 
import { BsGoogle } from 'react-icons/bs'; 
import { FaVk } from 'react-icons/fa'; 

import {MdMenu} from 'react-icons/md';
import { Context } from '../..';
import { LOCATIONPLACES_ROUTE } from '../../utils/consts';

const Header = observer(() => {

    const {user} = useContext(Context)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (  
      <div className='header h-100'>

      <div className='container h-100'>
          <div className='row align-items-center justify-content-center align-middle'>
              <div className='col'>
                  <a href='/'><img src="../../img/header/default_logo.png"/></a>
              </div>
              <div className='col text-right'>
                  <div className='col social_header_block'>
                      <a href='dsv'><BsFacebook  className='social_header' size={'30px'}/></a>
                      <a><BsTwitter className='social_header' size={'30px'}/></a>
                      <a><BsGoogle className='social_header' size={'30px'}/></a>
                      <a><FaVk className='social_header last' size={'30px'}/></a>
                      

                  <a className='right_menu' type="button" onClick={handleShow} ><MdMenu className='mdmenu'size={'30px'}/></a>
                  
                  </div>

                  <Offcanvas className='Offs' placement='end' show={show} onHide={handleClose}>
                  <Offcanvas.Header>     
                   <h5 id="offcanvasRightLabel">Be sure of yourself...</h5>
                   </Offcanvas.Header> 


                  <Offcanvas.Body>

                      
                    <Button variant='none' className="btn btn-outline-danger mt-3" type="button" href="/shop-news">
                          Главная
                      </Button>

                      <Dropdown className="dropdown mt-3">
                      <Dropdown.Toggle variant='none' className="btn btn-outline-danger dropdown-toggle">
                        Товары
                      </Dropdown.Toggle>
                      
                      <Dropdown.Menu className="dropdown-menu">
                        <Dropdown.Item className="dropdown-item" href="#/action-1">Мужская одежда</Dropdown.Item>
                        <Dropdown.Item className="dropdown-item" href="#/action-2">Женская одежда</Dropdown.Item>
                        <Dropdown.Item className="dropdown-item" href="#/action-3">Обувь</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>

                      <Button variant='none' className="btn btn-outline-danger mt-3" type="button" href="/shop-news">
                          Новости
                      </Button>

                      <Dropdown className="dropdown mt-3">
                      <Dropdown.Toggle variant='none' className="btn btn-outline-danger dropdown-toggle">
                        Прочее
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="dropdown-menu">
                        <Dropdown.Item className="dropdown-item" href="#/action-1">О нас</Dropdown.Item>
                        <Dropdown.Item className="dropdown-item" href="#/action-2">Контакты</Dropdown.Item>
                        <Dropdown.Item className="dropdown-item" href={LOCATIONPLACES_ROUTE}>Основные адреса</Dropdown.Item>
                        <Dropdown.Item className="dropdown-item" href="#/action-3">Правила</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>

                    {user.isAuth ?
                    
                    <Button variant='none' id='exit' className="btn btn-outline-danger exit mt-3" type="button" href="/shop-news">
                      Выйти
                    </Button>
                    :
                    <Button variant='none' className="btn btn-outline-success mt-3" type="button" onClick={() => user.setIsAuth(true)}>
                          Вход / Регистрация
                    </Button>
                    }

                      </Offcanvas.Body>
                    </Offcanvas>    

              </div>
          </div>
      </div>

  </div>
  
  )

})

export default Header
