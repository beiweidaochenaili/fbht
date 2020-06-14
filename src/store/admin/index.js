import { observable, action, runInAction } from "mobx";
import { getuserlist, adduser } from "../../api/login"
import { message } from "antd"
class Admins {
    @observable dataSource = [];//用户列表数据
    @observable visible = false;//控制添加用户模态框
    @observable role = false;//保存添加用户的角色false为普通用户true为超级管理员
    @observable loading = false;//loading
    //获取用户列表
    @action getuserlist = () => {
        this.loading = true
        getuserlist({ curPage: 1, pageSize: 10 }).then(res => {
            if (res.code == 200) {
                this.loading = false
                res.data.forEach(element => {
                    element.key = element.uid
                });
                this.dataSource = res.data
            }
        }).catch(err => {
            console.log(err)
        })
    }
    //控制添加用户模态框显示
    @action addusermodalshow = () => {
        this.visible = true
    }
    //关闭添加用户模态框
    @action addusermodalhide = () => {
        this.visible = false
    }
    //保存角色
    @action hanldeswitch = (checked) => {
        this.role = checked
    }
    //收集表单数据
    @action onFinish = (val) => {
        adduser({ ...val, role: this.role }).then(res => {
            console.log(res)
            if (res.code == 200) {
                message.success("添加成功")
                this.addusermodalhide()
                this.getuserlist()
            }
        }).catch(err => {
            console.log(err)
        })
    }
}
export default Admins;