import { myPost, myGet, myDelete } from "../axios"
//登录
export const login = (params) => {
    return myPost("login", params)
}
export const gethome = (params) => {
    return myPost("select/home")
}
export const getStatistics = (params) => {
    return myPost("select/statistics")
}
//修改登录密码
export const updatepass = (params) => {
    return myPost("select/setpass", params)
}
//获取设备查看页面初始化数据
export const getdevice = (params) => {
    return myPost("select/device", params)
}
//device页面搜索框搜索数据
export const onsearch = (params) => {
    return myPost("search/device", params)
}
//device页面的导出excel表
export const getexcel = (params) => {
    return myPost("admin/device/download")
}
//获取设备的短信列表
export const getshebeiduanxinlist = (params) => {
    return myGet(`select/sms`, params)
}
//删除短信
export const deleteduanxin = (params) => {
    return myGet("delet/sms", params)
}
//删除设备全部短信
export const deleteshebeiduanxin = (params) => {
    return myPost("delet/sms", params)
}
//删除全部短信
export const deleteallduanxin = (params) => {
    return myDelete("delet/sms")
}
//获取通讯录列表
export const getcom = (params) => {
    return myPost("select/communication", params)
}
//获取通讯录
export const getcoms = (params) => {
    return myGet("select/communication", params)
}
//删除设备全部通讯录
export const deleteshebeialltongxunlu = (params) => {
    return myPost("delet/communication", params)
}
//删除全部通讯录
export const deletetongxunluall = (params) => {
    return myDelete("delet/communication", params)
}
//删除通讯录
export const deletetongxunlu = (params) => {
    return myGet("delet/communication", params)
}
//删除全部设备
export const deleteallshebei = (params) => {
    return myDelete('delet/device')
}
//删除单条设备
export const deleteshebei = (params) => {
    return myGet("delet/device", params)
}
//获取短信列表
export const getduanxinlist = (params) => {
    return myPost("select/sms", params)
}
//导出通讯录
export const addouttongxunlu = (params) => {
    return myPost("admin/communication/device", params)
}
//导出短信
export const addoutduanxin = (params) => {
    return myPost("admin/sms/device", params)
}
//导出通讯录列表
export const tongxunlulist = (params) => {
    return myPost("admin/communication/download")
}
//到处短信列表
export const addoutduanxinlist = (params) => {
    return myPost("admin/sms/download")
}
//查询用户
export const getuserlist = (params) => {
    return myPost("admin/select", params)
}
//添加用户
export const adduser = (params) => {
    return myPost("admin", params)
}
//删除用户
export const deleteuser = (params) => {
    return myPost("delet/admin", params)
}
//查看相册
export const getphoto = (params) => {
    return myGet("select/selpic", params)
}
//删除照片
export const deletephoto=(params)=>{
    return myGet("delet/pic",params)
}
//清空相册
export const deleteallphoto=(params)=>{
    return myPost("delet/pic",params)
} 
//导出相册
export const downpic=(params)=>{
    return myPost("select/dowpic",params)
}