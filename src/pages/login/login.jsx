import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import Admin from "../admin/admin"
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import "./login.less"
import logo from '../../assets/img/1.jpg'
const Item = Form.Item
class Login extends Component {
    handleSubmit = e=>{
        e.preventDefault()
        const form = this.props.form
        // 获取绑定的值

        const val = form.getFieldsValue()
        console.log(val)
        //同一验证validateFields
        form.validateFields((err,result)=>{
            if(!err){
              console.log("登录成功")
            }
        })
    }
    //验证密码
    pwdValidateHandler =(ruls,value,callback)=>{
        value = value.trim();
        console.log(value)
        if(!value){
            callback("密码不能为空")
        }else if(value.length < 4){
            callback("密码长度不能小于4")
        }else if(value.length > 12){
            callback("密码长度不能大于12")
        }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
            callback("密码必须是字母、数字、下划线组成!")
        }else{
            callback(

            )
        }
    
    }
    render() {
        const {getFieldDecorator} = this.props.form
        return (
            <div className="login">
                <div className="login-header">
                        <img src={logo} alt=""/>
                        <h1>海王手办后台管理系统</h1>
                </div>
                <div className="login-content">
                <Form onSubmit={this.handleSubmit} className="login-form">
        <Item>
           {
            //    双向绑定
                getFieldDecorator("username",{
                    initialValue:"admin",
                    rules:[
                        {
                            required:true,
                            whitespace:true,
                            message:"用户名不能为空"
                        },
                        {
                            max:12,
                            message:"用户名不能超出12个长度"
                        },
                        {
                            min:4,
                            message:"用户名长度不能小于4"
                        },
                        {
                            pattern:/^[a-zA-Z][a-zA-Z0-9_]+$/,
                            message:"用户名只能由字母开头，以数字和下划线组成"
                        }
                    ]
                })(<Input
                    prefix={<Icon type="usergroup-add" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="用户名"/>)
           }
            
        </Item>
        <Item>
            {
                getFieldDecorator("password",{
                    rules:[
                        // 自定义规则
                        {validator:this.pwdValidateHandler}
                    ]
                })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="用户密码" 
              autoComplete="off"/>
                )
            }
        </Item>
        <Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
           登陆
          </Button>
         
        </Item>
      </Form>
                </div>
            </div>
        )
    }
}
// 高阶组件
const WrappedLogin = Form.create()(Login);
export default WrappedLogin;
