import React, { Component } from 'react';
import logo from '../../logo.svg';
import Map, { CanvasLayer,CanvasShape } from "@cbd/react-imap";
import styles from './App.less';

console.log(CanvasLayer)

const { Line, Rect, Polyline, Polygon, Circle, MultiPolygon, AirLine } = CanvasShape;


class UseStrict extends Component {

//   minemap = window.minemap;

// componentDidMount(){
//   /**
//  * 基本地图加载
//  * 地图缩放级别限制
//  */
//  window.minemap.domainUrl = '//minedata.cn';
//  window.minemap.dataDomainUrl = '//datahive.minedata.cn';
//  window.minemap.spriteUrl = '//minedata.cn/minemapapi/v2.0.0/sprite/sprite';
//  window.minemap.serviceUrl = '//minedata.cn/service';
//  window.minemap.accessToken = '25cc55a69ea7422182d00d6b7c0ffa93';
//  window.minemap.solution = 2365;
//   // this.minemap = new this.minemap.Map({
//   //   container: "map",
//   //   style: "//minedata.cn/service/solu/style/id/2365", /*底图样式*/
//   //   center: [116.46, 39.92], /*地图中心点*/
//   //   zoom: 10, /*地图默认缩放等级*/
//   //   pitch: 0, /*地图俯仰角度*/
//   //   maxZoom: 17, /*地图最大缩放等级*/
//   //   minZoom: 3  /*地图最小缩放等级*/
//   // });
// }

  render() {
    return (
      <div className={styles.App}>
        <Map
          style={{ width: "100%", height: 1000 }}
          initProps={{
            // zoom: 14,
            // maxZoom: 17,
            // minZoom: 3,
            // pitch: 40,
            center: { lng: 120.14, lat: 33.36 },
            // center: { lng: 115.43978000045, lat: 38.56895400033 },
          }}
          onMapInit={mapRef => {
            this.mapInstance = mapRef;
            this.mapOriginInstance = mapRef.map;
          }}
        >
          <CanvasLayer >
            <AirLine
              x1={0}
              y1={0}
              lng2={121.5097}
              lat2={31.2389}
              lineDasharray={[5]}
            />
            <Polyline
              path={[
                { lng: 121.552424, lat: 31.122412 },
                { lng: 121.742123, lat: 31.232313 },
                { lng: 121.778877, lat: 31.123213 },
                { lng: 121.504241, lat: 31.012321 },
              ]}
            />
            <Polygon
              path={[
                { lng: 121.676956, lat: 31.312635 },
                { lng: 121.617421, lat: 31.313546 },
                { lng: 121.664164, lat: 31.391421 },
                { lng: 121.697241, lat: 31.321642 },
              ]}
            />
            <Rect
              lng1={121.421597}
              lat1={31.234871}
              lng2={121.232454}
              lat2={31.212441}
            />
            <Line
              lng1={121.224677}
              lat1={31.545657}
              lng2={121.534677}
              lat2={31.243657}
              stroke="rgb(99,9,99)"
              strokeDasharray="5"
              strokeWidth="2"
            />
            <Line
              lng1={121.424677}
              lat1={31.445657}
              lng2={121.534677}
              lat2={31.243657}
              stroke="rgb(9,9,99)"
              strokeDasharray="20"
            />
            <Circle
              cLng={121.524677}
              cLat={31.245657}
              radius={10000}
              stroke="#FF4444"
              fill="#FF4444"
            />
            <Circle
              cLng={121.424677}
              cLat={31.245657}
              toLng={121.457215}
              toLat={31.245821}
            />
          </CanvasLayer>
        </Map>
      </div>
    );
  }
}

export default UseStrict;
