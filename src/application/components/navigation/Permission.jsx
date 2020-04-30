import featureList from '../../feaures';

import { connect } from 'react-redux';


var Permission = props => {
    var role = "default";
    if(props.subscription_type) {
        role = props.subscription_type;
    }
    console.log(role);
    var features = featureList[role];

    if(features.includes(props.feature)) {
        return props.children;
    }
    if(props.alt) {
        return props.alt;
    }
    return null;
}

var storeToProps = (store, props) => {
    return {
        subscription_type: store.user.subscription
    }
};

export {
    Permission
};
export default connect(storeToProps)(Permission);