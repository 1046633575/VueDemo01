//入口文件
import Vue from 'vue'

//按需导入 Mint-UI 中的组件
import { Header } from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.component(Header.name, Header)

//导入 mui 组件
import './lib/mui/css/mui.min.css'

//导入 App 根组件
import app from './App.vue'


var vm = new Vue({
    el: '#app',
    render: c => c(app)
})