import React, { Component } from 'react'
import { Card,Table,Modal, Button,message} from 'antd';
import CategoryForm from "./CategoryForm"
import {reqAddCategory,reqCategorys} from "../../api/aj"
import MyButton  from "../../component/my-button/index"
import "./index.less"



export default class index extends Component {
    state = { 
        visible: false,
        loading:false,
        categorys:[],//所有分类
        showStatus: 0 ,// 0 不显示  1 显示添加  2显示修改
        parentId: 0,  //顶级父类为0 
        name: '', // 当前要显示的分类列表的名称
        _id: '' // 要修改的分类id,
       };
        //  渲染之前获取字段
       componentWillMount(){
        this.getcolumns();
    }
        // 渲染之后
        componentDidMount(){
          this.getCategorys();
        }
        // 测试数据获取字段
        getcolumns = ()=>{
            this.columns = [
                {
                title: '名称',
                dataIndex: 'name',
                
                },
                {
                title: '操作',
                width:"200px",
                render:category => (
                  <span>
                      <MyButton onClick={()=>{this.updata(category)}}>修改</MyButton>&nbsp; | &nbsp;
                      <MyButton >查看子分类</MyButton>
                  </span>
                  )
                }
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
              
              if(result.status == 1){
                message.success(result.mes)
                this.getCategorys();
                
              }else if(result.status == 0){
                message.error(result.mes)
             }
             
             }
           }
         })
          this.setState({
            visible: false,
          });
        };
      //  修改
      updataOK = (e)=>{
          let {showStatus} = this.state
          console.log(showStatus)
          
      }
    
      // 获取所有顶级父类
      getCategorys  =async () =>{
        this.setState({loading:true});
        let {parentId} = this.state;
        let result = await reqCategorys(parentId);
        if(result.status == 1){
           const categorys = result.data;
          this.setState({loading:false,categorys})
        }else{
          this.setState({loading:true})
        }
      }
      // 修改当前showStatus状态
      updata =(category)=>{
          this.category = category;
          let {name,_id} = category;
          this.setState({
            showStatus:2,
            name,
            _id
          })
      }
      // 修改
    render() {
      let { loading,categorys,showStatus} = this.state
          const MyButton =(
            <Button type="primary" onClick={()=>{
              this.categorys = {}
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
                    dataSource={categorys}
                     columns={this.columns}
                     bordered={true}
                     rowKey="_id"
                     loading={loading}
                     pagination={{ defaultPageSize: 4, showQuickJumper: true }}
 
            />;
             <Modal
                    title="添加"
                    visible={this.state.visible}
                    onOk={this.updataOK}
                    onCancel={()=>{
                      this.setState({
                        visible: false,
                        showStatus:0
                      });
                    }}
                    >
                   <CategoryForm getForm={categgoryForm =>this.form = categgoryForm }/>
        </Modal> 
        <Modal
                    title="修改"
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
