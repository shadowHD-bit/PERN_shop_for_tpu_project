import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";


import {Button, Col, Container, Image, Row} from "react-bootstrap";
import OneItemInBasket from "./OneItemBasket";
import { Context } from '../..';
import './BasketCard.scss'
import { CHECKOUTING_ROUTE, SHOP_ROUTE } from '../../utils/consts';

const BasketCard = observer(() => {
    const {basket} = useContext(Context);
    const {product} = useContext(Context)

    console.log(basket.Basket);

    if(basket.Basket.length == 0) {
        return (
            <div className="d-flex flex-column align-items-center mt-5">
                <Image src={process.env.PUBLIC_URL + '/img/basket/basketEmpty.png'} width="200"/>
                <div className="text-center mt-5" style={{fontSize: 28, marginBottom: 100}}><b>Ваша корзина покупок сейчас пустая...</b></div>
            </div>
        )
    }

    return (
        // <>
        //     <br/>
        //     <Container>
        //     <Row className="mt-3 ml-3 w-100">
        //         <Col xs={12}>
        //             {basket.Basket.map(product => <OneItemInBasket key={product.id} product={product}/>)}
        //         </Col>
        //     </Row>
        //     </Container>
        // </>

        <>
        <div class="entry-header-area">
		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<div class="entry-header">
						<h1 class="entry-title mt-3 mb-3">Корзина покупок</h1>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="cart-main-area">
		<div class="container">
			<div class="row">
				<div class="col-md-12 col-sm-12 col-xs-12">
					<form action="#">				
						<div class="table-content table-responsive">
							<table>
								<thead>
									<tr>
										<th class="product-thumbnail">Изображение</th>
										<th class="product-name">Наименование</th>
										<th class="product-price">Цена</th>
										<th class="product-quantity">Количество</th>
										<th class="product-subtotal">Итоговая стоимость</th>
										<th class="product-remove">Удалить</th>
									</tr>
								</thead>
								<tbody>
                                {basket.Basket.map(product => 
                                    <OneItemInBasket key={product.id} product={product}/>
                                )}
								</tbody>
							</table>
						</div>
						<div class="row">
							<div class="col-md-8 col-sm-7 col-xs-12">
								<div class="buttons-cart">
									<a href={SHOP_ROUTE}>Вернуться на страницу магазина</a>
								</div>
								<div class="coupon">
									<h3>КУПОН</h3>
									<p>Если у вас есть купон, можете указать его и получить скидку.</p>
									<input type="text" placeholder="Введите купон" />
									<input type="submit" value="Применить купон" />
								</div>
							</div>
							<div class="col-md-4 col-sm-5 col-xs-12">
								<div class="cart_totals">
									<h2>Итоговая стоимость</h2>
									<table>
										<tbody>
											<tr class="cart-subtotal">
												<th>Покупки:</th>
												<td><span class="amount">{basket.Price} РУБЛЕЙ</span></td>
											</tr>
											<tr class="shipping">
												<th>Доставка:</th>
												<td>
													<ul id="shipping_method">
														<li>
															<input type="radio" /> 
															<label>
																Платная доставка: <span class="amount">600 РУБЛЕЙ</span>
															</label>
														</li>
														<li>
															<input type="radio" /> 
															<label>
																Бесплатная доставка
															</label>
														</li>
														<li></li>
													</ul>
													<p><a class="shipping-calculator-button" href="#">Расчет стоимости</a></p>
												</td>
											</tr>
											<tr class="order-total">
												<th>Итог:</th>
												<td>
													<strong><span class="amount">{basket.Price} РУБЛЕЙ</span></strong>
												</td>
											</tr>											
										</tbody>
									</table>
									<div class="wc-proceed-to-checkout">
										<a onClick={() => window.location.href = CHECKOUTING_ROUTE}>Купить</a>
									</div>
								</div>
							</div>
						</div>
					</form>	
				</div>
			</div>
		</div>
	</div>
    </>
    );
});

export default BasketCard;