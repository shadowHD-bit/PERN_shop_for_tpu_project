import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  defaults,
} from "chart.js";
import { useEffect } from "react";
import { useState } from "react";
import { fetchProduct } from "../../http/productAPI";
import { Col, Form, ListGroup } from "react-bootstrap";

const RatingChart = ({ stateAccordion }) => {
  Chart.register(ArcElement);
  Chart.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const [product, setProduct] = useState([]);
  const [productLabel, setProductLabel] = useState([]);
  const [productRating, setProductRating] = useState([]);
  const [color, setColor] = useState([]);

  function get_random_color() {
    var r = function () {
      return Math.floor(Math.random() * 256);
    };
    return "rgb(" + r() + "," + r() + "," + r() + ")";
  }

  useEffect(() => {
    fetchProduct().then((data) => {
      setProduct(data.rows);
      let tempProd = [];
      let tempRat = [];
      let tempColor = [];
      product.map((item) => {
        tempProd.push(item.name);
        tempRat.push(item.rating);
        tempColor.push(get_random_color());
      });
      setProductLabel(tempProd);
      setProductRating(tempRat);
      setColor(tempColor);
    });
  }, [stateAccordion]);

  const data = {
    labels: productLabel,
    datasets: [
      {
        label: "Средний рейтинг товара",
        data: productRating,
        backgroundColor: color,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "График среднего показателя рейтинга на все товары",
      },
    },
  };

  return (
    <>
      <Doughnut options={options} data={data} />
    </>
  );
};
export default RatingChart;
