import React from 'react';
import { Tabs } from 'antd';

function Tab() {
  return (
    <>
      <Tabs
        defaultActiveKey="1"
        className="tabs"
        centered
        items={[
          {
            label: 'Search',
            key: '1',
            children: '',
          },
          {
            label: 'Rated',
            key: '2',
            children: '',
          },
        ]}
      />
    </>
  );
}

export default Tab;
