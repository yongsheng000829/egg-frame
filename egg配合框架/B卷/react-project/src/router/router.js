import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';


export default class router extends Component {
    render() {
        return (
            <Switch>
                {
                    this.props.routeData.map((item, index) => {
                        if (item.component) {
                            if (item.children) {
                                return <Route key={index} path={item.path} render={props => <item.component {...props}  routeData={item.children} />} />;
                            }
                            return <Route key={index} path={item.path} component={item.component} />;
                        }
                        return <Redirect key={index} path={item.path} to={item.redirect}></Redirect>
                    })
                }
            </Switch>
        )
    }
}
