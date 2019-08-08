import React, { Component } from 'react';
import { Route, HashRouter as Router } from "react-router-dom";

import EventManager from './EventManager';
import ReactRouterEventManager from '../../src/ReactRouterEventManager';

class ReactRouterEventManagerTest extends Component {
    eventManager = new EventManager();

    constructor(props) {
        super(props);
        this.onChangeTargetRoute = this.onChangeTargetRoute.bind(this);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.onChangeFilter = this.onChangeFilter.bind(this);
        this.onChangeServiceType = this.onChangeServiceType.bind(this);
        this.onChangeResourceType = this.onChangeResourceType.bind(this);
        this.onChangeOperationType = this.onChangeOperationType.bind(this);

        this.state = {
            base: undefined,
            entityTypes: [],
            searchText: undefined,
            filterText: undefined
        }
    }

    changeRoute() {
        let params = [];

        if (this.state.entityTypes.length > 0) {
            params.push({entityTypes: this.state.entityTypes})
        }

        if (this.state.searchText) {
            params.push({searchId: this.state.searchText})
        }

        if (this.state.filterText) {
            params.push({filterId: this.state.filterText})
        }

        let eventObj = {
            route: {
                base: this.state.base,
                params: params
            }
        };

       this.eventManager.trigger("ROUTE_CHANGE_EVENT", eventObj);
    }

    updateRoute() {
        let params = [];

        if (this.state.entityTypes.length > 0) {
            let entityTypeString = "";
            this.state.entityTypes.forEach( (type) => {
                if (entityTypeString.length === 0) {
                    entityTypeString = type;
                } else {
                    entityTypeString = entityTypeString + ',' + type;
                }
            });
            params.push({entityTypes: entityTypeString});
        }

        if (this.state.searchText) {
            params.push({searchId: this.state.searchText})
        }

        if (this.state.filterText) {
            params.push({filterId: this.state.filterText})
        }

        let eventObj = {
            params: params
        };
        
        this.eventManager.trigger("ROUTE_UPDATE_EVENT", eventObj);
    }

    onChangeTargetRoute(event) {
       this.setState({
            base: event.target.value
        });
    }

    onChangeSearch(event) {
        this.setState({
            searchText: event.target.value
        });
    }

    onChangeFilter(event) {
        this.setState({
            filterText: event.target.value
        });
    }

    onChangeServiceType(event) {
        let entityTypes = this.state.entityTypes;

        if (event.target.checked && !entityTypes.includes('service')) {
            entityTypes.push('service');

            this.setState({
                entityTypes: entityTypes
            });
        } else if (!event.target.checked) {
            let updatedEntityTypes = [];
           
            entityTypes.forEach( (entry) => {
                if (entry !== 'service') {
                    updatedEntityTypes.push(entry);
                }
            })

            this.setState({
                entityTypes: updatedEntityTypes
            });
        }
    }

    onChangeResourceType(event) {
        let entityTypes = this.state.entityTypes;

        if (event.target.checked && !entityTypes.includes('resource')) {
            entityTypes.push('resource');

            this.setState({
                entityTypes: entityTypes
            });
        } else if (!event.target.checked) {
            let updatedEntityTypes = [];
           
            entityTypes.forEach( (entry) => {
                if (entry !== 'resource') {
                    updatedEntityTypes.push(entry);
                }
            })

            this.setState({
                entityTypes: updatedEntityTypes
            });
        }
    }

    onChangeOperationType(event) {
        let entityTypes = this.state.entityTypes;

        if (event.target.checked && !entityTypes.includes('operation')) {
            entityTypes.push('operation');

            this.setState({
                entityTypes: entityTypes
            });
        } else if (!event.target.checked) {
            let updatedEntityTypes = [];
           
            entityTypes.forEach( (entry) => {
                if (entry !== 'operation') {
                    updatedEntityTypes.push(entry);
                }
            })

            this.setState({
                entityTypes: updatedEntityTypes
            });
        }
    }
 
    buildRouteComponents() {
        let routes = [];

        routes.push(
            <Route
                key='route1'
                path='/route1/:entityType/:searchId/:filterId?'
                exact={false}
                component={ () => (
                    <p>Route 1</p> 
                )}
            />
        );

        routes.push(
            <Route
                key='route2'
                path='/route2/:entityType/:searchId/:filterId?'
                component={ () => (
                    <p>Route 2</p> 
                )}
            />
        );

        return routes;
    }

    render() {
        let routeComponents = this.buildRouteComponents();

        return (
            <Router>
                <ReactRouterEventManager eventManager={this.eventManager} />
                <Route
                    key="landingPage"
                    path="/"
                    component={ () => (
                        <div>
                            <label>Route:</label> <select value={this.state.base ? this.state.base : 'noSelection'} onChange={this.onChangeTargetRoute} >
                                <option key='noSelection' disabled value="noSelection">Select A Route</option>
                                <option key="route1" value="route1">Route 1</option>
                                <option key="route2" value="route2">Route 2</option>
                            </select>&nbsp;

                            <br /><br />

                            <label>Entity Types:</label><br />
                            <input type="checkbox" key='service' name="entityType" value="service" checked={this.state.entityTypes.includes('service')} onChange={this.onChangeServiceType} />Service <br />      
                            <input type="checkbox" key='resource' name="entityType" value="resource" checked={this.state.entityTypes.includes('resource')} onChange={this.onChangeResourceType} />Resource <br />      
                            <input type="checkbox" key='operation' name="entityType" value="operation" checked={this.state.entityTypes.includes('operation')} onChange={this.onChangeOperationType} />Operation

                            <br /><br />
                            
                            <label>Search String:</label> <input type="text" key='searchInput' value={this.state.searchText} onChange={ this.onChangeSearch } />&nbsp;

                            <br /><br />
                            
                            <label>Filter String:</label> <input type="text" key='filterInput' value={this.state.filterText} onChange={ this.onChangeFilter } />&nbsp;

                            <br /><br />
                            
                            <button key='changeRoute' onClick={() => this.changeRoute()}>Change Route</button>&nbsp;
                            <button key='updateRoute' onClick={() => this.updateRoute()}>Update Existing Route Params</button>
                            
                            <hr />
                            {routeComponents}
                        </div> 
                    )}
                />
            </Router>            
        );
    }
}
export default ReactRouterEventManagerTest;