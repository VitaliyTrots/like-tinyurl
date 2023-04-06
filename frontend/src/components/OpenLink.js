import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import './OpenLink.css';

import urlApi from '../api/url';

const OpenLink = () => {
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [error, setError] = useState('');

  const onChangeShortenedUrl = (event) => {
    setShortenedUrl(event.target.value);
  }

  const openLink = async () => {
    setError('');
    const link = shortenedUrl.split('/').reverse()[0];
    const response = await urlApi.getOriginalUrl(link);
    if (response.data) {
      window.location.href = response.data;
    } else {
      setError(response.error);
    }
  }

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Open link</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter shortened URL"
          value={shortenedUrl}
          onChange={onChangeShortenedUrl}
        />
        {
          !!error
          && <Form.Text className="text-error">
            {error}
          </Form.Text>
        }
      </Form.Group>

      <Button
        variant="primary"
        onClick={openLink}
      >
        Open link
      </Button>
    </Form>
  )
}

export default OpenLink
