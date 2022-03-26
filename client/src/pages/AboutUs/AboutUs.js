import './AboutUs.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import AnimatedNumber from "animated-number-react";

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import {GiCoffeeCup} from 'react-icons/gi'
import {IoIosPeople} from 'react-icons/io';
import {AiOutlineLike} from 'react-icons/ai';
import {FaAward} from 'react-icons/fa';

import {MdDoubleArrow} from "react-icons/md"

import {FaReact} from 'react-icons/fa';
import {BsBootstrap, BsGithub} from 'react-icons/bs';
import {FaSass} from 'react-icons/fa';




function about_us() {

    return (
      <div className="about_us">

          <div className='first_null_section'>

          </div>

          <div className='main_about'>
              <div className='container d-flex h-100'>
                  <div className='row d-flex align-items-center justify-content-center align-middle'>
                      <div className='col-6'>
                        <img className='imgLogo' src='img/header/dark_logo.png' />
                      </div>

                      <div className='col-6'>
                        <p>Интернет-магазин SHOP – это доступные цены, широкий, регулярно обновляемый ассортимент. В онлайн-каталоге SHOP представлено около 1500 ведущих брендов женской, мужской одежды и обуви...</p>
                        <p>Интернет-магазин SHOP – это доступные цены, широкий, регулярно обновляемый ассортимент. В онлайн-каталоге SHOP представлено около 1500 ведущих брендов женской, мужской одежды и обуви...</p>
                        <p>*Сделано в качестве творческого проекта для ТПУ.</p>
                      </div>
                  </div>
              </div>

          </div>

          <div id='count_data' className='count_data'>
          <div class="about-counter-area d-flex h-100">
		<div class="container h-100 d-flex align-items-center justify-content-center align-middle">
			<div class="row align-items-center justify-content-center align-middle">
				<div class="col-md-3 text-center">
        <IoIosPeople className='icon_count' size={'60px'}/>

					<div class="single-counter">
                        <AnimatedNumber className='countNumberA'
                        value={1444}
                        formatValue={v=>v.toFixed(0)}
                        duration={7000}
                        />			
                        <p className='countNumber'>Довольных клиента</p>
					</div>
				</div>

				<div class="col-md-3 text-center">
        <FaAward className='icon_count' size={'60px'}/>


					<div class="single-counter">
                        <AnimatedNumber className='countNumberA'
                        value={5}
                        formatValue={v=>v.toFixed(0)}
                        duration={3000}
                        />							
                        <p className='countNumber'>Наград</p>
					</div>
				</div>

				<div class="col-md-3 col-sm-3 text-center">
        <AiOutlineLike className='icon_count' size={'60px'}/>

					<div class="single-counter">
						<AnimatedNumber className='countNumberA'
                        value={11}
                        formatValue={v=>v.toFixed(0)}
                        duration={2000}
                        />	
						<p className='countNumber'>Выполненных проекта</p>
					</div>
				</div>

				<div class="col-md-3 col-sm-3 text-center">
        <GiCoffeeCup className='icon_count' size={'60px'}/>

					<div class="single-counter">
                        <AnimatedNumber className='countNumberA'
                        value={5689}
                        formatValue={v=>v.toFixed(0)}
                        duration={5500}
                        />							
                        <p className='countNumber'>Кружек чая</p>
					</div>
				</div>
			</div>
		</div>
	</div>
              
          </div>

          <div className='info_data'>

            <div className='container  d-flex h-100'>
              <div className='row align-items-center justify-content-center align-middle'>
                <div className='col-md-2'>
                <Card style={{ width: '100%'}}>
                <Card.Body className='text'>
                  <Card.Title>Тема проекта</Card.Title>
                  <Card.Text>
                  Разработка веб-сайта «Интернет-магазин» популярной одежды с применением JS-фреймворков
                  </Card.Text>
                </Card.Body>
              </Card>
                </div>

                <div className='col-md-1  m-0 p-0'>
                  <MdDoubleArrow size={'40px'}/>
                </div>

                <div className='col-md-2'>
                <Card style={{ width: '100%' }}>
                <Card.Body className='text'>
                  <Card.Title>Цель</Card.Title>
                  <Card.Text>
                  Создание удобной WEB - системы, которая предоставит пользователю полную информацию об интересующей продукции, даcт возможность пользователям заказать любую продукцию, не выходя из дома.
                  </Card.Text>
                </Card.Body>
              </Card>
                </div>
                <div className='col-md-1 m-0 p-0'>
                  <MdDoubleArrow size={'40px'}/>
                </div>
                <div className='col-md-3'>
                <Card style={{ width: '100%' }}>
                <Card.Body className='text'>
                  <Card.Title>Дизайн</Card.Title>
                  <Card.Text>
                  Веб-дизайн сайта был выполнен студентом Томского Политезнического Университета - Кривиковым Александром. За основу и стиль дизайна был выбран дизайн современного сайтостроенния, имеющий некоторые заимствованные модели популярных брендовых магазинов.
                  </Card.Text>
                </Card.Body>
              </Card>
                </div>
                <div className='col-md-1  m-0 p-0'>
                  <MdDoubleArrow size={'40px'}/>
                </div>
                <div className='col-md-2'>
                <Card style={{ width: '100%' }}>
                <Card.Body className='text'>
                  <Card.Title>А также</Card.Title>
                  <Card.Text>
                  Если у вас есть какие-либо предложения или притензии к нашему магазину, вы можете заполнить онлайн-форму, в разделе "Контакты", или напрямую связаться с главным администратором, написав на почту adk26@tpu.ru...
                  </Card.Text>
                </Card.Body>
              </Card>
                </div>
              </div>
            </div>
              
          </div>

          <div className='tools_data'>
          <div className='container  d-flex h-100'>
              <div className='row align-items-center justify-content-center align-middle'>
                <div className='col-md-3 text-center'>
                <Card style={{ width: '100%'}}>
                <Card.Body className='text'>
                  <FaReact className='react-icon' size={'40px'}/>
                  <Card.Title>React</Card.Title>
                  <Card.Text>
                  При разработке использовался фреймворк React (JavaScript-библиотека с открытым исходным кодом для разработки пользовательских интерфейсов).
                  </Card.Text>
                </Card.Body>
              </Card>
                </div>
                <div className='col-md-3 text-center'>
                <Card style={{ width: '100%' }}>
                <Card.Body className='text'>
                  <BsBootstrap className='boot-icon' size={'40px'}/>
                  <Card.Title>Bootstrap</Card.Title>
                  <Card.Text>
                  Также, активно использовался свободный набор инструментов для создания сайтов и веб-приложений Bootstrap, который включает в себя HTML- и CSS-шаблоны оформления для типографики, веб-форм, кнопок, меток, блоков навигации и прочих компонентов веб-интерфейса, включая JavaScript-расширения.
                  </Card.Text>
                </Card.Body>
              </Card>
                </div>
                <div className='col-md-3 text-center'>
                <Card style={{ width: '100%' }}>
                <Card.Body className='text'>
                  <BsGithub  className='git-icon' size={'40px'}/>
                  <Card.Title>GitHub</Card.Title>
                  <Card.Text>
                  Для демонстрации работы и контроля версий магазина, использовалась система контроля версий GitHub...
                  </Card.Text>
                </Card.Body>
              </Card>
                </div>
                <div className='col-md-3 text-center'>
                <Card style={{ width: '100%' }}>
                <Card.Body className='text'>
                  <FaSass className='sass-icon' size={'40px'}/>
                  <Card.Title>SASS</Card.Title>
                  <Card.Text>
                  Для более удобной работы со стилями использовался предпроцессор Sass (метаязык на основе CSS, предназначенный для увеличения уровня абстракции CSS-кода и упрощения файлов каскадных таблиц стилей).
                  </Card.Text>
                </Card.Body>
              </Card>
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  }
  
  export default about_us;
  