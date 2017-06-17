/*
 *
 * Map reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION } from './constants';

// matches structure from:
// https://github.com/Willyham/redux-map-gl/blob/2be5d2342b87b3ce121843dd5a38076a3499bb17/src/reducer.js#L26
export const initialMapState = {
  viewport: fromJS({
    latitude: 39.5, // 39.739236,
    longitude: -98.3, // -104.990251,
    bearing: 0,
    zoom: 2,
    isDragging: false,
    startDragLngLat: undefined,
  }),
};

function mapReducer(state = initialMapState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default mapReducer;
