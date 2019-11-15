import { fromJS } from 'immutable';

export default fromJS({
  version: 8,
  sources: {
    rasterTile: {
      type: 'raster',
      tiles: [
        // '/static/map/tile.{z}.{x}.{y}.png',
        // process.env.APP_ENV === white
        //   ? './whiteTile/tile.{z}.{x}.{y}.png'
        //   : './tile/tile.{z}.{x}.{y}.png',
        // https://api.mapbox.com/styles/v1/alan1034/ck2uga3o502731cp7yl74ov2w.html?
        // fresh=true&title=view&access_token=pk.eyJ1IjoiYWxhbjEwMzQiLCJhIjoiY2sybW9vZGpwMGs1YjNobzZjbDB6ZmpoYiJ9.ZD6hL40zjBV9sk_yWmzFiw
        // #8.2/38.025671/114.539675/0
        // 'http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
        'https://api.mapbox.com/styles/v1/alan1034/ck2uga3o502731cp7yl74ov2w/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYWxhbjEwMzQiLCJhIjoiY2sybW9vZGpwMGs1YjNobzZjbDB6ZmpoYiJ9.ZD6hL40zjBV9sk_yWmzFiw',
      ],
      tileSize: 256,
    },
  },
  layers: [
    {
      id: 'raster-layer',
      type: 'raster',
      source: 'rasterTile',
    },
  ],
});
