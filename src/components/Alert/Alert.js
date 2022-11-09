import { Alert } from 'antd';
import React from 'react';
import './alert.css';
import 'antd/dist/antd.min.css';

const App = () => (
  <>
    <Alert message="Ошибка!" description="Отсутствует соединение с интернетом" type="error" />
  </>
);

export default App;
