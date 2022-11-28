import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Dropdown, Form, Row, Col } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { createSlider, fetchSlider, updateSlider } from "../../http/sliderAPI";
import { Image } from "react-bootstrap";
import { fetchOneRules, fetchRules, updateRules } from "../../http/rulesAPI";

const ChangeRules = observer(({ show, onHide, id_rule, reRender }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const [rule, setRule] = useState({});

  useEffect(() => {
    fetchOneRules(id_rule).then((data) => {
      setRule(data);
      setTitle(data.name_rules);
      setText(data.information_rules);
    });
  }, []);

  const changeRule = () => {
    const formData = new FormData();
    formData.append("id", id_rule);
    formData.append("name_rules", title);
    formData.append("information_rules", text);
    updateRules(formData).then((data) => {
      reRender();
      onHide();
    });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Изменить информацию
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
        <div className="d-flex flex-row w-100">
          <Button
            variant="outline-success"
            className="mr-2"
            onClick={() => changeRule()}
          >
            Изменить
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
});

export default ChangeRules;
