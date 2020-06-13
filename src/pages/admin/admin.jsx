import React,{Component} from 'react'
import {Redirect,Switch,Route} from "react-router-dom"
import localid from '../../util/menlocal'
import { Layout } from 'antd';
import "./admin.less"
import Navmenu from '../../component/left/navmenu'
import Header from "../../component/header/index"
import Home from "../home/index"
import Category from "../Category/index"
import Goods from "../Goods/index"
const {  Footer, Sider, Content } = Layout;

export default class Admin extends Component{
    render(){
        // const local = localid.isLogin;
        // if(!local._id){
        //    return <Redirect to="/login"/>
        // }
        return (
            <Layout>
            <Sider><Navmenu/></Sider>
            <Layout>
               <Header/>
                <Content>
                    <Switch>
                        <Route path="/home" component={Home}/>
                        <Route path="/goods" component={Goods}/>
                        <Route path="/category" component={Category}/>
                        <Redirect to="/home"/>
                    </Switch>
                </Content>
                <Footer>Footer</Footer>
            </Layout>
        </Layout>
            
        )
    }
}