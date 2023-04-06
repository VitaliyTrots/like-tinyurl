const host = process.env.REACT_APP_BACKEND_HOST;

class StatisticApi {
  getStatisticByPeriod(startDate, endDate) {
    return fetch(`${host}/statistic?startDate=${startDate}&endDate=${endDate}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json());
  }

  getStatisticByIp(ip, startDate, endDate) {
    return fetch(`${host}/statistic/ip/${ip}?startDate=${startDate}&endDate=${endDate}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json());
  }

  getStatisticByUrl(url) {
    return fetch(`${host}/statistic/${url}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json());
  }
}

// eslint-disable-next-line
export default new StatisticApi();
