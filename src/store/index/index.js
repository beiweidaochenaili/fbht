import { observable, action, runInAction } from "mobx";
import { gethome,getStatistics } from "../../api/login"
import { message } from "antd"
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
class indexpage {
    @observable user = {};//保存用户对象数据
    @observable data = {};//保存首页数据1

    //从缓存里面获取用户基本信息
    @action getuser = () => {
        this.user = JSON.parse(sessionStorage.getItem("user"))
    }
    //获取首页数据1
    @action gethome1 = () => {
        gethome().then(res => {
            if (res.code == 200) {
                this.data = res.data
            }
        }).catch(err => {
            console.log(err)
        })
    }
    //获取首页数据2并转换成折线图数据
    @action gethome2 = () => {
        getStatistics().then(res => {
            if (res.code == 200) {
                console.log(res)
                var myChart = echarts.init(document.getElementById('main'));
                const option = {}
                option.xAxis = { data: res.date, boundaryGap: false }
                option.yAxis = {
                    type: 'value'
                }
                var a = []
                var b = []
                for (var i = 0; i < res.datasets.length; i++) {
                    a.push({ name: res.datasets[i].label, type: 'line', data: res.datasets[i].data })
                    b.push(res.datasets[i].label)
                }
                option.series = a
                option.legend = { data: b }
                myChart.setOption(option)
            }
        }).catch(err => {
            console.log(err)
        })
    }
}
export default indexpage;