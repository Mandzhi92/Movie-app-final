import { Space, Spin } from 'antd';
import React from 'react';
import 'antd/dist/antd.min.css';
import './Spinner.css';

const Spinner = () => (
  <div className="example">
    <Space size="middle">
      <Spin size="large" />
    </Space>
  </div>
);
export default Spinner;
