import React, { Component } from 'react'
import { Card,Form, Select, Input, Button, message  } from 'antd';
import {reqAllCategory,reqAddProduct} from "../../api/aj"
import MyButton from "../../component/my-button/index"
import PicturesWall from "./PicturesWall"
import DraftWysiwyg from "./draftWysiwyg"
import "./addUpdata.less"
const { Option } = Select;
const Item= Form.Item;
class addUpdata extends Component {
    state = {
        categorys: []
    }

    constructor(props) {
        super(props)
        // 创建ref容器 
        this.picRef = React.createRef()
        // 创建详情
        this.richText = React.createRef()
    }
    // 处理用户提交
    getcategorys = async () => {
        const result = await reqAllCategory()
        if (result.status == "1") {
            this.setState({
                categorys: result.resdata
            })
        }
    }

    // 自定义商品价格验证器
    validatePrice = (rule, value, callback) => {
        if (value === ''){
            callback('')
        } else if (value * 1 <= 0) {
            callback('价格必须大于0')
        } else {
            callback()
        }
    }

    componentDidMount() {
        this.getcategorys()
    }

    //提交表单统一验证
    handleSubmit = (event) => {
        event.preventDefault()  
        
        // 进行表单的统一验证
        this.props.form.validateFields(async(err, values) => {
            if (!err) {
                const { name, desc, price, categoryId} = values
                const imgs =this.picRef.current.getImgs().toString()
                const detail=this.richText.current.getDetail()
                 let result = await reqAddProduct(name, desc, price, categoryId, imgs, detail)
               if(result.status === 0){
                   message.success(result.mes)
                   this.props.history.push("/goods")
               }else{
                message.error(result.mes)
               }
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form
        const { categorys } = this.state
        const title = (
            <span>
                <span>添加商品</span>
            </span>
        )
        const Item = Form.Item
        const formConfig = {
            labelCol: { span: 2 },
            wrapperCol: { span: 8 }
        }
        return (
            <Card title={title}>
                <Form {...formConfig} onSubmit={this.handleSubmit}>
                    <Item label="商品名称">
                        {getFieldDecorator('name', {
                            initialvalue: '',
                            rules: [{
                                required: true,
                                message: "必须输入商品名称!"
                            }]
                        })(<Input placeholder="商品名称" />)}
                    </Item>
                    <Item label="商品描述">
                        {getFieldDecorator('desc', {
                            initialvalue: '',
                            rules: [{
                                required: true,
                                message: "必须输入商品描述!"
                            }]
                        })(<Input placeholder="商品描述" />)}
                    </Item>

                    <Item label="商品价格">
                        {getFieldDecorator('price', {
                            initialvalue: '',
                            rules: [{
                                required: true,
                                message: "必须输入商品价格!"
                            },
                            {
                                validator: this.validatePrice
                            }
                        ]
                        })(<Input type="number" style={{ width: 150 }} placeholder="商品价格" addonAfter="元" />)}
                    </Item>

                    <Item label="商品分类">
                        {getFieldDecorator('categoryId', {
                            initialvalue: "",
                            rules: [{
                                required: true,
                                message: "必须指定商品分类!"
                            }]
                        })(
                            <Select>
                                <Option value="" key="">--请选择--</Option>
                                {
                                    categorys.map(cate => <Option value={cate._id} key={cate._id}>{cate.name}</Option>)
                                }

                            </Select>
                        )}
                    </Item>

                    <Item label="商品图片">
                        <PicturesWall ref={this.picRef}/>
                    </Item>
                    <Item label="详情"  wrapperCol={{ span: 20}}>
                        <DraftWysiwyg ref={this.richText}/>
                    </Item>
                    <Item label="">
                        <Button type="primary" htmlType="submit">提交</Button>
                    </Item>
                </Form>
            </Card>
        )
    }
}
export default Form.create()(addUpdata)