import { observer } from 'mobx-react-lite';
import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import {useParams} from 'react-router-dom'
import { Context } from '../..';
import { fetchOneProduct, addProductToBasket } from '../../http/productAPI';

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
    console.log(basket.Basket);

    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={product.imgMain}/>
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <h2>{product.name}</h2>
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{width:240, height: 240, backgroundSize: 'cover', fontSize:64}}
                        >
                            {product.rating}
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}
                    >
                        <h3>{product?.price || 0} Рублей</h3>
                        { isProductInBasket() ?
                            <Button variant="outline-dark" onClick={() => addProductInBasket(product)}>Добавить в корзину</Button>
                            :
                            <Button variant="outline-dark" disabled>Product already in basket</Button>
                        }

                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1>Характеристики</h1>
                {product.info.map((info, index) =>
                    <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>
        </Container>
    );
});

export default SimpleProduct;