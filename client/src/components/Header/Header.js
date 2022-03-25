import React, {useContext } from 'react'
import { Context } from '../..'

//import style Bootstrap
import './Header.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BsFacebook } from 'react-icons/bs'; 
import { BsTwitter } from 'react-icons/bs'; 
import { BsGoogle } from 'react-icons/bs'; 
import { FaVk } from 'react-icons/fa'; 

import {MdMenu} from 'react-icons/md';

export default function Header() {
    const {user} = useContext(Context)

    return (  
      <div className='header h-100'>

      <div className='container h-100'>
          <div className='row align-items-center justify-content-center align-middle'>
              <div className='col'>
                  <a href='/'><img src='src/img/header/svg_default_logo.svg'/></a>
              </div>
              <div className='col text-right'>
                  <div className='col social_header_block'>
                      <a href='dsv'><BsFacebook  className='social_header' size={'30px'}/></a>
                      <a><BsTwitter className='social_header' size={'30px'}/></a>
                      <a><BsGoogle className='social_header' size={'30px'}/></a>
                      <a><FaVk className='social_header last' size={'30px'}/></a>
                      

                  <a className='right_menu' type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><MdMenu className='mdmenu'    size={'30px'}/></a>
                  </div>
                                          
              </div>
          </div>
      </div>

      <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
      <div className="offcanvas-header">
          <h5 id="offcanvasRightLabel">Be sure of yourself...</h5>
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Закрыть"></button>
      </div>
      <div className="offcanvas-body">
          <a href='/'><button className="btn btn-outline-danger mt-3" type="button">
              Главная
          </button></a>

          <div className="dropdown mt-3">
          <button className="btn btn-outline-danger dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown">
              Товары
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li><a className="dropdown-item" href="#">Мужская одежда</a></li>
              <li><a className="dropdown-item" href="#">Женская одежда</a></li>
              <li><a className="dropdown-item" href="#">Обувь</a></li>
          </ul>
          </div> 

          <button className="btn btn-outline-danger mt-3" type="button" href="/shop-news">
              Новости
          </button>

          <div className="dropdown mt-3">
          <button className="btn btn-outline-danger dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown">
              Прочее
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li><a className="dropdown-item" href="/about-us">О нас</a></li>
              <li><a className="dropdown-item" href="/contact">Контакты</a></li>
              <li><a className="dropdown-item" href="/contact-list">Основные адреса</a></li>
              <li><a className="dropdown-item" href="#">Правила</a></li>
          </ul>
          </div>

          <div className='offcanvas-bottom'>
          <a href='/auth'><button className="btn btn-outline-success fixed-bottom" type="button" href="/shop-news">
              Вход / Регистрация
          </button></a>
          </div>
          </div>
      </div>
  </div>
  )
}
