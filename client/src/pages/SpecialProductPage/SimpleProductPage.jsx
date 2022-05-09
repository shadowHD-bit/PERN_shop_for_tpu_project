import { observer } from 'mobx-react-lite';
import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import {useParams} from 'react-router-dom'
import { Context } from '../..';
import { fetchOneProduct, addProductToBasket } from '../../http/productAPI';
import { BASKET_ROUTE } from '../../utils/consts';
import {BsCheckLg} from 'react-icons/bs'
import {BsCartPlus} from 'react-icons/bs'
import './Simple.scss'

const SimpleProduct = observer(() => {
    const {user, basket} = useContext(Context);

    const [product, setProduct] = useState({info: []})
    const {id} = useParams()

    
    useEffect(() => {
        fetchOneProduct(id).then(data => setProduct(data))
    }, [])

    const isProductInBasket = () => {
        const findProduct = basket.Basket.findIndex(item => Number(item.id) === Number(product.id));
        return findProduct < 0;
    }

    const addProductInBasket = (product) => {
        if(user.isAuth) {
            addProductToBasket(product).then(() => basket.setBasket(product, true))
        } else {
            basket.setBasket(product);
        }
    }

    return (
        <section class="product">
        
        <div class="product__photo">
            <div class="photo-container">
                <div class="photo-main" style={{backgroundImage: `url(${process.env.REACT_APP_API_URL + product.imgMain})`}}>
                    <div class="controls">
                        <i class="material-icons">share</i>
                        <i class="material-icons">favorite_border</i>
                    </div>
                </div>
                <div class="photo-album">
                    <ul>
                        <li><img src="https://res.cloudinary.com/john-mantas/image/upload/v1537302064/codepen/delicious-apples/green-apple2.png" alt="green apple"/></li>
                        <li><img src="https://res.cloudinary.com/john-mantas/image/upload/v1537303532/codepen/delicious-apples/half-apple.png" alt="half apple"/></li>
                        <li><img src="https://res.cloudinary.com/john-mantas/image/upload/v1537303160/codepen/delicious-apples/green-apple-flipped.png" alt="green apple"/></li>
                        <li><img src="https://res.cloudinary.com/john-mantas/image/upload/v1537303708/codepen/delicious-apples/apple-top.png" alt="apple top"/></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="product__info">
            <div class="title">
                <h1>{product.name}s</h1>
                <span>Код товара: {product.id}</span>
            </div>
            <div class="price">
                <span>{product.price}</span> РУБ
            </div>
            {/* <div class="variant">
                <h3>SELECT A COLOR</h3>
                <ul>
                    <li><img src="https://res.cloudinary.com/john-mantas/image/upload/v1537302064/codepen/delicious-apples/green-apple2.png" alt="green apple"/></li>
                    <li><img src="https://res.cloudinary.com/john-mantas/image/upload/v1537302752/codepen/delicious-apples/yellow-apple.png" alt="yellow apple"/></li>
                    <li><img src="https://res.cloudinary.com/john-mantas/image/upload/v1537302427/codepen/delicious-apples/orange-apple.png" alt="orange apple"/></li>
                    <li><img src="https://res.cloudinary.com/john-mantas/image/upload/v1537302285/codepen/delicious-apples/red-apple.png" alt="red apple"/></li>
                </ul>
            </div> */}
            <div class="description">
                <h3>Характеристики</h3>
                <ul>
                    {product.info.map((info, index) =>
                     <li key={index}>{info.title}: {info.description}</li>
                    )}
                </ul>
            </div>
            {
                        isProductInBasket(product)? 
                        <Button class="buy--btn" variant='outline-danger' onClick={() => addProductInBasket(product)} disabled={!user.isAuth ? true : false}> <BsCartPlus /> Добавить в корзину</Button>
                        :
                        <a href={BASKET_ROUTE}><Button class="yes--buy--btn" variant='outline-success'> <BsCheckLg /> Уже в корзине</Button></a>
                    }
        </div>
    </section>
    );
});

export default SimpleProduct;