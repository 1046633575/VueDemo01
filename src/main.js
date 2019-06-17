//入口文件
import Vue from 'vue'
//1.1 导入路由的包
import VueRouter from 'vue-router'
//1.2 安装路由
Vue.use(VueRouter)

//注册vuex
import Vuex from 'vuex'
Vue.use(Vuex)

//每次进入网站，都会调用 main.js 调用时从本地 localStorage 中取出购物车数据
// var car = JSON.parse(localStorage.getItem('car') || [])
var car = JSON.parse(localStorage.getItem('car') || '[]');

var store = new Vuex.Store({
    state: { // this.$store.***
        car: car
        //将 购物车中商品的数据，用一个数组存储，car 中存储商品对象
        // { id:商品的id, count:要购买的数量, price:商品的单价, selected:false }
    },
    mutations: { //this.$store.commit('方法名称','唯一的参数')
        addToCar(state, goodsinfo){
            // 分析：
            // 1.如果购物车中，之前就有这个对应商品了，那么，只需要更新数量
            // 2.如果没有，push 商品到 car 中

            //假设 在购物车中，没有找到对应的商品
            var flag = false;

            state.car.some(item =>{
                if(item.id == goodsinfo.id){
                    item.count += parseInt(goodsinfo.count)
                    flag = true
                    return true
                }
            });

            // 如果最终， 循环完毕，得到的 flag 还是 false，则把商品数据直接push 到购物车
            if(!flag){
                state.car.push(goodsinfo);
            }

            //当更新 car 之后，把 car 存到本地 localStorage 中
            localStorage.setItem('car', JSON.stringify(state.car));
        },
        updateGoodsInfo(state, goodsinfo){
            //修改购物车中商品数量值
            state.car.some(item =>{
                if(item.id == goodsinfo.id){
                    item.count = parseInt(goodsinfo.count)
                    return true
                }
            })
            //当修改完商品数量，把最新的购物车数据，保存到 本地存储中
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        removeForCar(state, id){
            //根据 Id,从 store中的购物车中删除对应的那条商品数据
            state.car.some((item, i) =>{
                if(item.id == id){
                    // console.log(state.car)
                    state.car.splice(i, 1)
                    // console.log(state.car)
                    return true
                }
            });
            //将删除完后的购物车数据同步到本地存储
            localStorage.setItem('car', JSON.stringify(state.car));
        },
        updateGoodsSelected(state,info){
            state.car.some(item =>{
                if(item.id == info.id){
                    item.selected = info.selected
                    return true
                }
            })
            //把最新 购物车商品状态保存到 store中
            localStorage.setItem('car',JSON.stringify(state.car))
        }
    },
    getters: { // this.$store.getters.***
        //相当于 计算属性 也相当于 filters
        getAllCount(state){
            var c = 0;
            state.car.forEach(item =>{
                c += item.count
            })
            return c
        },
        getGoodsCount(state){
            var o = {};
            state.car.forEach(item =>{
                o[item.id] = item.count;
            });
            return o;
        },
        getGoodsSelected(state){
            var o = {};
            state.car.forEach(item =>{
                o[item.id] = item.selected
            });
            return o
        },
        getGoodsCountAndAmount(state){
            var o = {
                count: 0, //商品总数
                amount: 0 //勾选的总价
            }
            state.car.forEach(item =>{
                if(item.selected){
                    o.count += item.count
                    o.amount += item.price * item.count
                }
            });
            return o
        }


    }
});

//导入格式化时间的插件
import moment from 'moment'
//定义全局的过滤器
Vue.filter('dateFormat', function(dataStr, pattern = "YYYY-MM-DD HH:mm:ss"){
    return moment(dataStr).format(pattern)
})

//2.1导入 vue-resource
import VueResource from 'vue-resource'
//2.2 安装 vue-resource
Vue.use(VueResource)
//设置请求根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005'
//全局设置 post 时候表单数据格式 application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true


//按需导入 Mint-UI 中的组件
/* import { Header,Swipe,SwipeItem,Button,Lazyload } from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)
Vue.use(Lazyload) */
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

//安装图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

//导入 mui 组件
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

//导入 App 根组件
import app from './App.vue'

//1.3 导入自己的 router.js 路由模块
import router from './router.js'

var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router,  //1.4 挂载路由对象到 VM 实例上
    store    //挂载 stor
})