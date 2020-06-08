import React,{Component} from 'react'
import {Redirect} from "react-router-dom"
import localid from '../../util/menlocal'

export default class Admin extends Component{
    render(){
        const local = localid.isLogin;
        if(!local._id){
           return <Redirect to="/login"/>
        }
        return (
            <div>
                <h1>后台首页</h1>
            </div>
        )
    }
}