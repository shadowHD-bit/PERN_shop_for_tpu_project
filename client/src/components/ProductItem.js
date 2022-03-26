import React from 'react';
import {Card, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import {useNavigate} from "react-router-dom"
import { PRODUCT_ROUTE } from '../utils/consts';

const ProductItem = ({product}) => {
    const history = useNavigate()
    return (
        <Col md={3} className={"mt-3"} onClick={() => history(PRODUCT_ROUTE + '/' + product.id)}>
            <Card style={{width: 150, cursor: 'pointer'}} border={"light"}>
                <Image width={150} height={150} src={product.imgMain}/>
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                    <div>Samsung...</div>
                    <div className="d-flex align-items-center">
                        <div>{product.rating}</div>
                    </div>
                </div>
                <div>{product.name}</div>
            </Card>
        </Col>
    );
};

export default ProductItem;