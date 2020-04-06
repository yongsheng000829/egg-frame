import React, { Component } from 'react'
import { Route, Switch, Redirect } from "react-router-dom";

export default class Router extends Component {
    render() {
        return (
            <Switch>
                {
                    this.props.routeData.map((item, index) => {
                        if (item.component) {
                            if (item.children) {
                                return <Route key={index} path={item.path} render={props => <item.component routeData={item.children} {...props} />} />;
                            }
                            return <Route key={index} path={item.path} component={item.component} />
                        }
                        return <Redirect exact key={index} path={item.path} to={item.redirect} />;
                    })
                }
            </Switch>
        )
    }
}
