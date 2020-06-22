import ajax from "./ajax"
export const loginRequest =(username,password)=>{
   return ajax.post("/login",{username,password})
}
export const reqAddCategory =(categoryName,parentId) =>{
   return ajax.post("/category/addCategory",{categoryName,parentId})
}
export const reqCategorys = (parentId)=>{
    return ajax.post("/category/getParent",{parentId})
}
export const reqUpdataCate = (name,_id)=>{
   return ajax.post("/category/UpdataCate",{name,_id})
}
export const reqAllCategory =()=>{
   return ajax.post("/category/listAll")
}
export const delectCategorys = (_id) =>{
   return ajax.post("/category/delectCate",{_id})
}
export const reqDeleteImg = (name)=>{
   return ajax.post("/goods/uploading/delect",{name})
}
//添加商品
export const reqAddProduct = (name, desc, price, categoryId, imgs, detail) => ajax.post('/goods/uploading/add', { name, desc, price, categoryId, imgs, detail })