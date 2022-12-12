import { Rating } from "@material-ui/lab";
import React from "react";
import { Card, Col, Image, Row } from "react-bootstrap";
import BadReviewTag from "../Tags/BadReviewTag/BadReviewTag";
import GoodReviewTag from "../Tags/GoodReviewTag/GoodReviewTag";
import SizeReviewTag from "../Tags/SizeReviewTag/SizeReviewTag";
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
  size,
  rate,
  isVk,
  isGoogle,
}) => {
  return (
    <>
      <Card className="review_card">
        <Card.Header>
          <Row>
            <Col className="d-flex flex-row align-items-center">
              {isVk || isGoogle ? (
                <div
                  className="avatar_profile"
                  style={{
                    backgroundImage: `url(${img_user})`,
                  }}
                ></div>
              ) : (
                <div
                  className="avatar_profile"
                  style={{
                    backgroundImage: `url(${
                      process.env.REACT_APP_API_URL + img_user
                    })`,
                  }}
                ></div>
              )}{" "}
              {name_user} {family_user}
            </Col>
            <Col className="d-flex flex-row justify-content-end">
              <Rating
                name="size-large"
                readOnly
                defaultValue={rate}
                size="large"
              />
            </Col>
          </Row>
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
              <SizeReviewTag children={size} />
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
