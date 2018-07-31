import React, { Component } from 'react';
import SiderDemo from './page/home/home';
import { Router, Route } from 'react-router-dom'
import createHistory from 'history/createHashHistory';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import './App.css';

const history = createHistory()
class App extends Component {
  render() {
    return (
      <LocaleProvider locale={zhCN}>
        <Router className="App" history={history}>
          <SiderDemo/>
        </Router>
      </LocaleProvider>
    );
  }
}
export default App;
