import React from "react";
import { Card } from "react-bootstrap";
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
      <Card>
        <b>
          {name_user} {family_user}
        </b>
        <br />
        {img_review != "not img" ? (
          <img width={"10%"} src={process.env.REACT_APP_API_URL + img_review} />
        ) : (
          <div></div>
        )}
        <br />
        Отзыв: {text_review}
        <br />
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
      </Card>
      ;
    </>
  );
};
export default ReviewUI;
