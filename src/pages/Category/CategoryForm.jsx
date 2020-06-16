import React,{Component} from "react"

import { Form, Input } from 'antd'

 class CategoryForm extends Component{
     componentWillMount(){
        
         this.props.getForm(this.props.form)
        
     }
    render(){
        const {getFieldDecorator} = this.props.form
        let {name,flag} = this.props
        if(flag.f){
            return(
                <Form>
                <Form.Item>
                    {
                        getFieldDecorator('name', {
                            initialValue: name,
                            rules: [
                                { required: true,message: '分类名称必须输入!'}
                            ]     
                        })(
                            <Input type="text" placeholder="请输入分类名称"></Input>
                        ) 
                    }
                </Form.Item>
            </Form>
            )
        }
        return(
            <Form>
            <Form.Item>
                {
                    getFieldDecorator('name', {
                        initialValue: '',
                        rules: [
                            { required: true,message: '分类名称必须输入!'}
                        ]     
                    })(
                        <Input type="text" placeholder="请输入分类名称"></Input>
                    ) 
                }
            </Form.Item>
        </Form>
        )
    }
}
export default Form.create()(CategoryForm)