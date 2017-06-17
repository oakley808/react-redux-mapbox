/*
 *
 * Map
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import selectMapViewport from './selectors';
import { onChangeViewport } from 'redux-map-gl'; // action creator
import MapGL, { ChoroplethOverlay } from 'react-map-gl';
import window from 'global/window';
import mapboxgl from 'mapbox-gl';

const mapStyles = Immutable.fromJS({
  version: 8,
  name: 'Generic raster source style',
  glyphs: 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf',
  sprite: 'mapbox://sprites/mapbox/bright-v8',

  sources: {
    'mapbox-streets': {
      type: 'raster',
      url: 'mapbox://mapbox.streets',
      tileSize: 256,
    },
    'mapbox-vectors': {
      type: 'vector',
      url: 'mapbox://mapbox.mapbox-streets-v6',
    },
    // 'mapbox-satellite': {
    //   type: 'raster',
    //   url: 'mapbox://mapbox.satellite',
    //   tileSize: 256,
    // },
    // maine: {
    //   type: 'geojson',
    //   data: {
    //     type: 'Feature',
    //     geometry: {
    //       type: 'Polygon',
    //       coordinates: [[
    //         [-67.13734351262877, 45.137451890638886],
    //         [-66.96466, 44.8097],
    //         [-68.03252, 44.3252],
    //         [-69.06, 43.98],
    //         [-70.11617, 43.68405],
    //         [-70.64573401557249, 43.090083319667144],
    //         [-70.75102474636725, 43.08003225358635],
    //         [-70.79761105007827, 43.21973948828747],
    //         [-70.98176001655037, 43.36789581966826],
    //         [-70.94416541205806, 43.46633942318431],
    //         [-71.08482, 45.3052400000002],
    //         [-70.6600225491012, 45.46022288673396],
    //         [-70.30495378282376, 45.914794623389355],
    //         [-70.00014034695016, 46.69317088478567],
    //         [-69.23708614772835, 47.44777598732787],
    //         [-68.90478084987546, 47.184794623394396],
    //         [-68.23430497910454, 47.35462921812177],
    //         [-67.79035274928509, 47.066248887716995],
    //         [-67.79141211614706, 45.702585354182816],
    //         [-67.13734351262877, 45.137451890638886],
    //       ]],
    //     },
    //   },
    // },
    myGeojsonPoints: {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [{
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-77.03238901390978, 38.913188059745586],
          },
          properties: {
            title: 'Mapbox DC',
            icon: 'monument',
          },
        }, {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-122.414, 37.776],
          },
          properties: {
            title: 'Mapbox SF',
            icon: 'harbor',
          },
        }],
      },
    },
  },
  layers: [
    // {
    //   id: 'myRasterLayer',
    //   type: 'raster',
    //   source: 'mapbox-satellite',
    // },
    {
      id: 'myRasterStreetLayer',
      type: 'raster',
      source: 'mapbox-streets',
    },
    {
      id: 'water',
      source: 'mapbox-vectors',
      'source-layer': 'water',
      type: 'fill',
      paint: { 'fill-color': 'blue' },
    },
    // {
    //   id: 'maine',
    //   source: 'maine',
    //   type: 'fill',
    //   paint: { 'fill-color': 'red', 'fill-opacity': 0.75 },
    // },
    {
      id: 'two-geojson-points',
      source: 'myGeojsonPoints',
      type: 'symbol',
      layout: {
        'icon-image': '{icon}-15',
        'text-field': '{title}',
        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        'text-offset': [0, 0.6],
        'text-anchor': 'top',
      },
      interactive: true,
    },
  ],
});


// <ChoroplethOverlay>
// import ZIPCODES_SF from 'feature-example-sf.json';
// for (const feature of ZIPCODES_SF.features) {
//   feature.properties.value = Math.random() * 1000;
// }
// const ZIPCODES = Immutable.fromJS(ZIPCODES_SF);


class Map extends React.Component { // eslint-disable-line react/prefer-stateless-function
// const Map = ({ mapState, mapStyle, handleChangeViewport }) => {

  constructor(props) {
    super(props);
    console.log('constructor');
  }

  componentDidMount() {
    const map = this.map._map;
    map.addControl(new mapboxgl.NavigationControl());
    map.on('load', () => {
      map.addSource('maine', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [[[-67.13734351262877, 45.137451890638886],
              [-66.96466, 44.8097],
              [-68.03252, 44.3252],
              [-69.06, 43.98],
              [-70.11617, 43.68405],
              [-70.64573401557249, 43.090083319667144],
              [-70.75102474636725, 43.08003225358635],
              [-70.79761105007827, 43.21973948828747],
              [-70.98176001655037, 43.36789581966826],
              [-70.94416541205806, 43.46633942318431],
              [-71.08482, 45.3052400000002],
              [-70.6600225491012, 45.46022288673396],
              [-70.30495378282376, 45.914794623389355],
              [-70.00014034695016, 46.69317088478567],
              [-69.23708614772835, 47.44777598732787],
              [-68.90478084987546, 47.184794623394396],
              [-68.23430497910454, 47.35462921812177],
              [-67.79035274928509, 47.066248887716995],
              [-67.79141211614706, 45.702585354182816],
              [-67.13734351262877, 45.137451890638886]]],
          },
        },
      });

      map.addLayer({
        id: 'maine',
        type: 'fill',
        source: 'maine',
        layout: {},
        paint: { 'fill-color': '#088', 'fill-opacity': 0.8 },
      });
    });
  }

  updateMarkers() {
    // const markers = this.props.markers || {
    //   Atlanta: [-84.388, 33.749],
    //   Sydney: [151.207, -33.8679],
    //   Tokyo: [139.7731286197, 35.6669502038],
    // };
    // this.state.map.featureLayer.setGeoJSON(markers);
  }
  render() {
    const { mapState, mapStyle, handleChangeViewport } = this.props;
    return (
      <MapGL
        {...mapState}
        ref={(c) => { this.map = c; }}
        showZoomControls
        width={window.innerWidth}
        height={500}
        mapStyle={mapStyle}
        mapboxApiAccessToken="pk.eyJ1Ijoib2FrbGV5ODA4IiwiYSI6ImNpeGJ6dTYyejAwNmsydXBkeHYyenVmNzgifQ._rjenpOzyaWXkgOAYyBjNQ"
        onChangeViewport={handleChangeViewport}
      >
        {/* <ChoroplethOverlay
          {...mapState}
          width={window.innerWidth}
          height={500}
          features={ZIPCODES.get('features')}
          dotRadius={4}
          globalOpacity={0.85}
          compositeOperation="screen"
        /> */}
      </MapGL>
    );
  }
}

Map.propTypes = {
  mapState: PropTypes.object,
  mapStyle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Immutable.Map),
  ]),
  handleChangeViewport: PropTypes.func,
};

// const mapStateToProps = selectMap();
const mapStateToProps = (state, ownState) => {
  const mapState = selectMapViewport()(state);
  // const mapStyle = 'mapbox://styles/oakley808/cixdit23t003h2qph8hzixxqs';

  return {
    mapState,
    mapStyle: mapStyles,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleChangeViewport: (arg) => dispatch(onChangeViewport(arg)),
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
