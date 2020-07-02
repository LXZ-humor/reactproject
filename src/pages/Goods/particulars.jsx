import React, { Component } from 'react'
import { Card,Form,Input, Button  } from 'antd';
import MyButton from "../../component/my-button/index"
import {reqGoodsParticulars} from "../../api/aj"
import "./addUpdata.less"

const Item= Form.Item;
export default class particulars extends Component {

   state = {
    //    获取商品
       Goods:[]
   }
   componentWillMount(){
       this.getGoodsParticulars()
   }
    //获取详情信息
    getGoodsParticulars=async()=>{
        let id = this.props.match.params.id
        let result = await reqGoodsParticulars(id)
        if(result.status === 0){
           
            let Goods = result.resdata
            this.setState({Goods})
        }
    }   
    render() {
        let {Goods} = this.state
        const formConfig = {
            labelCol: { span: 2 },
            wrapperCol: { span: 8 }
        }
   console.log(Goods)
        return (
            
            <Card>
           
            {
              Goods.map(item=>{
                return(
                <Form {...formConfig} key={item._id}>
                     <Item label="商品名称">
                            <Input placeholder="商品名称" disabled value={item.name} />
                     </Item>
                     <Item label="商品描述">
                            <Input placeholder="商品描述" disabled value={item.desc} />
                     </Item>
                     <Item label="商品价格">
                           <Input  style={{ width: 150 }} placeholder="商品价格" addonAfter="元"  disabled value={item.price}/>
                     </Item>
                     <Item label="商品分类">
                              <Input placeholder="商品分类" disabled value={item.categoryId} />
                     </Item>
                     <Item label="商品细节">
                            <div>{item.detail}</div>
                     </Item>
                    </Form>
                        )
                        
                    })
                }
            
        </Card>
        )
    }
}
