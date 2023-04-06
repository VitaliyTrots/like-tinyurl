import React from 'react';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import StatisticByPeriod from './StatisticByPeriod';
import StatisticByIp from './StatisticByIp';
import StatisticByUrl from './StatisticByUrl';

const Statistic = () => {
  return (
    <Tabs
      defaultActiveKey="byPeriod"
      id="statistic-tab"
      className="mb-3"
    >
      <Tab
        eventKey="byPeriod"
        title="By period"
      >
        <StatisticByPeriod/>
      </Tab>
      <Tab eventKey="byIp" title="By IP">
        <StatisticByIp/>
      </Tab>
      <Tab eventKey="byUrl" title="By URL">
        <StatisticByUrl/>
      </Tab>
    </Tabs>
  )
}

export default Statistic
