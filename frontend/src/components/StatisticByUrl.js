import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import statisticApi from '../api/statistic';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
      text: 'Last 50 requests to the URL'
    },
    scales: {
      xAxes: [{
        ticks: {
          autoSkip: false,
          maxRotation: 90,
          minRotation: 90
        }
      }]
    }
  }
};

const StatisticByUrl = () => {
  const [url, setUrl] = useState('');
  const [data, setData] = useState(initialData);
  const [isDataReady, setIsDataReady] = useState(false);

  const getStatistic = async () => {
    setIsDataReady(false);
    const response = await statisticApi.getStatisticByUrl(encodeURIComponent(url));
    if (response.data) {
      response.data = response.data.reverse();
      setData({
        ...initialData,
        labels: response.data.map(el => el.day),
        datasets: initialData.datasets.map(el => {
          return {
            ...el,
            label: 'Number of requests per day',
            data: response.data.map(el => el.count)
          }
        })
      });
      setIsDataReady(true);
    }
  }

  const onChangeUrl = (event) => {
    setUrl(event.target.value);
  }

  return (
    <Form>
      <Form.Group as={Row} className="mb-3" controlId="formUrl">
        <Form.Label>Enter URL</Form.Label>
        <Form.Label column sm="2">URL:</Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            placeholder="Enter URL"
            value={url}
            onChange={onChangeUrl}
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
          && <Line
            options={options}
            data={data}
          />
        }
      </Form.Group>
    </Form>
  )
}

export default StatisticByUrl
