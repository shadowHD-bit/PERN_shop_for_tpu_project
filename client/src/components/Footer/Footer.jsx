import React from 'react'
import './Footer.scss'

import { BsFacebook } from 'react-icons/bs'; 
import { BsTwitter } from 'react-icons/bs'; 
import { BsGoogle } from 'react-icons/bs'; 
import { FaVk } from 'react-icons/fa'; 
import { SocialButton } from '../UI/Buttons/SocialButton/SocialButton';

export default function Footer() {
  return (
    <div className='footer'>
        <div className="container">
          <div className="main_text_logo">
            <span>Be sure yourself...</span>
          </div>
          <div className="main_href">
            <a href="/">Главная</a>
            <a href="/product">Товары</a>
            <a href="/news">Новости</a>
            <a href="/about">О нас</a>
            <a href="/locationshops">Основные адреса</a>
            <a href="/delivery">Доставка</a>
          </div>
          <div className="social_media">
            <a href='dsv'><BsFacebook  className='social_header' size={'30px'}/></a>
            <a><BsTwitter className='social_header' size={'30px'}/></a>
            <a><BsGoogle className='social_header' size={'30px'}/></a>
            <a><FaVk className='social_header last' size={'30px'}/></a>
          </div>
          <div className="copyright">
            <span>Copyright © 2022. All rights recerved | This app is made by Alexandr Krivikov</span>
          </div>
        </div>
    </div>
  )
}
