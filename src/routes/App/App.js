import React, { Component } from 'react';
import logo from '../../logo.svg';
import Map from "@cbd/react-imap";
import styles from './App.less';

console.log(styles)

class UseStrict extends Component {

  minemap = window.minemap;

componentDidMount(){
  /**
 * 基本地图加载
 * 地图缩放级别限制
 */
 window.minemap.domainUrl = '//minedata.cn';
 window.minemap.dataDomainUrl = '//datahive.minedata.cn';
 window.minemap.spriteUrl = '//minedata.cn/minemapapi/v2.0.0/sprite/sprite';
 window.minemap.serviceUrl = '//minedata.cn/service';
 window.minemap.accessToken = '25cc55a69ea7422182d00d6b7c0ffa93';
 window.minemap.solution = 2365;
  // this.minemap = new this.minemap.Map({
  //   container: "map",
  //   style: "//minedata.cn/service/solu/style/id/2365", /*底图样式*/
  //   center: [116.46, 39.92], /*地图中心点*/
  //   zoom: 10, /*地图默认缩放等级*/
  //   pitch: 0, /*地图俯仰角度*/
  //   maxZoom: 17, /*地图最大缩放等级*/
  //   minZoom: 3  /*地图最小缩放等级*/
  // });
  console.log(this.minemap.Map)
}

  render() {
    return (
      <div className={styles.App}>
        <header className={styles.Appheader}>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          
        </header>
        <Map
          style={{ width: "100%", height: 1000 }}
          initProps={{
            zoom: 14,
            maxZoom: 17,
            minZoom: 3,
            pitch: 40,
            // center: { lng: 120.14, lat: 33.36 },
            center: { lng: 121.4, lat: 31.21 },
          }}
          onMapInit={mapRef => {
            this.mapInstance = mapRef;
            this.mapOriginInstance = mapRef.map;
          }}
        />

      </div>
    );
  }
}

export default UseStrict;
