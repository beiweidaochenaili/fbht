import { observable, action, runInAction } from "mobx";
import { getduanxinlist, addoutduanxinlist } from "../../api/login"
import { message } from "antd"
import ExportJsonExcel from 'js-export-excel';
class smslist {
    @observable datasource = [];//短信列表数据
    @observable loading = false;//loading

    //获取短信列表
    @action getduanxinlist = () => {
        this.loading=true
        getduanxinlist({ curPage: 1, pageSize: 10 }).then(res => {
            if (res.code == 200) {
                this.loading=false
                res.data.forEach(element => {
                    element.key = element.sid

                });
                this.datasource = res.data
            }
        }).catch(err => {
            console.log(err)
        })

    }
    //导出excel
    @action addoutduanxin = () => {
        addoutduanxinlist().then(res => {
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
                option.fileName = `短信列表` //导出的Excel文件名
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






}

export default smslist
