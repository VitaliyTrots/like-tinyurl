import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import statisticApi from '../api/statistic';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const initialData = {
  labels: [],
  datasets: [
    {
      label: '',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: []
    }
  ]
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: 'Top 5 most frequent requests for the period'
    }
  }
};

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};

const StatisticByPeriod = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [data, setData] = useState(initialData);
  const [isDataReady, setIsDataReady] = useState(false);

  const getStatistic = async () => {
    setIsDataReady(false);
    const response = await statisticApi.getStatisticByPeriod(
      formatDate(startDate),
      formatDate(endDate)
    );
    if (response.data) {
      setData({
        ...initialData,
        labels: response.data.map(el => el.url.original),
        datasets: initialData.datasets.map(el => {
          return {
            ...el,
            label: 'Number of requests per period',
            data: response.data.map(el => el.count)
          }
        })
      });
      setIsDataReady(true);
    }
  }

  return (
    <Form>
      <Form.Group as={Row} className="mb-3" controlId="formDates">
        <Form.Label>Enter start and end date</Form.Label>
        <Form.Label column sm="2">Start date:</Form.Label>
        <Col sm="10">
          <DatePicker
            selected={startDate}
            onChange={setStartDate}
          />
        </Col>
        <Form.Label column sm="2">End date:</Form.Label>
        <Col sm="10">
          <DatePicker
            selected={endDate}
            onChange={setEndDate}
          />
        </Col>
      </Form.Group>

      <Button
        variant="primary"
        onClick={getStatistic}
      >
        Get statistic
      </Button>

      <Form.Group className="mb-3" controlId="formStatistic">
        {
          isDataReady
          && <Bar
            options={options}
            data={data}
          />
        }
      </Form.Group>
    </Form>
  )
}

export default StatisticByPeriod
