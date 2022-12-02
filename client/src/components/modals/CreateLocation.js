import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Form, Image } from "react-bootstrap";
import { createBrand } from "../../http/productAPI";
import { useForm } from "react-hook-form";
import '../../pages/LocationPage/Location.scss'
import { createLocationApi } from "../../http/locationAPI";


const CreateLocation = ({ show, onHide, reRender }) => {
  const [value, setValue] = useState("");
  const [file, setFile] = useState(null);

  const {
    register,
    handleSubmit,
    watch, reset,
    formState: { errors },
  } = useForm();
  

  const onSubmit = async (data_form) => {
    try {
      const formData = new FormData();
      formData.append("title", data_form.title);
      formData.append("description", data_form.description);
      formData.append("text_address", data_form.text_address);
      formData.append("x_coordination", data_form.x_coordination);
      formData.append("y_coordination", data_form.y_coordination);
      await createLocationApi(formData).then((data) => {
        onHide()
        reRender()
        reset({title: '', description: '', text_address: '', x_coordination: '', y_coordination: ''})
      });
    } catch (e) {
      console.log(e);
    }
    reset({})
  };

  return (
    <Modal show={show} onHide={onHide} centered className="modal_create_location">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить позицию
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Control
            placeholder={"Введите название позиции"}
            name="title"
            {...register("title", {
              required: true,
            })}
          />
          {errors.title?.type === "required" && (
            <div className="alert_error_container">
              <p className="alert_error" role="alert_error">
                Укажите наименование!
              </p>
            </div>
          )}
          <Form.Control
            placeholder={"Введите описание позиции"}
            as="textarea"
            name="description"
            {...register("description", {
              required: true,
            })}
          />
          {errors.description?.type === "required" && (
            <div className="alert_error_container">
              <p className="alert_error" role="alert_error">
                Укажите описание!
              </p>
            </div>
          )}
          <Form.Control
            placeholder={"Введите текстовый адрес позиции"}
            name="text_address"
            {...register("text_address", {
              required: true,
            })}
          />
          {errors.text_address?.type === "required" && (
            <div className="alert_error_container">
              <p className="alert_error" role="alert_error">
                Укажите текстовый адрес!
              </p>
            </div>
          )}
          <Form.Control
            placeholder={"Введите X координату позиции"}
            name="x_coordination"
            {...register("x_coordination", {
              required: true,
            })}
          />
          {errors.x_coordination?.type === "required" && (
            <div className="alert_error_container">
              <p className="alert_error" role="alert_error">
                Укажите координату!
              </p>
            </div>
          )}
          <Form.Control
            placeholder={"Введите Y координату позиции"}
            name="y_coordination"
            {...register("y_coordination", {
              required: true,
            })}
          />
          {errors.y_coordination?.type === "required" && (
            <div className="alert_error_container">
              <p className="alert_error" role="alert_error">
                Укажите координату!
              </p>
            </div>
          )}
          <Button type="submit" variant="outline-success" className="mt-3">
            Добавить
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateLocation;
