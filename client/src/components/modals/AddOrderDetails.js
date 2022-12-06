import React, { useContext, useState } from "react";
import { Alert, Button, Col, Form, Image, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Context } from "../..";
import { sendOrder } from "../../http/orderAPI";
import { CHECKOUT_ROUTE } from "../../utils/consts";
import './modal.scss'

const AddOrderDetails = ({ show, onHide, sale, payment_delivery, total_price }) => {

    const {user} = useContext(Context)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const formData = new FormData()
    formData.append('userId', user.user.id)
    formData.append('sale', sale == 1 ? 0 : sale)
    formData.append('payment_delivery', payment_delivery)
    formData.append('total_price', total_price)

    formData.append('name', data.name)
    formData.append('family', data.family)
    formData.append('number_phone', data.number_phone)
    formData.append('country', 'Россия')
    formData.append('city', data.city)
    formData.append('street', data.street)
    formData.append('number_home', data.number_home)
    formData.append('number_apartments', data.number_apartments)
    formData.append('zip', data.zip)

    console.log(user.user.id);

    sendOrder(formData).then(() => {
        window.location.href = CHECKOUT_ROUTE
    })
  };

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="xl"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Данные доставки
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="info">
            <p>
              Пожалуйста, укажите следующие данные для того, чтобы мы доставить
              посылку по верному адресу!
            </p>
          </Alert>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col>
                <Form.Label>Имя:</Form.Label>
                <Form.Control {...register("name", { required: true })} />
                {errors.name && (
                  <div className="alert_error_container">
                    <p className="error_alert" role="error_alert">
                      Укажите имя!
                    </p>
                  </div>
                )}
                <Form.Label>Фамилия:</Form.Label>
                <Form.Control {...register("family", { required: true })} />
                {errors.family && (
                  <div className="alert_error_container">
                    <p className="error_alert" role="error_alert">
                      Укажите фамилию!
                    </p>
                  </div>
                )}{" "}
              </Col>
              <Col>
                {" "}
                <Form.Label>Номер телефона:</Form.Label>
                <Form.Control
                  {...register("number_phone", { required: true })}
                />
                {errors.number_phone && (
                  <div className="alert_error_container">
                    <p className="error_alert" role="error_alert">
                      Укажите номер телефона!
                    </p>
                  </div>
                )}{" "}
              </Col>
            </Row>
            <hr />
            <Row>
              <Col>
                <Form.Label>Страна:</Form.Label>
                <Form.Control
                  disabled
                  defaultValue="Россия"
                  {...register("country")}
                />
                <Form.Label>Город:</Form.Label>
                <Form.Control {...register("city", { required: true })} />
                {errors.city && (
                  <div className="alert_error_container">
                    <p className="error_alert" role="error_alert">
                      Укажите город!
                    </p>
                  </div>
                )}{" "}
                <Form.Label>Улица:</Form.Label>
                <Form.Control {...register("street", { required: true })} />
                {errors.city && (
                  <div className="alert_error_container">
                    <p className="error_alert" role="error_alert">
                      Укажите улицу!
                    </p>
                  </div>
                )}{" "}
              </Col>
              <Col>
                <Form.Label>Номер дома:</Form.Label>
                <Form.Control
                  {...register("number_home", { required: true })}
                />
                {errors.city && (
                  <div className="alert_error_container">
                    <p className="error_alert" role="error_alert">
                      Укажите номер дома!
                    </p>
                  </div>
                )}{" "}
                <Form.Label>Номер квартиры:</Form.Label>
                <Form.Control {...register("number_apartments")} />
                <Form.Label>Почтовый индекс:</Form.Label>
                <Form.Control {...register("zip", { required: true })} />
                {errors.city && (
                  <div className="alert_error_container">
                    <p className="error_alert" role="error_alert">
                      Укажите почтовый индекс!
                    </p>
                  </div>
                )}{" "}
              </Col>
            </Row>
            <Row>
              <Col>
                <Button className="mt-3" variant="success" type="submit">
                  Оплатить
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default AddOrderDetails;
