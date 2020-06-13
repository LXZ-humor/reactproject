import React,{Component} from "react"

import { Form, Input } from 'antd'

 class CategoryForm extends Component{
    render(){
        const {getFieldDecorator} = this.props.form
        return(
            <Form>
            <Form.Item>
                {
                    getFieldDecorator('categoryName', {
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