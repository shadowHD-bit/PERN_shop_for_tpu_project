import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import {useParams} from 'react-router-dom'

const SimpleProduct = () => {
    const product = {id: 1, name: 'Брюки Adidas', price: 2500, rating: 5, imgMain: 'https://b.allegroimg.com/original/033708/41fe4477451aa5a5b407984d754b/Spodnie-treningowe-ADIDAS-REGISTA-18-size-S'}

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
                        <h3>От: {product.price} руб.</h3>
                        <Button variant={"outline-dark"}>Добавить в корзину</Button>
                    </Card>
                </Col>
            </Row>

        </Container>
    );
};

export default SimpleProduct;