const host = process.env.REACT_APP_BACKEND_HOST;

class UrlApi {
  shortenUrl(url) {
    return fetch(`${host}/url`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
      })
      .then(response => response.json());
  }

  getOriginalUrl(shortenedUrl) {
    return fetch(`${host}/url/${shortenedUrl}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Methods': '*'
        }
      })
      .then(response => response.json());
  }
}

// eslint-disable-next-line
export default new UrlApi();
