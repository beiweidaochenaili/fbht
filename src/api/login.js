import { myPost } from "../axios"
//登录
export const  login=(params)=>{
    // console.log(params)
    return myPost("login",params)
}
export const gethome=(params)=>{
    return myPost("select/home")
}
export const getStatistics=(params)=>{
    return myPost("select/statistics")
}
//修改登录密码
export const updatepass=(params)=>{
    return myPost("select/setpass",params)
}
//获取设备查看页面初始化数据
export const getdevice=(params)=>{
    return myPost("select/device",params)
}