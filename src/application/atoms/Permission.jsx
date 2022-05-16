import featureList from '../features.js';

import { connect } from 'react-redux';


let Permission = props => {
  let role = 'default';
  if (props.subscription_type) {
    role = props.subscription_type;
  }
  let features = featureList[role];

  if (features.includes(props.feature)) {
    return props.children;
  }
  if (props.alt) {
    return props.alt;
  }
  return null;
};

let storeToProps = (store, props) => {
  return {
    subscription_type: 'dev'
  };
};

export {
  Permission
};
export default connect(storeToProps)(Permission);
