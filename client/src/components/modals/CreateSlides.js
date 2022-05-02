import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown, Form, Row, Col} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import { Context } from '../..';
import { createSlider, fetchSlider } from '../../http/sliderAPI';

const CreateSlider = observer(({show, onHide}) => {
    const {slider} = useContext(Context)
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [file, setFile] = useState(null)

    useEffect(() => {
        fetchSlider().then(data => {
          slider.setSlider(data)
        })
    }, [])

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addSlider = () => {
        const formData = new FormData()
        formData.append('title', title)
        formData.append('text', text)
        formData.append('img', file)
        createSlider(formData).then(data => onHide())
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить слайдер
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className="mt-3"
                        placeholder="Введите заголовок слайда"
                    />
                    <Form.Control
                        value={text}
                        onChange={e => setText(e.target.value)}
                        className="mt-3"
                        placeholder="Введите текст слайда"
                        type="text"
                    />
                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                    />            
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addSlider}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateSlider;