import React, { Component } from 'react'
import { Card,Table,Modal, Button,message} from 'antd';
import CategoryForm from "./CategoryForm"
import {reqAddCategory,reqCategorys} from "../../api/aj"
import MyButton  from "../../component/my-button/index"
import "./index.less"



export default class index extends Component {
  state = {
    loading: false, // 是否在请求
        categorys: [], // 所有分类
        subCategorys: [], // 所有二级分类
        allCategorys: [], // 获取所有分类
        showStatus: 0, // 0 不显示  1 显示添加  2显示修改
        name: '', // 当前要显示的分类列表的名称
        _id: '', // 要修改的分类id,
        parentId: '0', // 父级分类id,
        parentName: '' // 父级分类的名称
}

componentWillMount() {
    // 设置表字段信息
    this.getColumns()
}

componentDidMount() {
    this.getCategorys()
}

// 异步获取分类列表
getCategorys = async () => {
    this.setState({ loading: true })
    const { parentId } = this.state 
    const result = await reqCategorys(parentId)
    if (result.status == 1) {
        const categorys = result.data
        this.setState({ loading: false, categorys })
    } else {
        this.setState({ loading: false})
    }
}


// 显示修改分类输入框
showUpdate = (category) => {
    // this.category = category
    // let { name,_id } = category
    
    // // 修改状态
    // this.setState({
    //     showStatus: 2,
    //     name,
    //     _id
    // })
    console.log(category)
    
}


// 获取字段
getColumns = () => {
    this.columns = [
        {
            title: '名称',
            dataIndex: 'name',
        },
        {
            title: '操作',
            width: 200,
            render: category => (
                <span>
                    <MyButton onClick={() => {this.showUpdate(category)}}>修改</MyButton>&nbsp; | &nbsp;
                    <MyButton onClick={() => {this.showSubCategorys(category)}}>查看子分类</MyButton>
                </span>
                )


        }
    ]
}

// 添加分类的回调  
handleOk = () => {
    // 读取用户输入的数据 

    this.form.validateFields(async (err, values) => {
        if (!err) {
            const { name, parentId } = values
            const { showStatus } = this.state
            let result = '';
            if (showStatus == 1) {
              
                // 发送添加分类的请求 
                result = await reqAddCategory(name)
               
                
            }
            // 重置所有表单数据
            this.form.resetFields()
            // 重置父组件的showStatus
            this.setState({ showStatus: 0 })
            
            if (result.status == 1) {
                this.getCategorys()
                message.success('添加分类成功!')
            } else {
                message.error('添加分类失败!')
            }   
        }
    })
}
// 修改父类名称
updateCate=()=>{
    this.form.validateFields((err,values)=>{
      console.log(values)
      this.form.resetFields()
      this.setState({ showStatus: 0 })
    })
}



// 用户取消添加/修改操作  
handleCancel = () => {
    this.setState({ showStatus: 0 })
}
render() {
    let { loading, categorys, showStatus, name, _id, parentId } = this.state


    // 读取更新后的categorys

    const extraButton = (
        <Button type="primary" onClick={() => {
            this.categorys = {}
            this.setState({ showStatus: 1 })
        }}>添加分类</Button>
    )
    return (
        <Card extra={extraButton} >
            <Table
                bordered={true}
                rowKey="_id"
                loading={loading}
                columns={this.columns}
                dataSource={categorys}
                pagination={{ defaultPageSize: 4, showQuickJumper: true }}

            />
            <Modal
                title="添加分类"
                visible={showStatus === 1}
                onOk={this.handleOk}
                onCancel={this.handleCancel}

            >

                <CategoryForm getForm={categoryForm => this.form = categoryForm} categorys={categorys}/>
            </Modal>

            <Modal
            title="修改分类"
            visible={showStatus === 2}
            onOk={this.updateCate}
            onCancel={this.handleCancel}

        >

            <CategoryForm getForm={categoryForm => this.form = categoryForm} name={name} flag={{f: true}} _id={_id}/>
        </Modal>
        </Card>
    )
}
}
