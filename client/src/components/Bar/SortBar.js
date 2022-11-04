import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Dropdown, ListGroup } from "react-bootstrap";
import { Context } from "../..";
import { fetchProduct } from "../../http/productAPI";
import "./bar.scss";

const SortBar = observer(
  ({ onChange}) => {
    const { product } = useContext(Context);
    const [valueMethod, setValueMethod] = useState("");
    const handlerChangeSortMethod = (value) => {
      fetchProduct(product.selectedType.id, product.selectedBrand.id).then((data) => {
        product.setProduct(data.rows);
        product.setTotalCount(data.count);
      });
      onChange(value);
      setValueMethod(value);
    };

    return (
      <Dropdown>
        <Dropdown.Toggle
          variant="danger"
          id="dropdown-basic"
          style={{ width: "100%" }}
        >
          {valueMethod ? valueMethod : "Сортировать"}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => handlerChangeSortMethod("Сначало дорогие")}
          >
            Сначало дорогие
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => handlerChangeSortMethod("Сначало дешевые")}
          >
            Сначало дешевые
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => handlerChangeSortMethod("От А до Я (A - Z)")}
          >
            От А до Я (A - Z)
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => handlerChangeSortMethod("От Я до А (Z - A)")}
          >
            От Я до А (Z - A)
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
);

export default SortBar;
