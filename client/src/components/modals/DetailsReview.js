import React from "react";
import { Button, Image, Modal, Table } from "react-bootstrap";

const DetailsReview = ({ show, handleClose, review_data }) => {
  console.log(review_data);
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Информация о отзыве №{review_data.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Описание</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>ID отзыва</th>
                <th>{review_data.id}</th>
              </tr>
              <tr>
                <th>ID товара</th>
                <th>{review_data.productId}</th>
              </tr>
              <tr>
                <th>Наименование товара</th>
                <th>{review_data.product.name}</th>
              </tr>
              <tr>
                <th>ID пользователя</th>
                <th>{review_data.review.userId}</th>
              </tr>
              <tr>
                <th>ФИО пользователя</th>
                <th>
                  {review_data.review.user.name}{" "}
                  {review_data.review.user.family}
                </th>
              </tr>
              <tr>
                <th>Текст отзыва</th>
                <th>{review_data.text_reviews}</th>
              </tr>
              <tr>
                <th>Изображение</th>
                <th>
                  {review_data.img_reviews === "not img" ? (
                    "Нет изображения"
                  ) : (
                    <Image
                      src={
                        process.env.REACT_APP_API_URL + review_data.img_reviews
                      }
                      width={150}
                    ></Image>
                  )}
                </th>
              </tr>
              <tr>
                <th>Соответствие описанию</th>
                <th>
                  {review_data.description_true
                    ? "Соответствует"
                    : "Не оответствует"}
                </th>
              </tr>
              <tr>
                <th>Соответствие размеру</th>
                <th>
                  {review_data.size_true ? "Соответствует" : "Не оответствует"}
                </th>
              </tr>
              <tr>
                <th>Соответствие доставки</th>
                <th>
                  {review_data.delivery_true
                    ? "Соответствует"
                    : "Не оответствует"}
                </th>
              </tr>
            </tbody>
          </Table>
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
export default DetailsReview;
