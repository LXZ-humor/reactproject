import React, { Component } from 'react'
import { Card,Table,Modal, Button} from 'antd';
import CategoryForm from "./CategoryForm"
import "./index.less"
export default class index extends Component {
    state = { visible: false };
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
        componentWillMount(){
            this.getcolumns();
        }
       

        showModal = () => {
          this.setState({
            visible: true,
          });
        };
      
        handleOk = e => {
          console.log(e);
          this.setState({
            visible: false,
          });
        };
      
        handleCancel = e => {
          console.log(e);
          this.setState({
            visible: false,
          });
        };
      
    render() {
          const MyButton =(
            <Button type="primary" onClick={this.showModal}>
           添加分类
        </Button>
          )
        return (
            
            <div className="cardDiv">
            <Card className="card" extra = {MyButton} >
           
            <Table  
                    //  dataSource={dataSource}
                     columns={this.columns} 
            />;
             <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    >
                   <CategoryForm/>
        </Modal>
            </Card>
          </div>
        )
    }
}
