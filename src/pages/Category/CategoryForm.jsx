import React,{Component} from "react"

import { Form, Input,Select } from 'antd'
const { Option } = Select;
 class CategoryForm extends Component{
     componentWillMount(){
        
         this.props.getForm(this.props.form)
        
     }
    render(){
        const {getFieldDecorator} = this.props.form
        let {name,flag,categorys,_id} = this.props
        
        if(flag){
           
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
                <Form.Item>
                    {
                        getFieldDecorator('_id', {
                            initialValue: _id,
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
        return(
            <Form>
                 <Form.Item>
                {
                    getFieldDecorator('parentId', {
                        initialValue: '',
                        rules: [
                            { required: true,message: '分类名称必须输入!'}
                        ]     
                    })(
                        <Select value="0" key="0">
                                <Option value="0" key="0">--请选择父类--</Option>
                               {
                                   categorys.map(item =><Option value={item._id} key={item._id}>{item.name}</Option>)
                               }
                        </Select>
                    ) 
                }
            </Form.Item>
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