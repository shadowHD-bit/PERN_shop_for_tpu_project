import React, {useState, useContext } from 'react'
import { Context } from '../..'

//import style Bootstrap
import './Header.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Offcanvas, Dropdown} from 'react-bootstrap'
import { BsFacebook } from 'react-icons/bs'; 
import { BsTwitter } from 'react-icons/bs'; 
import { BsGoogle } from 'react-icons/bs'; 
import { FaVk } from 'react-icons/fa'; 

import {MdMenu} from 'react-icons/md';

export default function Header() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {user} = useContext(Context)

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
                    <div className="offcanvas-header">
                      <h5 id="offcanvasRightLabel">Be sure of yourself...</h5>
                  </div>
                  <div className="offcanvas-body">
                      <a href='/'><button className="btn btn-outline-danger mt-3" type="button">
                          Главная
                      </button></a>

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

                      <button className="btn btn-outline-danger mt-3" type="button" href="/shop-news">
                          Новости
                      </button>

                      <Dropdown className="dropdown mt-3">
                      <Dropdown.Toggle variant='none' className="btn btn-outline-danger dropdown-toggle">
                        Прочее
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="dropdown-menu">
                        <Dropdown.Item className="dropdown-item" href="#/action-1">О нас</Dropdown.Item>
                        <Dropdown.Item className="dropdown-item" href="#/action-2">Контакты</Dropdown.Item>
                        <Dropdown.Item className="dropdown-item" href="#/action-3">Основные адреса</Dropdown.Item>
                        <Dropdown.Item className="dropdown-item" href="#/action-3">Правила</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>

                      <div className='offcanvas-bottom'>
                      <a href='/auth'><button className="btn btn-outline-success fixed-bottom" type="button" href="/shop-news">
                          Вход / Регистрация
                      </button></a>
                      </div>
                    </div>
                  </Offcanvas>    

              </div>
          </div>
      </div>

  </div>
  
  )
}
