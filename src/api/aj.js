import axios from 'axios'
export const loginRequest =(username,password)=>{
    return axios.post("/login",{username,password}).then(resdata => {
        console.log(resdata)
    })
   
}