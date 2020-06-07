import ajax from "./ajax"
export const loginRequest =(username,password)=>{
   return ajax.post("/login",{username,password})
}