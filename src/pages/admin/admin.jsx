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
import Users from "../user/index"
const { Footer, Sider, Content } = Layout;

export default class Admin extends Component{
    render(){
        // const local = localid.isLogin;
        // console.log(local)
        // if(!local._id){
        //     return <Redirect to='/login' />
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
                        <Route path="/users" component={Users}/>  
                        <Redirect to="/home"/>
                    </Switch>
                </Content>

                <Footer style={{ textAlign: 'center', color: '#7B68EE', borderTop: '1px solid black'}}>本系统推荐使用最新版谷歌浏览器以获得最佳浏览效果</Footer>
            </Layout>
        </Layout>
        
            
        )
    }
}