import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';

import 'antd/dist/antd.css';

import { BrowserRouter as Router } from 'react-router-dom';
import BaseRouter from './routes';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <BaseRouter />
        </Router>
      </div>
    </Provider>
  );
}

export default App;
