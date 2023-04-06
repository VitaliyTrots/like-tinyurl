import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';

import statisticApi from '../api/statistic';

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};

const StatisticByIp = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [ip, setIp] = useState('');
  const [data, setData] = useState([]);
  const [isDataReady, setIsDataReady] = useState(false);

  const getStatistic = async () => {
    setIsDataReady(false);
    const response = await statisticApi.getStatisticByIp(
      ip,
      formatDate(startDate),
      formatDate(endDate)
    );
    if (response.data) {
      setData(response.data);
      setIsDataReady(true);
    }
  }

  const onChangeIp = (event) => {
    setIp(event.target.value);
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

      <Form.Group as={Row} className="mb-3" controlId="formIp">
        <Form.Label>Enter IP</Form.Label>
        <Form.Label column sm="2">IP:</Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            placeholder="Enter IP"
            value={ip}
            onChange={onChangeIp}
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
          && <Table striped bordered hover variant="dark" size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>URL</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {data.map((el, idx) => (
                <tr>
                  <td>{idx}</td>
                  <td>{el.url.original}</td>
                  <td>{el.time.slice(0,19)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        }
      </Form.Group>
    </Form>
  )
}

export default StatisticByIp
