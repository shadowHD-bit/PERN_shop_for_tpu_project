import React from "react";
import { Card, Col, Image, Row } from "react-bootstrap";
import BadReviewTag from "../Tags/BadReviewTag/BadReviewTag";
import GoodReviewTag from "../Tags/GoodReviewTag/GoodReviewTag";
import "./ReviewUI.scss";

const ReviewUI = ({
  name_user,
  family_user,
  img_user,
  text_review,
  img_review,
  description_true,
  size_true,
  delivery_true,
}) => {
  return (
    <>
      <Card className="review_card">
        <Card.Header>
          <Image
            src={process.env.REACT_APP_API_URL + img_user}
            width={35}
            style={{
              borderRadius: "50%",
              padding: 0,
              margin: 0,
            }}
          ></Image>{" "}
          {name_user} {family_user}
        </Card.Header>
        <Card.Body>
          <Row>
            <Col className="d-flex flex-row">
              {description_true ? (
                <GoodReviewTag children={"Описание соответствует"} />
              ) : (
                <BadReviewTag children={"Описание не соответствует"} />
              )}
              {size_true ? (
                <GoodReviewTag children={"Размер соответствует"} />
              ) : (
                <BadReviewTag children={"Размер не соответствует"} />
              )}
              {delivery_true ? (
                <GoodReviewTag children={"Доставка соответствует"} />
              ) : (
                <BadReviewTag children={"Доставка не соответствует"} />
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              <br />
              {text_review}
              <br />
            </Col>
          </Row>
        </Card.Body>
        {img_review != "not img" ? (
          <Card.Footer>
            <img
              width={"10%"}
              src={process.env.REACT_APP_API_URL + img_review}
            />
          </Card.Footer>
        ) : (
          <div className="null_img"></div>
        )}
      </Card>
    </>
  );
};
export default ReviewUI;
