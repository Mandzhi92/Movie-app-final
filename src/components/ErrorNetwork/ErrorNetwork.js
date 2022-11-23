import React from 'react';
import { Alert } from 'antd';
import './ErrorNetwork.css';
import 'antd/dist/antd.min.css';

const ErrorNetwork = (
  <Alert message="Ошибка! Нет подключения к сети." showIcon type="error" className="error" banner closable />
);

export default ErrorNetwork;
