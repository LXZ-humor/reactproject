import React,{Component} from 'react'
import {BrowserRouter,Route,Switch} from "react-router-dom"
import Admin from './pages/admin/admin'
import Login from './pages/login/login'
export default class App extends Component{
    render(){
        return (
            <BrowserRouter>
              <Switch>
                <Route path="/" component={Admin} />
                {/* <Route path="/login" component={Login} /> */}
              </Switch>
            </BrowserRouter>
  
        )
    }
}