import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";


import {Button, Col, Container, Image, Row} from "react-bootstrap";
import OneItemInBasket from "./OneItemBasket";
import { Context } from '../..';

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
        <>
            <br/>
            <Container>
            <Row className="mt-3 ml-3 w-100">
                <Col xs={12}>
                    {basket.Basket.map(product => <OneItemInBasket key={product.id} product={product}/>)}
                </Col>
            </Row>
            </Container>
        </>
    );
});

export default BasketCard;