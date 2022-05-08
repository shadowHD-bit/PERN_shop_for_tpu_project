import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Dropdown, ListGroup } from "react-bootstrap";
import "./bar.scss";

const SortBar = observer(({onChange}) => {
    const [valueMethod , setValueMethod] = useState('')
    const handlerChangeSortMethod = (value) => {
        onChange(value)
        setValueMethod(value)
    }

  return (
    // <ListGroup className="mt-3">
    //     <ListGroup.Item variant="danger">Сортировать</ListGroup.Item>
    //     <ListGroup.Item
    //     style={{ cursor: "pointer" }}
    //   >
    //     Сначало дорогие
    //   </ListGroup.Item>
    //   <ListGroup.Item
    //     style={{ cursor: "pointer" }}
    //   >
    //     Сначало дешевые
    //   </ListGroup.Item>
    //   <ListGroup.Item
    //     style={{ cursor: "pointer" }}
    //   >
    //     По названию от А до Я (A - Z)
    //   </ListGroup.Item>
    //   <ListGroup.Item
    //     style={{ cursor: "pointer" }}
    //   >
    //     По названию от Я до А (Z - A)
    //   </ListGroup.Item>
    // </ListGroup>
    <Dropdown>
      <Dropdown.Toggle
        variant="danger"
        id="dropdown-basic"
        style={{ width: "100%" }}
      >
        {valueMethod ? valueMethod : 'Сортировать'}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handlerChangeSortMethod('Сначало дорогие')}>Сначало дорогие</Dropdown.Item>
        <Dropdown.Item onClick={() => handlerChangeSortMethod('Сначало дешевые')}>Сначало дешевые</Dropdown.Item>
        <Dropdown.Item onClick={() => handlerChangeSortMethod('От А до Я (A - Z)')}>От А до Я (A - Z)</Dropdown.Item>
        <Dropdown.Item onClick={() => handlerChangeSortMethod('От Я до А (Z - A)')}>От Я до А (Z - A)</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
});

export default SortBar;
