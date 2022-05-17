import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Image, ListGroup, Modal, NavLink, Row } from 'react-bootstrap'
import { Context } from '../..';
import { getOneOrderProducts } from '../../http/orderAPI';
import { fetchOneProduct, fetchProduct } from '../../http/productAPI';
import { ORDERS_ROUTE } from '../../utils/consts';

const OneOrder = ({id, complete, createdAt, updatedAt, data}) => {

    const [productItem, setProductItem] = useState({})
    const [modalDelete, setShowDelete] = useState(false);
    const [productInfo, setProductInfo] = useState([])

    //modal delete
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => {
        setShowDelete(true)

    };

    if(productInfo == undefined){
        data.then(data => setProductInfo([data]))
    }

    //Format date (createdAt)
    const formatDate = (propsDate) => {
        const date = new Date(Date.parse(propsDate));
        const options = {
            weekday: "short",
            hour: 'numeric',
            minute: 'numeric',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            timezone: 'UTC'
        };
        return date.toLocaleString("en-US", options);
    }

    return (
        <>
            <ListGroup.Item className="mt-3" key={id}>
                <Row>
                    <Col md={2}>
                    </Col>
                    <Col md={6}>
                        <Row>
                            <Col xs={12}>
                                <NavLink to={ORDERS_ROUTE + `/${id}`}>Номер заказа: {id}</NavLink>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                Дата создания заказа: {formatDate(createdAt)}
                            </Col>
                        </Row>
                        {complete ? <Row>
                            <Col xs={12}>
                                Дата завершения заказа: {formatDate(updatedAt)}
                            </Col>
                        </Row> : false}
                        <Row>
                            <Col xs={12}>
                                Статус заказа: {complete ? "Завершен" : "В пути"}
                            </Col>
                        </Row>
                    </Col>
                    <Col md={4}>
                        <Button variant='outline-success' onClick={() => handleShowDelete()}>Подробности заказа</Button>
                    </Col>
                </Row>
            </ListGroup.Item>




            {/*modal confirm delete order*/}
            <Modal show={modalDelete} onHide={handleCloseDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Информационное окно</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Информация о заказе (Номер заказа: {id})
                    <br/><br/>
                    {
                    // productInfo.map(item => {
                    //     <Card>
                    //         <Row>
                    //             <Col md={4}>
                    //                 <img src={process.env.REACT_APP_API_URL + item.prod.imgMain} alt=""/>
                    //             </Col>
                    //             <Col>
                    //                 <ul>
                    //                     <li>sdvsdv</li>
                    //                     <li>Номер товара: {item.prod.id}</li>
                    //                     <li>Имя товара: {item.prod.name}</li>
                    //                     <li>Цена товара: {item.prod.price}</li>
                    //                     <li>Количество: {item.count}</li>
                    //                 </ul>
                    //             </Col>
                    //             <Col>
                                
                    //             </Col>
                    //         </Row>
                    //     </Card>
                    // })
                    }

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDelete}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
  )
}
export default OneOrder