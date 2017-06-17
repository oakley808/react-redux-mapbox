/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a neccessity for you then you can refactor it and remove
 * the linting exception.
 */


import React from 'react';
import Map from 'containers/Map';

const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>

      <Map />
    </div>
  );
};
export default HomePage;
