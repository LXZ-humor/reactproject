import ajax from "./ajax"
export const loginRequest =(username,password)=>{
   return ajax.post("/login",{username,password})
}
export const reqAddCategory =(categoryName) =>{
   return ajax.post("/AddCategory",{categoryName})
}