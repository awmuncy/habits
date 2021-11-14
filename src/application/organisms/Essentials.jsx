import React from 'react';
import { connect } from 'react-redux';

function EssentialsComponent(props) {
  return null;
}

function EssentialsProps(store, props) {
  return {};
}

function EssentialsDispatches(dispatch) {
  return {};
}

const Essentials = connect(EssentialsProps, EssentialsDispatches)(EssentialsComponent);

export {
  Essentials,
  EssentialsComponent,
  EssentialsProps,
  EssentialsDispatches
};
