import axios from 'axios'
import qs from "qs"
axios.interceptors.request.use(config =>{
   let {method,data} = config
    if(method.toLowerCase() =="post" && typeof data =="object"){
        config.data = qs.stringify(data)
        
    }
    return config;
})
axios.interceptors.response.use(resdata =>{
    return resdata.data
    
},error => {
    return new Promise(() => {})
}




















)
export default  axios;