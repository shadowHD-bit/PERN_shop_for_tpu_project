import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Image, ListGroup, Modal, NavLink, Row } from 'react-bootstrap'
import { Context } from '../..';
import { getOneOrderProducts } from '../../http/orderAPI';
import { fetchOneProduct, fetchProduct } from '../../http/productAPI';
import { ORDERS_ROUTE, PRODUCT_ROUTE, SHOP_ROUTE } from '../../utils/consts';

const OneOrder = ({id, complete, createdAt, updatedAt, reRender}) => {

    const [modalDelete, setShowDelete] = useState(false);
    const [productInfo, setProductInfo] = useState([])

    //modal delete
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => {
        setShowDelete(true)
    };

    useEffect(() => {
        getOneOrderProducts(id).then(data => setProductInfo(data))
    }, [])



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
                    <Col md={4} className="d-flex justify-content-center align-items-center">
                        <Button variant='outline-success' onClick={() => handleShowDelete()}>Подробности заказа</Button>
                    </Col>
                </Row>
            </ListGroup.Item>




            {/*modal confirm delete order*/}
            <Modal show={modalDelete} onHide={handleCloseDelete} dialogClassName="modal-90w"  aria-labelledby="example-custom-modal-styling-title" size="xl">
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">Информационное окно</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Информация о заказе (Номер заказа: {id})
                    <br/><br/>  
                    {
                    productInfo.prod?.map(item => {
                        return(
                        <Card className='mt-2'>
                            <Row>
                                <Col md={2}>
                                    <img style={{width: '100%'}} src={process.env.REACT_APP_API_URL + item.descr.imgMain} alt=""/>
                                </Col>
                                <Col className='d-flex justify-content-center align-items-center'>
                                    <ul style={{listStyle: 'none'}}>
                                        <li>Номер товара: {item.descr.id}</li>
                                        <li>Имя товара: {item.descr.name}</li>
                                        <li>Цена товара: {item.descr.price} РУБ</li>
                                        <li>Количество: {item.count}</li>
                                    </ul>
                                </Col>
                                <Col className='d-flex justify-content-center align-items-center'>
                                <a style={{padding: '5px 20px', border: '1px solid red', color: 'red', textDecoration: 'none', borderRadius: '10px'}} href={PRODUCT_ROUTE +'/'+item.descr.id}>Просмотреть товар</a>
                                </Col>
                            </Row>
                        </Card>
                        )
                    })
                    }

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDelete}>
                        Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
  )
}
export default OneOrder