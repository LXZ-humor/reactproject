import React,{Component} from "react"
import { Card,Table,Select,Input,Button, Icon} from 'antd';
import "./home.less"
const { Option } = Select;
const { Search } = Input
export default class Home extends Component{
    state = {
        loading:false
    }
    componentWillMount(){
        this.getColumns()
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
                // render: price => '￥' + price
            },
            {
                title: "商品状态",
                width: 100,
                dataIndex: "status",
                // render: this.productStatus
            },
            {
                title: "操作",
                width: 200,
                // render: this.optHandle
            }
        ]
    }
    render(){
        const {loading} = this.state
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
                    // dataSource={dataSource} 
                    loading = {loading}
                    columns={this.columns} />;
            </Card>
            
          </div>
        )
    }
}