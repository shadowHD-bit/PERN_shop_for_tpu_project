import React from "react";
import "./QuestionPage.scss";
import {
  Accordion,
  Col,
  Container,
  ListGroup,
  Row,
  Tab,
} from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";
import { fetchRules } from "../../http/rulesAPI";

export default function () {

    const [question, setQuestion] = useState([])

    useEffect(() => {
        fetchRules().then(data => {
            setQuestion(data.rows)
        })
    }, [])

  return (
    <div className="rules">
      <div className="main_info">
        <Container>
          <Accordion defaultActiveKey="0">

            {
                question?.map(item => (
                    <Accordion.Item eventKey={item.id}>
                    <Accordion.Header>{item.name_rules}</Accordion.Header>
                    <Accordion.Body>
                        {
                            item.information_rules
                        }
                    </Accordion.Body>
                  </Accordion.Item>
                ))
            }
            </Accordion>
        </Container>
      </div>
    </div>
  );
}
