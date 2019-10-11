import React, { PureComponent} from 'react';
import ReactDOM from 'react-dom';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import Routes from './routes';
import * as serviceWorker from './serviceWorker';

export default class Root extends PureComponent {
  render() {
    return (
      <LocaleProvider locale={zhCN}>
        <Routes/>
      </LocaleProvider>
    );
  };
}

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
