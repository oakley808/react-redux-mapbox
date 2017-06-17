import { createSelector } from 'reselect';

/**
 * Direct selector to the map state domain
 * Returns a plain js object (viewport) which contains an immutable Map.
 */
const selectMapDomain = () => (state) => state.get('map');


/**
 * Other specific selectors
 */
// Grab the map.viewport substate
// const selectMapViewportSubdomain = () => (state) => state.get('map').viewport;
const selectMapViewportSubdomain = () => createSelector(
  selectMapDomain(),
  (substate) => substate.viewport
);

/**
 * Default selector used by Map
 */
const selectMapViewport = () => createSelector(
  selectMapViewportSubdomain(),
  (substate) => substate.toJS()
);

export default selectMapViewport;
export {
  selectMapDomain,
  selectMapViewportSubdomain,
};
