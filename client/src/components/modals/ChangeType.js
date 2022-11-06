import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { updateBrand, updateType } from "../../http/productAPI";

const ChangeType = ({ show, onHide, id, name, reRender }) => {
  const [typeName, setTypeName] = useState(name);

  const updateTypeInModal = () => {
    const formData = new FormData();
    formData.append("name", typeName);
    updateType(id, formData).then(data => {
        onHide()
        reRender()
    })
  }
  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Изменение бренда "{name}"
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={12}>
              <p>Укажите необходимые параметры бренда:</p>
            </Col>
            <Col xs={12}>
              <Form.Control
                value={typeName}
                onChange={(e) => setTypeName(e.target.value)}
                className="mt-3"
                placeholder="Название бренда"
              ></Form.Control>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={() => updateTypeInModal()}>Изменить</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ChangeType;
