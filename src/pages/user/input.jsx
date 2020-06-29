import React, { Component } from 'react'
import {Form,Input} from "antd"
 class MyInput extends Component {
     componentWillMount(){
         this.props.getForm(this.props.form)
     }
    render() {
        const {getFieldDecorator} = this.props.form
        let {username} = this.props
        return (
            <Form>
                 <Form.Item>
                    {
                        getFieldDecorator('name', {
                            initialValue:username.username,
                            rules: [
                                { required: true,message: '用户名称必须输入!'}
                            ]     
                        })(
                            <Input type="text" placeholder="请输入用户名称"></Input>
                        ) 
                    }
                </Form.Item>
                <Form.Item>
                    {
                        getFieldDecorator('_id', {
                            initialValue:username._id,
                            rules: [
                                { required: true,message: '分类名称必须输入!'}
                            ]     
                        })(
                            <Input type="hidden"></Input>
                        ) 
                    }
                </Form.Item>
            </Form>
        )
    }
}
export default Form.create()(MyInput)
