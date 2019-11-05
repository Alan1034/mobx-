import React, { Component } from 'react';
import DeckGL from 'deck.gl';
import { ArcLayer } from 'deck.gl';
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
        <DeckGL width={1920} height={1080} layers={[flights]} />
      </div>
    );
  }
}

export default Map;
