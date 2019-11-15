import React, { Component } from 'react';
import DeckGL from 'deck.gl';
import { ScatterplotLayer, GeoJsonLayer, TextLayer } from '@deck.gl/layers';
import { ArcLayer } from 'deck.gl';
import { StaticMap } from 'react-map-gl';
import mapStyle from './mapStyle.js';
import styles from './index.less';

const scatterplotLayer = new ScatterplotLayer({
  id: 'my-scatterplot',
  type: ScatterplotLayer,
  data: [{ position: [114.5333000002, 38.03568000023], size: 3000 }],
  getPosition: (d) => d.position,
  getRadius: (d) => d.size,
  getColor: [255, 0, 0]
});

const geoJsonLayer = new GeoJsonLayer({
  id: 'station-border-layer',
  data: {
    // ...policeStationGeoJson,
    type: "FeatureCollection",
    features: [
      // {
      //   "type": "Feature",
      //   "properties": {
      //     "name": null,
      //     "station": "Lake Merritt (LAKE)"
      //   },
      //   "geometry": {
      //     "type": "Polygon",
      //     "coordinates": [
      //       [
      //         [
      //           [114.5333000002, 38.03568000023],
      //           [114.504, 38.13],
      //           [114.511, 38.131],
      //           [114.518, 38.13],
      //           [114.531, 38.126],
      //           [114.532, 38.127],
      //           [114.538, 38.124]
      //         ]
      //       ]
      //     ]
      //   }
      // },
      {
      "id": "330127530000",
      "type": "Feature",
      "geometry": {
        "type": "MultiPolygon",
        "coordinates": [
          [
            [
              [114.5333000002, 38.03568000023],
              [114.504,38.13],
              [114.511,38.131],
              [114.518,38.13],
              [114.531,38.126],
              [114.532,38.127],
              [114.538,38.124],
              [114.5333000002, 38.03568000023],
            ]
          ],],
      }
    }
  ],
  },
  filled: true,
  getFillColor: [255, 0, 0],
  stroked: true,
  opacity: 1,
  lineWidthMinPixels: 2,
  getLineColor: [160, 160, 180, 200] ,
  getLineWidth: 2,
});

class Map extends Component {

  // componentDidMount(){
  // }

  textLayer = new TextLayer({
    id: 'text-layer',
    data: [{
      "name": "Lafayette (LAFY)中文1",
      "code": "LF",
      "address": "3601 Deer Hill Road, Lafayette CA 94549",
      "entries": "3481",
      "exits": "3616",
      "coordinates": [114.5333000002, 38.03568000023]
    }, {
        "name": "Lafayette (LAFY)中文2",
        "code": "LF",
        "address": "3601 Deer Hill Road, Lafayette CA 94549",
        "entries": "3481",
        "exits": "3616",
        "coordinates": [114.511, 38.131]
      },],
    characterSet: `L中文1`.split(''),// 正则过滤出现在文本里的字符，如果要显示中文也要设置这个
    pickable: true,
    getPosition: d => d.coordinates,
    getText: d => { console.log(d);return(d.name)},
    getSize: 32,
    getAngle: 0,
    getTextAnchor: 'middle',
    getAlignmentBaseline: 'center',
    onHover: info => this.setState({
      hoveredObject: info.object,
      pointerX: info.x,
      pointerY: info.y
    })
    // onHover: info => this.setTooltip(info.object, info.x, info.y)
  });

  setTooltip(object, x, y) {
    const el = document.getElementById('deck-tooltip');
    console.log(el)
    if (object) {
      el.innerHTML = object.message;
      el.style.display = 'block';
      el.style.left = x + 'px';
      el.style.top = y + 'px';
    } else {
      el.style.display = 'none';
    }
  }

  renderTooltip=()=> {
    const { hoveredObject, pointerX, pointerY } = this.state || {};
    console.log(hoveredObject, pointerX, pointerY)
    return hoveredObject && (
      <div style={{ position: 'absolute', zIndex: 1, pointerEvents: 'none', left: pointerX, top: pointerY }}>
        {hoveredObject.name}
      </div>
    );
  }

  render() {
    const flights = new ArcLayer({
      id: 'flights',
      data: [] // Some flight points
    });
    console.log(`Lafayette (LAFY)中文1`.split(''))
    return (
      <div className={styles.content}>
        {/* <img src={imgs} alt={imgs} /> */}
        <DeckGL
          width={1500}
          height={800}
          useDevicePixels={false}
          controller
          viewState={{
            longitude: 114.5333000002,
            latitude: 38.03568000023,
            zoom: 8.158097360753698,
            minZoom: 1,
            maxZoom: 20,
            // pitch,
            // bearing,
          }}
          // layers={[flights]}
          layers={[scatterplotLayer, geoJsonLayer, this.textLayer]}
        >
          <StaticMap mapStyle={mapStyle} />
          {this.renderTooltip()}
        </DeckGL>
      </div>
    );
  }
}

export default Map;
