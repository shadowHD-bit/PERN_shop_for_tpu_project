import React, {useContext, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Form, Button} from "react-bootstrap";
import { updateProduct } from '../../http/productAPI';
import UpdatePageDataProducts from '../../pages/Admin/Admin'

const ChangeProduct = ({show, onHide, productChange, updatePage}) => {
    const thisProduct = {...productChange}
    const id = thisProduct.id
    const name = thisProduct.name
    const price = thisProduct.price
    const rating = thisProduct.rating
    const imgMain = thisProduct.imgMain
    const BrandId = thisProduct.productBrandId
    const TypeId = thisProduct.productTypeId

    const [valueName, setValueName] = useState(name || '')
    const [valuePrice, setValuePrice] = useState(price || '')
    const [valueRating, setValueRating] = useState(rating || '')
    const [valueImgMain, setValueImgMain] = useState(imgMain || '')
    const [valueBrand, setValueBrand] = useState(BrandId || '')
    const [valueType, setValueType] = useState(TypeId || '')


    React.useEffect(() => {
        setValueName(name);
        setValuePrice(price);
        setValueRating(rating);
        setValueImgMain(imgMain);
        setValueBrand(BrandId);
        setValueType(TypeId);
    }, [name, price, rating, imgMain, BrandId, TypeId])

    const changeProduct = () => {
        const formData = new FormData();
        formData.append('name', valueName);
        formData.append('price', valuePrice);
        formData.append('imgMain', valueImgMain);
        formData.append('productBrandId', valueBrand);
        formData.append('productTypeId', valueType);
        updateProduct(id, formData);
        onHide();
        updatePage()
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Название товара</Form.Label>
                        <Form.Control
                            className='mb-1'
                            value={valueName || ''}
                            onChange={nameProduct => setValueName(nameProduct.target.value)}
                            placeholder={"Введите название типа"}
                        />
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Цена товара</Form.Label>
                        <Form.Control
                            className='mb-1'
                            value={valuePrice || ''}
                            onChange={e => setValuePrice(e.target.value)}
                            placeholder={"Введите название типа"}
                        />
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Главная фотография</Form.Label>
                        <Form.Control
                            className='mb-1'
                            value={valueImgMain || ''}
                            onChange={e => setValueImgMain(e.target.value)}
                            placeholder={"Введите название типа"}
                        />
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Бренд</Form.Label>
                        <Form.Control
                            className='mb-1'
                            value={valueBrand || ''}
                            onChange={e => setValueBrand(e.target.value)}
                            placeholder={"Введите название типа"}
                        />
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Тип</Form.Label>
                        <Form.Control
                            className='mb-1'
                            value={valueType || ''}
                            onChange={e => setValueType(e.target.value)}
                            placeholder={"Введите название типа"}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={changeProduct}>Изменить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ChangeProduct;