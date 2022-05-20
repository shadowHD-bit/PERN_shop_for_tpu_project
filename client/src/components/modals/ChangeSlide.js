import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Dropdown, Form, Row, Col } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import { createSlider, fetchSlider, updateSlider } from "../../http/sliderAPI";
import { Image } from "react-bootstrap";

const ChangeSlides = observer(({ show, onHide }) => {
  const { slider } = useContext(Context);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState("");

  useEffect(() => {
    fetchSlider().then((data) => {
      slider.setSlider(data);
    });
  }, []);

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const changeData = (slide) => {
    slider.setSliderInAdmin(slide);
    setTitle(slider.selectedSlider.title);
    setText(slider.selectedSlider.text);
    setFile(slider.selectedSlider.img);
  };

  const changeSlider = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("text", text);
    formData.append("img", file);
    updateSlider(slider.selectedSlider.id, formData).then((data) => onHide());
  };

  const deleteSlide = (id) => {
    deleteSlide(id).then((data) => {
      onHide();
    });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Удалить/изменить слайдер
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>
              {slider.selectedSlider.title || "Выберите Слайд"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {slider.sliders.map((slide) => (
                <Dropdown.Item onClick={() => changeData(slide)} key={slide.id}>
                  {slide.title}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          {!slider.selectedSlider.title ? (
            <Form.Control
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-3"
              placeholder="Введите заголовок слайда"
              disabled={true}
            />
          ) : (
            <Form.Control
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-3"
              placeholder="Введите заголовок слайда"
            />
          )}

          {!slider.selectedSlider.title ? (
            <Form.Control
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="mt-3"
              placeholder="Введите текст слайда"
              type="text"
              disabled={true}
            />
          ) : (
            <Form.Control
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="mt-3"
              placeholder="Введите текст слайда"
              type="text"
            />
          )}

          {!slider.selectedSlider.title ? (
            <div></div>
          ) : (
            <Image
              src={process.env.REACT_APP_API_URL + file}
              style={{ width: "100%" }}
            ></Image>
          )}

          {!slider.selectedSlider.title ? (
            <Form.Control
              className="mt-3"
              type="file"
              onChange={selectFile}
              disabled={true}
            />
          ) : (
            <Form.Control className="mt-3" type="file" onChange={selectFile} />
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex flex-row w-100">
          {!slider.selectedSlider.title ? (
            <Button
              variant="outline-success"
              className="mr-2"
              onClick={changeSlider}
              disabled={true}
            >
              Изменить
            </Button>
          ) : (
            <Button
              variant="outline-success"
              className="mr-2"
              onClick={changeSlider}
            >
              Изменить
            </Button>
          )}

          {!slider.selectedSlider.title ? (
            <Button
              variant="outline-danger"
              onClick={deleteSlide}
              disabled={true}
            >
              Удалить
            </Button>
          ) : (
            <Button variant="outline-danger" onClick={deleteSlide}>
              Удалить
            </Button>
          )}
        </div>
      </Modal.Footer>
    </Modal>
  );
});

export default ChangeSlides;
