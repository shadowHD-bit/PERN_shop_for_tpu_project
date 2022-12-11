import React from "react";
import { Button, Col, Image, Modal, Row, Table } from "react-bootstrap";

const DetailsOrder = ({ show, handleClose, detail }) => {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title>Информация о заказе №{detail?.orderId}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Row className="ml-1">
              <h4 className="p-0">Основная информация о заказе</h4>
              <Col>
                <Row>Общая сумма заказа: {detail?.total_price} рублей</Row>
                <Row>
                  Доставка:{" "}
                  {!detail?.payment_delivery ? "Бесплатная" : "Платная"}
                </Row>
                <Row>Скидка: {detail?.sale == 100 ? 0 : detail?.sale}%</Row>
                <Row></Row>
                <Row></Row>
              </Col>
            </Row>
            <hr />

            <Row className="ml-1">
              <h4 className="p-0">Информация о заказчике</h4>

              <Col>
                <Row>Имя: {detail?.name}</Row>
                <Row>Фамилия: {detail?.family}</Row>
                <Row>Номер телефона: {detail?.number_phone}</Row>
                <Row>Страна: {detail?.country}</Row>
                <Row>Город: {detail?.city}</Row>
                <Row>Улица: {detail?.street}</Row>
                <Row>Номер дома: {detail?.number_home}</Row>
                <Row>
                  Номер квартиры:{" "}
                  {detail?.number_apartment == null
                    ? "-"
                    : detail?.number_apartment}
                </Row>
                <Row>Почтовый индекс: {detail?.zip_code}</Row>
              </Col>
            </Row>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={() => handleClose()}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default DetailsOrder;
