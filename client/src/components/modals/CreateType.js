import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Form, Button, Image } from "react-bootstrap";
import { createType } from "../../http/productAPI";

const CreateType = ({ show, onHide, reRender }) => {
  const [value, setValue] = useState("");
  const [file, setFile] = useState(null);

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const addType = () => {
    const formData = new FormData();
    formData.append("name", value);
    formData.append("img", file);
    createType(formData).then((data) => {
      setValue("");
      onHide();
      reRender();
    });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить тип
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={"Введите название типа"}
          />
          <Form.Control className="mt-3" type="file" onChange={selectFile} />
        </Form>
        {file ? <Image src={URL.createObjectURL(file)} width={150} /> : ""}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="outline-success" onClick={addType}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateType;
