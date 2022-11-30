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
import { fetchUserFromStatistic } from "../../http/userAPI";
const UserRegistration = ({ stateAccordion }) => {
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

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUserFromStatistic().then((data) => {
        setUsers(data);
    });
  }, [stateAccordion]);

  const data = {
    labels: users.map(item=> item.month.toString().substring(0, 7)),
    datasets: [
      {
        type: "line",
        label: "Количество зарегистрированных пользователей",
        borderColor: "rgb(155, 99, 132)",
        borderWidth: 2,
        fill: false,
        data: users.map(item => item.totalCount),
      },
    ],
  };

  return (
    <>
      <Chart data={data} />
    </>
  );
};
export default UserRegistration;
