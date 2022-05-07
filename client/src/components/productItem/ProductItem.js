import React, { useContext, useEffect, useState } from 'react';
import {Card, Col, Button} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import {useNavigate} from "react-router-dom"
import { BASKET_ROUTE, PRODUCT_ROUTE } from '../../utils/consts';
import { BsCartPlus } from "react-icons/bs";
import { BsCheckLg } from "react-icons/bs";
import './productItem.scss'
import { Context } from '../..';
import { addProductToBasket, fetchOneProduct } from '../../http/productAPI';
import { observer } from 'mobx-react-lite';

const ProductItem = observer(({product}) => {
    const {user, basket} = useContext(Context);

    const isProductInBasket = (prod) => {
        const findProduct = basket.Basket.findIndex(item => Number(item.id) === Number(prod.id));
        return findProduct < 0;
    }

    const addProductInBasket = (product) => {
        if(user.isAuth) {
            addProductToBasket(product).then(() => basket.setBasket(product, true))
        } else {
            basket.setBasket(product);
        }
    }
    const [productIn, setProductIn] = useState({info: []})
    const history = useNavigate()

    useEffect(() => {
        fetchOneProduct(product.id).then(data => setProductIn(data))
    }, [])

    return (
        <div class="product-card">
		<div class="product-tumb">
			<img src={process.env.REACT_APP_API_URL + product.imgMain} alt="" />
		</div>
		<div class="product-details">
			<span class="product-catagory" onClick={() => history(PRODUCT_ROUTE + '/' + product.id)}>{product.product_type.name}</span>
			<h4><a href="">{product.name}</a></h4>
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, possimus nostrum!</p>
			<div class="product-bottom-details">
				<div class="product-price">{product.price} РУБ</div>
				<div class="product-links">
                    {
                        isProductInBasket(productIn)? 
                        <Button variant="danger" onClick={() => addProductInBasket(productIn)} ><BsCartPlus /></Button>
                        :
                        <Button variant="success" href={BASKET_ROUTE}><BsCheckLg /></Button>
                    }
				</div>
			</div>
		</div>
	</div>
    );
});

export default ProductItem;