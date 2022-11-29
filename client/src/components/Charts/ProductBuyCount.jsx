import React from "react";
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  ArcElement,
} from "chart.js";
import { useEffect } from "react";
import { useState } from "react";
import { Col, Form, ListGroup } from "react-bootstrap";
import { fetchOrderFromStatistic, fetchOrders } from "../../http/orderAPI";
const ProductBuyCount = ({ stateAccordion }) => {
  ChartJS.register(ArcElement);
  ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController
  );

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrderFromStatistic().then((data) => {
      setOrders(data);
    });
  }, [stateAccordion]);

  console.log(orders);

  const data = {
    labels: orders.map(item=> item.month.toString().substring(0, 7)),
    datasets: [
      {
        type: "line",
        label: "Датасет оформления заказзов",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 2,
        fill: false,
        data: orders.map(item => item.totalCount),
      },
    ],
  };

  return (
    <>
      <Chart data={data} />
    </>
  );
};
export default ProductBuyCount;
