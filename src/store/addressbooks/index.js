import { observable, action, runInAction } from "mobx";
import { getcom, deletetongxunluall, tongxunlulist } from "../../api/login"
import ExportJsonExcel from 'js-export-excel';
class Addressbooks {
    @observable datasource = [];//通讯录列表数据
    @observable loading = false;//loading

    //获取通讯录列表
    @action getcom = () => {
        this.loading = true
        getcom({ curPage: 1, pageSize: 10 }).then(res => {
            if (res.code == 200) {
                this.loading = false
                res.data.forEach(element => {
                    element.key = element.uid
                });
                this.datasource = res.data

            }
        }).catch(err => {
            console.log(err)
        })
    }
    //导出所有通讯录
    @action addouttongxunluexcel = () => {
        tongxunlulist().then(res => {
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

                option.fileName = `通讯录列表` //导出的Excel文件名
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
}

export default Addressbooks





















