import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import './ShortenUrl.css';

import urlApi from '../api/url';

const ShortenUrl = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [isUrlShortened, setIsUrlShortened] = useState(0);
  const [copyButtonText, setCopyButtonText] = useState('Copy to clipboard');

  const onChangeOriginalUrl = (event) => {
    setOriginalUrl(event.target.value);
  }

  const shortenUrl = async () => {
    const response = await urlApi.shortenUrl(originalUrl);
    setIsUrlShortened(response.data ? 1 : 2)
    setShortenedUrl(response.error || `${process.env.REACT_APP_BACKEND_HOST}/${response.data}`);
    setCopyButtonText('Copy to clipboard');
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortenedUrl);
    setCopyButtonText('Copied!');
  }

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formOriginalUrl">
        <Form.Label>Original URL</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter URL"
          value={originalUrl}
          onChange={onChangeOriginalUrl}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formShortenedUrl">
        <Form.Label>Shortened URL</Form.Label>
        {
          isUrlShortened === 0
          && <Form.Control
            type="text"
            placeholder="Shortened URL"
            readOnly
          />
        }
        {
          isUrlShortened === 1
          && <>
            <br/>
            <a href={shortenedUrl}>{shortenedUrl}</a>
            {' '}
            <Button onClick={copyToClipboard}>
              {copyButtonText}
            </Button>
          </>
        }
        {
          isUrlShortened === 2
          && <Form.Control
            style={{color: "red"}}
            type="text"
            value={shortenedUrl}
            readOnly
          />
        }
      </Form.Group>
      <Button
        variant="primary"
        onClick={shortenUrl}
      >
        Shorten
      </Button>
    </Form>
  )
}

export default ShortenUrl
