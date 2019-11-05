import React from "react";
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { Layout } from "antd";
import NotFound from './components/exception';
import App from "./App/App";
import Map from "./mapExperiments";

const { Content } = Layout;

export default function RouterConfig() {
  return (
    <div style={{ height: 100 + "%" }}>
      <Router>
        <Content style={{ padding: "24px 24px 0", height: "100%" }}>
          <Switch>
            <Route path="/app" component={App} exact />
            <Route path="/maps" component={Map} exact />
            <Route path="/" component={App} exact />
            <Route path='/404' component={NotFound} />
            <Redirect from='*' to='/404' />
          </Switch>
        </Content>
      </Router>
    </div>
  );
}
