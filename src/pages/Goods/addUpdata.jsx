import React, { Component } from 'react'
import { Card,Form, Select, Input, Button  } from 'antd';
import MyButton from "../../component/my-button/index"
import PicturesWall from "./PicturesWall"
import "./addUpdata.less"
const { Option } = Select;
const Item= Form.Item;
class addUpdata extends Component {
    render() {
        let {getFieldDecorator} = this.props.form
        const title = (
            <span>
                <MyButton  onClick={()=>{
                    this.props.history.push("/goods")
                }}>返回</MyButton>/&nbsp;&nbsp;
                <span style={{fontSize:15}}>添加商品</span>
            </span>
        )
        return (
        <div>
            <Card title={title} className="Card">
                <Form labelCol={{ span: 2 }} wrapperCol={{ span: 8 }} onSubmit={this.handleSubmit}>
                    <Item label="商品名称">
                        {getFieldDecorator('name', {
                             rules: [{
                                required: true,
                                message: "必须输入商品名称!"
                            }]
                        })(<Input placeholder="商品名称"/>)}
                    </Item>
                    <Item label="商品描述">
                        {getFieldDecorator('desc', {
                             rules: [{
                                required: true,
                                message: "必须输入商品名称!"
                            }]
                        })(<Input placeholder="商品名称"/>)}
                    </Item>
                    <Item label="商品价格">
                        {getFieldDecorator('price', {
                             rules: [{
                                required: true,
                                message: "必须输入商品价格!"
                            }]
                        })(<Input type="number" style={{ width: 150 }} placeholder="商品价格"/>)}
                    </Item>
                    <Item label="商品分类">
                        {getFieldDecorator('categoryId', {
                             rules: [{
                                required: true,
                                message: "必须输入商品名称!"
                            }]
                        })(<Input placeholder="商品名称"/>)}
                    </Item>
                    <Item label="商品图片">
                        <PicturesWall ref={this.picRef}/>
                    </Item>
                    <Item wrapperCol={{ span: 12, }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                    </Item>
                </Form>
            </Card>
            
        </div>
        )
    }
}
export default Form.create()(addUpdata)