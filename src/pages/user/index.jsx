import React,{Component}  from "react"
import {Card,Table,Modal,message} from "antd"
import MyButton from "../../component/my-button/index"
import {reqUserInfo,reqUpdataInfo,reqdelUser} from "../../api/aj"
import MyInput from "../user/input"
export default class Users extends Component{
    state = {
        // 获取所有用户信息
        userinfo:[],
        loading:true,
        visible: false,
        username:[]
    }
    // 获取字段
    getColumns =() =>{
        this.columns = [
            {
                title: "用户ID",
                dataIndex: "_id"
            },
            {
                title: "用户名称",
                dataIndex: "username"
            },
            {
                title: "用户密码",
                dataIndex: "password"
            },
            {
                title: "操作",
                width: 200,
                render:  this.optHandle
            }
        ]
    }
    // 操作
    optHandle =(info)=>{
        return(
            <span>
                <MyButton onClick={()=>{this.upinfo(info)}}>修改</MyButton>&nbsp;&nbsp;<MyButton onClick={()=>{this.delUser(info)}}>删除</MyButton>
            </span>
        )

    }
    // 修改信息
    upinfo = (info)=>{
       let username = info
       this.setState({visible: true,username});
      
    }
    // 删除用户
    delUser = async(info) =>{
       let {username,_id} = info
       {
           if(window.confirm(`是否删除${username}`)){
               let result = await reqdelUser(_id)
               if(result.status === 0){
                   message.success(result.mes)
                   this.getUserInfo()
               }else{
                   message.error(result.mes)
               }
           }
       }
    }
    handleOk =()=>{
        this.form.validateFields(async(err, values) =>{
            let {name,_id} = values
            let result = await reqUpdataInfo(name,_id)
            if(result.status === 0){
                this.getUserInfo()
            }
        })
        this.form.resetFields()
        this.setState({
            visible: false,
          });
    }
    handleCancel =()=>{
        this.setState({
            visible: false,
          });
    }
    componentWillMount(){
      
        this.getColumns()
    }
    componentDidMount(){
        this.getUserInfo()
    }
    // 获取所有登录信息
    getUserInfo=async()=>{
        let {userinfo,loading} = this.state
        let result = await reqUserInfo()
       if(result.status === 0){
           let userinfo = result.resdata
           this.setState({
                loading:false,
                userinfo
           })
       }else{
                this.setState({loading:true,})
       }
    }
    render(){
        let {loading,userinfo,username}= this.state
        return(
            <div>
            <Card  className="Card">
            <Table 
                    dataSource={userinfo} 
                    
                    columns={this.columns}
                    rowKey="_id"
                    pagination={{ defaultPageSize: 4, showQuickJumper: true }}
                    loading = {loading}
                    />
            <Modal
                title="用户名"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
               <MyInput username={username} getForm={categoryForm => this.form = categoryForm }/>
            </Modal>
            </Card>
            </div>
        )
    }
}
