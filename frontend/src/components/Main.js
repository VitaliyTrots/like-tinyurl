import React from 'react';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import './Main.css';

import ShortenUrl from './ShortenUrl';
import OpenLink from './OpenLink';
import Statistic from './Statistic';

const Main = () => {
  return (
    <Tabs
      defaultActiveKey="shortenUrl"
      id="main-tab"
      className="mb-3"
    >
      <Tab
        eventKey="shortenUrl"
        title="Shorten URL"
      >
        <ShortenUrl/>
      </Tab>
      <Tab eventKey="openLink" title="Open link">
        <OpenLink/>
      </Tab>
      <Tab eventKey="statistic" title="Statistic">
        <Statistic/>
      </Tab>
    </Tabs>
  )
}

export default Main
