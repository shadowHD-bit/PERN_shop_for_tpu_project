import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  AiFillFacebook,
  AiFillGoogleCircle,
  AiFillInstagram,
  AiFillTwitterCircle,
  AiFillYoutube,
} from "react-icons/ai";
import "./SocialHeader.scss";

const SocialHeader = () => {
  return (
    <>
      <Row className="top_social">
        <Col>
          <a className="top_social_link" href="http://google.com">
            <AiFillYoutube className="social_icon" size={25}/>
          </a>
        </Col>
        <Col>
          <a className="top_social_link" href="http://google.com">
            <AiFillFacebook className="social_icon" size={25}/>
          </a>
        </Col>
        <Col>
          <a className="top_social_link" href="http://google.com">
            <AiFillTwitterCircle className="social_icon" size={25}/>
          </a>
        </Col>
        <Col>
          <a className="top_social_link" href="http://google.com">
            <AiFillInstagram className="social_icon" size={25}/>
          </a>
        </Col>
        <Col>
          <a className="top_social_link" href="http://google.com">
            <AiFillGoogleCircle className="social_icon" size={25}/>
          </a>
        </Col>
      </Row>
    </>
  );
};
export default SocialHeader;
