import React,{Component} from "react"
import { Menu, Icon, Button } from 'antd';
import {withRouter,Link} from 'react-router-dom'
import logo from '../../assets/img/1.jpg'
import menulist from "../../config/menu.js"
import "./navmenu.less"
import Item from "antd/lib/list/Item";

const { SubMenu } = Menu;
class navmenu extends Component{
    state = {
        collapsed: false,
      };
      toggleCollapsed = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
      };
    // 左边菜单
    menuBar =(menulist)=>{
      return menulist.map(item =>{
       
        if(!item.children){
          return (
            <Menu.Item key={item.key}>
                <Link to={item.key}>
                <Icon type={item.Icon} />
            <span>{item.title}</span>
                </Link>
            </Menu.Item>
          )
        }return(
          <SubMenu
          key={item.key}
          title={
            <span>
                <Icon type={item.Icon} />
                <span>{item.title}</span>
             </span>
             }
             >
               {this.menuBar(item.children)}
            </SubMenu>
       
        )
      })
    }
    // 渲染菜单
    componentWillMount(){
      this.mymenu = this.menuBar(menulist); 
    }
    render(){
     const pathkey = this.props.location.pathname;
   
        return(
            <div className="left-nav">
                <Link to="" className="left-nav-link">
                <img src={ logo } alt=""/>
                    <h1>商城后台</h1>
                </Link>
            <Menu
              defaultSelectedKeys={[pathkey]}
              defaultOpenKeys={['/good']}
              mode="inline"
              theme="dark"
              inlineCollapsed={this.state.collapsed}
            >
             {this.mymenu}
            </Menu>
          </div>
        )
    }
}
export default withRouter(navmenu)