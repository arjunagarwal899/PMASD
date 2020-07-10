import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';

import 'antd/dist/antd.less';
import {notification} from "antd";

import { BrowserRouter as Router } from 'react-router-dom';
import BaseRouter from './routes';


// Default configuration for notifications displayed by the application
notification.config({
    placement: "bottomRight",
    duration: 4,
});


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
