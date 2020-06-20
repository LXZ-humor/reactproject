import React, { Component } from 'react'
import { Upload, Icon, Modal,message } from 'antd';
import {reqDeleteImg} from "../../api/aj"
function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
export default class PicturesWall extends Component {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [
          // {
          //   uid: '-1',
          //   name: 'image.png',
          //   status: 'done',
          //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          // }
        ]
      };
      handleCancel = () => this.setState({ previewVisible: false });
      handlePreview = async file => {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
    
        this.setState({
          previewImage: file.url || file.preview,
          previewVisible: true,
        });
      };
    
      handleChange = async({ file,fileList }) => {
      if(file.status === "done"){
          // console.log(file)
          file = fileList[fileList.length-1]
          const {name,url}=file.response.data
          file.name=name;
          file.url = url;
          
      }
      else if(file.status === "removed"){
        let delName = file.url.substr(file.url.lastIndexOf("/")+1)
        // console.log(delName)
        const result = await reqDeleteImg(delName)
        if (result.status === 0) {
          message.success('删除后台上传图片成功!')
      } else {
          message.error('删除后台图片失败!')
      }
      }
        this.setState({ fileList })
      };
    
      render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
          <div>
            <Icon type="plus" />
            <div className="ant-upload-text">Upload</div>
          </div>
        );
        return (
            <div className="clearfix">
            <Upload
              action="/goods/uploading/img"
              listType="picture-card"
              name = "images"
              fileList={fileList}
              onPreview={this.handlePreview}
              onChange={this.handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </div>
        )
    }
}
