import { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const ROUTE_CHANGE_EVENT = "ROUTE_CHANGE_EVENT";
const ROUTE_UPDATE_EVENT = "ROUTE_UPDATE_EVENT";

function buildFullRoute(base, params) {
    let paramsString = '';

    if (params && params.length > 0) {
        params.forEach( (param) => {
            let keys = Object.keys(param);
            let paramId = keys[0]
            paramsString = paramsString + '/' + paramId + '=' + param[paramId];
        })
    }

    return `/${base}${paramsString}`;
}

function replaceParam(param, route) {
    let keys = Object.keys(param);
    let paramId = keys[0];
    let newParamValue = `${paramId}=${param[paramId]}`;
    let paramStartIndex = route.indexOf(paramId);

    if (paramStartIndex > -1) {
        let paramEndIndex = route.indexOf('/', paramStartIndex);
        let existingParamValue = '';

        if (paramEndIndex > -1) {
            existingParamValue = route.substring(paramStartIndex, paramEndIndex);
        } else {
            existingParamValue = route.substring(paramStartIndex);
        }        

        route = route.replace(existingParamValue, newParamValue);
    } else {
        route = `${route}/${newParamValue}`;
    }
    
    return route;
}

function updateRouteParams(params, currentRoute) {
    let updatedRoute = currentRoute;
 
    if (params.length > 0) {
        params.forEach( (param) => {
            updatedRoute = replaceParam(param, updatedRoute);
        })
    }

    return updatedRoute;
}

class ReactRouterEventManager extends Component {
    constructor(props) {
        super(props);

        let { subscribe, history } = props;

        subscribe(ROUTE_CHANGE_EVENT, (eventObj) => {
            if(eventObj && eventObj.route && eventObj.route.base) {
                let route = buildFullRoute(eventObj.route.base, eventObj.route.params);
                history.push(route);
            }
        });
        subscribe(ROUTE_UPDATE_EVENT, (routeChanges) => {
            if (routeChanges && routeChanges.params) {
                let route = updateRouteParams(routeChanges.params, history.location.pathname);
                history.push(route);
            }
        });
    }

    render() {
        return null;
    }
}
export default withRouter(ReactRouterEventManager);

ReactRouterEventManager.propTypes = {
    subscribe: PropTypes.func,
    history: PropTypes.object
};