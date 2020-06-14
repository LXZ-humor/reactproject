import React, { Component } from 'react'
import { Card,Table,Modal, Button} from 'antd';
import CategoryForm from "./CategoryForm"
import {reqAddCategory} from "../../api/aj"
import "./index.less"


export default class index extends Component {
    state = { 
        visible: false,
        loading:false,
        categorys:[],//所有分类
        showStatus: 0 // 0 不显示  1 显示添加  2显示修改

       };
       componentWillMount(){
        this.getcolumns();
    }
        // 测试数据获取字段
        getcolumns = ()=>{
            this.columns = [
                {
                title: '名称',
                dataIndex: 'name',
                key: 'name',
                },
                {
                title: '操作',
                dataIndex: 'address',
                key: 'address',
                },
            ];
        }
       
      // 添加
        handleOk = e => {
         
         this.form.validateFields(async (err,value)=>{
           if(!err){
             let {categoryName} = value;
             let { showStatus } = this.state;
             let result = ""
             if(showStatus == 1){
              //  console.log(categoryName resetFields)
              result = await reqAddCategory(categoryName)
             }
           }
         })
          this.setState({
            visible: false,
          });
        };
    render() {
      let { loading } = this.state
          const MyButton =(
            <Button type="primary" onClick={()=>{
              this.setState({
                visible: true,
                showStatus:1
              });
            }}>
           添加分类
        </Button>
          )
        return (
            
            <div className="cardDiv">
            <Card className="card" extra = {MyButton} >
           
            <Table  
                    //  dataSource={dataSource}
                     columns={this.columns}
                     bordered={true}
                     rowKey="_id"
                     loading={loading} 
            />;
             <Modal
                    title="添加"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={()=>{
                      this.setState({
                        visible: false,
                        showStatus:0
                      });
                    }}
                    >
                   <CategoryForm getForm={categgoryForm =>this.form = categgoryForm }/>
        </Modal>                            
            </Card>
          </div>
        )
    }
}
