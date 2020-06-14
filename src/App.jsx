import React, { Component } from 'react'
import {message} from 'antd'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Admin from './pages/admin/admin'
import Login from './pages/login/login'

export default class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <Switch>
               
                    {/* <Route path="/login" component={Login}/> */}
                    <Route path="/" component={Admin}/>
                </Switch>
            </BrowserRouter>
        )
    }
}
