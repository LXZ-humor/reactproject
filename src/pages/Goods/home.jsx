import React,{Component} from "react"
import { Card,Table,Select,Input,Button, Icon} from 'antd';
import {reqGoodsList,reqSetstatus} from "../../api/aj"
import MyButton from "../../component/my-button/index"
import "./home.less"
const { Option } = Select;
const { Search } = Input
export default class Home extends Component{
    state = {
        loading:true,
        dataSource:[] //显示所有商品
    }
    componentWillMount(){
        this.getColumns()
    }
    componentDidMount(){
        this.getDataSource()
    }
    // 商品状态
    productStatus=(prodouct)=>{
        let {dataSource} = this.state
        
        if(prodouct.status ===1){
           return (<MyButton onClick={()=>{this.Soldout(prodouct)}}>已上架</MyButton>)
        }else{
            return (<MyButton onClick={()=>{this.Soldout(prodouct)}}>已下架</MyButton>)
        }
        
    }
    // (当前上架)换成下架
    Soldout = async(product)=>{
        
        let {_id,status} = product
       
        let result = await reqSetstatus(_id,status);
        this.getDataSource()
       
       
        

    }
    // 操作
    optHandle =(product) =>{
       return (
            <span> 
                <MyButton onClick={()=>{this.props.history.push("/goods/addUpdata")}} flag={true} data={product}>查看详情</MyButton>
                <MyButton onClick={()=>{console.log(product)}}>删除</MyButton>
            </span>
       )
    
    }
   
    // 获取字段
    getColumns =()=>{
        this.columns  = [
            {
                title: "商品名称",
                dataIndex: "name"
            },
            {
                title: "商品描述",
                dataIndex: "desc"
            },
            {
                title: "商品价格",
                dataIndex: "price",
                render: price => '￥' + price
            },
            {
                title: "商品状态",
                width: 100,
                // dataIndex: "status",
                render:this.productStatus
               
            },
            {
                title: "操作",
                width: 200,
                render:  this.optHandle
            }
        ]
    }
    // 获取内容
    getDataSource =async()=>{
       
        let result = await reqGoodsList()
       
        if(result.status === 0){
            let list = result.resdata
            
           this.setState({ loading:false,dataSource:list})
        }
    }
    render(){
        const {loading,dataSource,total} = this.state
        
        const title = (
            <span>
                <Select style={{width:100}}>
                    <Option value="0">名称</Option>
                    <Option value="1">分类</Option>
                </Select>
                &nbsp;&nbsp;
                <Search  style={{width:200}}/>
                &nbsp;
                <Button>搜索</Button>
            
            </span>
        )
        const extraButton = (
            <Button onClick={()=>{
                
                this.props.history.push("/goods/addUpdata")
            }}>
                <Icon type="plus"/>
                添加商品
            </Button>
        )
        return(
            
            <div>
            <Card title={title} extra={extraButton} className="Card">
            <Table 
                    dataSource={dataSource} 
                    loading = {loading}
                    columns={this.columns}
                    rowKey="_id"
                    pagination={{ defaultPageSize: 4, showQuickJumper: true }}
                   
                    />
                    
            </Card>
            
          </div>
        )
    }
}