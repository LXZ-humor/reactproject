import React, { Component } from 'react'
import {Switch,Route,Redirect} from "react-router-dom"
import Product from "./home"
import AddUpdata from "./addUpdata"
import Particulars from "./particulars"
export default class index extends Component {
   
    render() {
        return (
            
            <Switch>
                <Route path="/goods" exact component={Product}/>
                <Route path="/goods/addUpdata" component={AddUpdata}/>
                <Route path="/goods/particulars/:id" component={Particulars}/>
               <Redirect to="/goods"/>
            </Switch>
           
        )
    }
}
