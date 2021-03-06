/* eslint no-console: "off" */

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
    let newParamValue = param[paramId] ? `${paramId}=${param[paramId]}` : '';
    let paramStartIndex = route.indexOf(paramId);

    if (paramStartIndex > -1) {
        let paramEndIndex = route.indexOf('/', paramStartIndex);
        let existingParamValue = '';

        if (paramEndIndex > -1) {
            existingParamValue = route.substring(paramStartIndex, paramEndIndex);
        } else {
            existingParamValue = route.substring(paramStartIndex);
        }        

        if (newParamValue === '' &&  paramEndIndex > -1) {
            // we are removing the parameter, need to also remove the trailing '/'
            existingParamValue = existingParamValue.concat('/');
        }

        route = route.replace(existingParamValue, newParamValue);
    } else if (newParamValue !== '') {
        route = `${route}/${newParamValue}`;
    }

    if (route.charAt(route.length - 1) === '/') {
        // trim trailing '/'
        route = route.slice(0, -1);
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