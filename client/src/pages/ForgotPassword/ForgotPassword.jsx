import React from "react";
import { useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Image,
  Row,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { createForgotPasswordLink } from "../../http/userAPI";
import "./ForgotPassword.scss";

const ForgotPassword = () => {
  const [info, setInfo] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data_form) => {
    try {
      const formData = new FormData();
      formData.append("email", data_form.email);
      await createForgotPasswordLink(formData).then((data) => {
        setInfo(data);
        console.log(data_form);
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Container className="forgot_container">
        <Row>
          <Col xs={12}>
            <Row className="d-flex flex-row justify-content-center align-items-center mt-5">
              <Col xs={6}>
                {info !== "" ? (
                  <Alert
                    variant="danger"
                    className="server_alert"
                  >
                    {info}
                  </Alert>
                ) : (
                  ""
                )}
              </Col>
            </Row>
          </Col>
          <Col
            xs={12}
            className="d-flex flex-row justify-content-center align-items-center mt-5"
          >
            {" "}
            <Image
              src={
                process.env.PUBLIC_URL + "/img/productcard/video-calling.png"
              }
              width={250}
            />
          </Col>
          <Col xs={12}>
            <Row className="d-flex flex-row justify-content-center align-items-center text-center">
              <Col xs={6} className="mt-3">
                <p className="info_text">
                  Для того, чтобы восстановить пароль, укажите адрес электронной
                  почты, который был указан при регистрации:
                </p>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <FloatingLabel
                    controlId="floatingPassword"
                    className="label_form"
                    label="Эл.почта"
                  >
                    <Form.Control
                      className="auth_card_input"
                      type="text"
                      name="email"
                      placeholder="example@example.com"
                      {...register("email", {
                        required: true,
                        pattern:
                          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                      })}
                    />
                  </FloatingLabel>
                  {errors.email?.type === "required" && (
                    <div className="alert_error_container">
                      <p className="alert_error" role="alert_error">
                        Укажите эл.почту!
                      </p>
                    </div>
                  )}
                  {errors.email?.type === "pattern" && (
                    <div className="alert_error_container">
                      <p className="alert_error" role="alert_error">
                        Укажите корректный адрес эл. почты!
                      </p>
                    </div>
                  )}
                  <Button
                    type="submit"
                    variant="outline-success"
                    className="mt-3"
                  >
                    Получить ссылку
                  </Button>
                </Form>
              </Col>
            </Row>
            <Row>
              <Col xs={12}></Col>
            </Row>
          </Col>
          <Col xs={12}></Col>
        </Row>
      </Container>
    </>
  );
};
export default ForgotPassword;
