import React, {useContext, useEffect, useState} from 'react';
import {Accordion, Button, Container, Table} from "react-bootstrap";
import AccordionBody from 'react-bootstrap/esm/AccordionBody';
import AccordionHeader from 'react-bootstrap/esm/AccordionHeader';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '..';
import CreateBrand from "../components/modals/CreateBrand";
import CreateProduct from "../components/modals/CreateProduct";
import CreateType from "../components/modals/CreateType";
import ChangeProduct from '../components/modals/ChangeProduct'
import DeleteTypeBrand from "../components/modals/DeleteTypeBrand";
import { fetchDeleteProduct, fetchProduct } from '../http/productAPI';
import { ADMIN_ROUTE } from '../utils/consts';

const Admin = () => {
    const [brandVisible, setBrandVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [productVisible, setProductVisible] = useState(false)
    const [typeBrandDeleteVisible, setDeleteTypeBrandVisible] = useState(false)
    const [changeVisible, setChangeVisible] = useState(false)
    const [changeProductData, setChangeProductData] = useState()

    const {product} = useContext(Context)

    useEffect(() => {
        fetchProduct(null, null, 1, 10).then(data => {
          product.setProduct(data.rows)
          product.setTotalCount(data.count)
        })
    }, [])

    const [successMsg, setSuccessMsg] = useState('');
    const [showSuccessMsg, setShowSuccessMsg] = useState(false);

    const showSuccessMsgFunc = (msg) => {
        setSuccessMsg(msg);
        setShowSuccessMsg(true);
        setTimeout(() => setShowSuccessMsg(false), 5000);
    }

    const history = useNavigate()

    const deleteProduct = (id) => {
        fetchDeleteProduct(id).then(() => {
            history(ADMIN_ROUTE);
        })
    }

    const changeProduct = (product) => {
        setChangeProductData(product)
        setChangeVisible(true)
        console.log(product)
    }


    return (
        <Container className="d-flex flex-column">
          <h1>Админка (v. 1.0.1)</h1>
          <div className="d-flex flex-row justify-content-around">
            <Button
                variant={"outline-dark"}
                className="mt-4 mr-2 w-50"
                onClick={() => setTypeVisible(true)}
            >
                Добавить тип
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-4 ml-2 w-50"
                onClick={() => setBrandVisible(true)}
            >
                Добавить бренд
            </Button>
            </div>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setDeleteTypeBrandVisible(true)}
            >
                Удалить тип/бренд
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setProductVisible(true)}
            >
                Добавить товар
            </Button>
        <Accordion>
        <Accordion.Item eventKey="" className='mt-4 mb-4'>
            <AccordionHeader>Список товаров</AccordionHeader>
            <AccordionBody>
                <Table striped bordered hover className="mt-4 p-2">
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Название</th>
                    <th>Цена</th>
                    <th>Рейтинг</th>
                    <th>Основное изображение</th>
                    <th>Дата добавления</th>
                    <th>Бренд</th>
                    <th>Тип</th>
                    <th>Удалить</th>
                    <th>Изменить</th>
                    </tr>
                </thead>
                <tbody>
                {product.products.map((productItem) =>
                    <tr key={productItem.id}>
                        <td key={productItem.id}>{productItem.id}</td>
                        <td key={productItem.name}>{productItem.name}</td>
                        <td key={productItem.price}>{productItem.price}</td>
                        <td key={productItem.rating + Math.random()}>{productItem.rating}</td>
                        <td key={productItem.imgMain}>{productItem.imgMain}</td>
                        <td key={productItem.createdAt}>{productItem.createdAt}</td>
                        <td key={productItem.productBrandId + Math.random()}>{productItem.productBrandId}</td>
                        <td key={productItem.productTypeId + Math.random()}>{productItem.productTypeId}</td>
                        <td key={Math.random() + Math.random()}><Button variant={"outline-danger"} onClick={() => deleteProduct(productItem.id)}>Удалить</Button></td>
                        <td key={Math.random() + Math.random()}><Button variant={"outline-primary"} onClick={() => changeProduct(productItem)}>Изменить</Button></td>
                    </tr>      
                )}
                </tbody>
                </Table>
            </AccordionBody>
            </Accordion.Item>
        </Accordion>
            <ChangeProduct show={changeVisible} onHide={() => setChangeVisible(false)} productChange={changeProductData}/>
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
            <CreateProduct show={productVisible} onHide={() => setProductVisible(false)}/>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
            <DeleteTypeBrand show={typeBrandDeleteVisible} onHide={() => setDeleteTypeBrandVisible(false)} showSuccessMsgFunc={showSuccessMsgFunc}/>
        </Container>
    );
};

export default Admin;