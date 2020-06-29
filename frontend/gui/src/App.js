import React from 'react';

import 'antd/dist/antd.css';

import { BrowserRouter as Router } from 'react-router-dom';
import BaseRouter from './routes';

function App() {
  return (
    <div>
      <Router>
        <BaseRouter />
      </Router>
    </div>
  );
}

export default App;
