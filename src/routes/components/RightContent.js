import React from 'react';
import { Layout } from 'antd';
import Header from '../Header';
import PageHeader from '../Header/PageHeader';
import Routes from '../routes';

class RightContent extends React.Component {

    render() {
        return (
           
              <Layout>
                  <Header fetchingNotices={13} collapsed={true} />
                  <PageHeader />
                  <Routes />
              </Layout>
        );
    }

}
export default RightContent;