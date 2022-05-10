import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Image, Row} from "react-bootstrap";
import {Context} from "../../index";
import {NavLink} from "react-router-dom";
import { fetchOneProduct } from '../../http/productAPI';
import './BasketCard.scss'
import {GrClose} from 'react-icons/gr'

const OneItemInBasket = ({product}) => {
    const {basket, user} = useContext(Context);
    
    const [productIn, setProductIn] = useState({info: []})

    return (
        // <Card key={product.id} style={{width: "90%", borderRadius: '30px'}} className="mb-3">
        //     <Card.Body>
        //         <Row>
        //             <Col xs={4}>
        //                 <Image src={process.env.REACT_APP_API_URL + product.imgMain} style={{width: "100%", maxWidth: 250}} />
        //             </Col>
        //             <Col xs={4}>
        //                 <Row>
        //                     <Col xs={12}>
        //                         <b>Название товара:</b> <NavLink to={`/product/${product.id}`}>{product.name}</NavLink>
        //                     </Col>
        //                     <Col xs={12}>
        //                         <b>Тип:</b> <NavLink to={`/product/${product.id}`}>{productIn.name}</NavLink>
        //                     </Col>
        //                     <Col xs={12}>
        //                         <b>Бренд:</b> <NavLink to={`/product/${product.id}`}>{productIn.name}</NavLink>
        //                     </Col>
        //                 </Row>
        //                 <Row>
        //                     <Col xs={12}>
        //                         <b>Описание товара:</b><br/><br/>
        //                         {product.info && product.info.length !== 0? product.info.map((info, i) => {

        //                             if(i % 2 === 0 ) {
        //                                 return (
        //                                     <Row key={info.id}>
        //                                         <Col xs={6}>
        //                                             {info.title}
        //                                         </Col>
        //                                         <Col xs={6}>
        //                                             {info.description}
        //                                         </Col>
        //                                     </Row>
        //                                 );
        //                             } else {
        //                                 return (
        //                                     <Row key={info.id} style={{backgroundColor: "lightgray"}}>
        //                                         <Col xs={6}>
        //                                             {info.title}
        //                                         </Col>
        //                                         <Col xs={6}>
        //                                             {info.description}
        //                                         </Col>
        //                                     </Row>
        //                                 );
        //                             }

        //                         }) : "Описание отсутствует"}
        //                     </Col>
        //                 </Row>


        //             </Col>
        //             <Col xs={4}>
        //                 <Row>
        //                     <Col xs={12} className="d-flex justify-content-center">
        //                         {user.isAuth ? <Button variant="outline-danger w-50" onClick={() => basket.setDeleteItemBasket(product, true)}>Удалить</Button>
        //                             : <Button variant="outline-danger w-50" onClick={() => basket.setDeleteItemBasket(product)}>Удалить</Button>
        //                         }
        //                     </Col>
        //                 </Row>
        //                 <Row className="mt-5">
        //                     <Col xs={12} className="d-flex justify-content-center">
        //                         Количество:
        //                     </Col>
        //                 </Row>
        //                 <Row className="mt-2">
        //                     <Col xs={12} className="d-flex justify-content-center">
        //                         <Button variant="outline-dark" onClick={() => basket.setCountProduct(product.id, "+")}>+</Button>
        //                         <input className="ml-2 mr-2 pl-2 pr-2" style={{width: "20%"}} type="number" onChange={e =>basket.setCountProduct(Number(e.target.value))} value={product.count}/>
        //                         <Button variant="outline-dark" onClick={() => basket.setCountProduct(product.id, "-")}>-</Button>
        //                     </Col>
        //                 </Row>
        //                 <Row className="mt-5">
        //                     <Col xs={12} className="d-flex justify-content-center">
        //                         Цена: {product.price * product.count} Рублей
        //                     </Col>
        //                 </Row>
        //             </Col>
        //         </Row>
        //     </Card.Body>
        // </Card>
        <tr>
			<td class="product-thumbnail"><a href={`/product/${product.id}`}><img src={process.env.REACT_APP_API_URL + product.imgMain} alt="" style={{width: '100px'}}/></a></td>
			<td class="product-name"><a href={`/product/${product.id}`}>{product.name}</a></td>
			<td class="product-price"><span class="amount">{product.price} РУБ</span></td>
			<td class="product-quantity"> 
                <Button variant="outline-dark" onClick={() => basket.setCountProduct(product.id, "+")}>+</Button>
                    <input className="ml-2 mr-2 pl-2 pr-2" style={{width: "20%"}} type="number" onChange={e =>basket.setCountProduct(Number(e.target.value))} value={product.count}/>
                <Button variant="outline-dark" onClick={() => basket.setCountProduct(product.id, "-")}>-</Button>
            </td>
			<td class="product-subtotal">{product.price * product.count} РУБ</td>
			<td class="product-remove"><a ><GrClose onClick={() => basket.setDeleteItemBasket(product, true)}/></a></td>
		</tr>
)};

export default OneItemInBasket;