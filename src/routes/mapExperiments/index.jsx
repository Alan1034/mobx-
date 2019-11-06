import React, { Component } from 'react';
import DeckGL from 'deck.gl';
import { ArcLayer } from 'deck.gl';
import { StaticMap } from 'react-map-gl';
import mapStyle from './mapStyle.js';
import styles from './index.less';

class Map extends Component {

  // componentDidMount(){
  // }

  render() {
    const flights = new ArcLayer({
      id: 'flights',
      data: [] // Some flight points
    });

    return (
      <div className={styles.content}>
        {/* <img src={imgs} alt={imgs} /> */}
        <DeckGL width={1920} height={1080} 
        // layers={[flights]}
        >
          <StaticMap mapStyle={mapStyle}/>
        </DeckGL> 
      </div>
    );
  }
}

export default Map;
