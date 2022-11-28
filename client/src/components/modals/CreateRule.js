import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Dropdown, Form, Row, Col } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import { createSlider, fetchSlider } from "../../http/sliderAPI";
import { createRules } from "../../http/rulesAPI";

const CreateRule = observer(({ show, reRender, onHide }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const addRules = () => {
    const formData = new FormData();
    formData.append("name_rules", title);
    formData.append("information_rules", text);
    createRules(formData).then((data) => {
      onHide();
      reRender();
      setText("")
      setTitle("")
    });
  };

  return (
    <Modal show={show} onHide={onHide} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить правило
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-3"
            placeholder="Введите заголовок правила"
          />
          <Form.Control
            as="textarea"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="mt-3"
            placeholder="Введите текст описания правила"
            type="text"
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="outline-success" onClick={() => addRules()}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateRule;
