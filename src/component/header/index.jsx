import React,{Component} from 'react'
import {withRouter} from "react-router-dom"
import {Button,Modal} from "antd"
import "./index.less"
import menlocal from "../../util/menlocal"
import local from '../../util/localStorage'
import menuList from "../../config/menu"
import {getDate} from "../../util/gettime"
class Header extends Component{
    state = { 
        visible: false,
        currentTime:getDate(Date.now())
     }
     //渲染之后挂载时间
     componentDidMount(){
       this.timer =setInterval(() => {
            this.setState({
                currentTime:getDate(Date.now())
            })
       }, 1000);
     }
    //  挂载时间之前，清除上一秒
    componentWillMount(){
      clearInterval(this.timer)
    }
      // 获取菜单title
      getTitle = menuList => {
        const path = this.props.location.pathname
     
        menuList.forEach(item => {
            if (item.key === path) {
                this.title = item.title
                return 
            } else if(item.children) {
                this.getTitle(item.children)
            }
        })
    }
    // 退出
    handleCheckout = () => {
      // const that = this
      const { confirm } = Modal
      confirm({
          title: '确认退出吗?',
          onOk: () => {
              // 删除用户登陆信息(1)本地local (2)内存
              local.removelocal();
              menlocal.isLogin = {}

              this.props.history.replace('/login')
          },
          onCancel() { },
      });
  }
    render(){
      let {currentTime} = this.state
     this.getTitle(menuList)
    
     return (
      <div className="header">
          <div className="header-top">
              欢迎, <span style={{ color: '#F00' }}>{menlocal.isLogin.username}</span> &nbsp; &nbsp;
              <Button onClick={this.handleCheckout}>退出</Button>
          </div>
          <div className="header-bottom">
              <div className="header-bottom-left">
                  { this.title }
              </div>
              <div className="header-bottom-right">
                  <span>{ currentTime }</span>
              </div>
          </div>
      </div>
  )
    }
}
export default withRouter(Header)