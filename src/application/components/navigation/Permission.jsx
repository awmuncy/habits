import featureList from '../../feaures';

export default props => {
    var role = localStorage.getItem("userRole") ? localStorage.getItem("userRole") : "default";
    var features = featureList[role];

    if(features.includes(props.feature)) {
        return props.children;
    }
    if(props.alt) {
        return props.alt;
    }
    return null;
}