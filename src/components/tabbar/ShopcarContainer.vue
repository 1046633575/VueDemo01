<template>
    <div class="shopcar-container">
        <div class="goods-list">

            <!--商品列表区域-->
            <div class="mui-card" v-for="(item, i) in goodslist" :key="item.id">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">

                        <mt-switch v-model="$store.getters.getGoodsSelected[item.id]" @change="selectedChanged(item.id, $store.getters.getGoodsSelected[item.id])"></mt-switch>
                        <img :src="item.thumb_path" alt="">
                        <div class="info">
                            <h1>{{ item.title }}</h1>
                            <p>
                                <span class="price">￥{{ item.sell_price }}</span>
                                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                                <!--问题： 如何从购物车中获取商品的数量-->
                                <!--1.先创建一个 空对象，然后循环购物车中所有商品数据，把当前循环这条商品的 id,作对象的属性名，count值作属性值
                                    这样就可以得到对象 { 88: 2, 89: 3, 90: 4 }
                                -->
                                <a href="#" class="delete" @click.prevent="remove(item.id, i)">删除</a>
                            </p>
                        </div>
                        
                    </div>
                </div>
            </div>

            <!--结算区域-->
            <div class="mui-card">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner jiesuan">
                        <div class="left">
                            <p>总计 ( 不含运费 )</p>
                            <p>已勾选商品 <span class="red">{{ $store.getters.getGoodsCountAndAmount.count }}</span> 件, 总价 <span class="red">￥{{ $store.getters.getGoodsCountAndAmount.amount }}</span></p>
                        </div>
                        <mt-button type="danger">去结算</mt-button>
                    </div>

                </div>
            </div>


        </div>
    </div>
</template>

<script>
    import numbox from '../subcomponents/shopcar_numbox.vue'

    export default{
        data(){
            return {
                goodslist : []  //存放购物车中所有商品
            };
        },
        created(){
          this.getGoodsList();

        },
        methods: {
            getGoodsList(){
                //1. 获取到 store 中所有的商品的ID，然后拼接出一个 用逗号分隔的字符串
                var idArr = [];
                this.$store.state.car.forEach(item => idArr.push(item.id));
                //判断购物车中是否有数据，没有中断执行
                if(idArr.length <= 0){
                    return;
                }
                //获取购物车商品列表
                this.$http.get('api/goods/getshopcarlist/' + idArr.join(',')).then(result =>{
                    if(result.body.status === 0){
                        this.goodslist = result.body.message;
                    }
                });
            },
            remove(id, index){
                //删除，把商品从 store中根据传递的 id删除，同时，把当前组件中的 goodslist中对应的商品，使用index删除
                this.goodslist.splice(index, 1);
                this.$store.commit('removeForCar',id);
            },
            selectedChanged(id, val){
                //每当点击开关，把最新的 开关状态 同步至 store 中
                // console.log(id + "---" + val)
                this.$store.commit("updateGoodsSelected", {id, selected: val})
            }
        },
        components: {
            numbox
        }
    }
</script>

<style lang="scss" scoped>
.shopcar-container{
    background: #eee;
    overflow: hidden;
    .goods-list{
        .mui-card-content-inner{
            display: flex;
            align-items: center;
            img{
                width: 60px;
                height: 60px;
                margin: 0 10px;
            }
            h1{
                font-size: 13px;
                margin-bottom: 15px;
                line-height: 15px;
            }
            .info{
                position: relative;
                .price{
                    color: red;
                    font-weight: bold;
                }
            }
        }
    }
    .jiesuan{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .red{
            font-weight: bold;
            font-size: 16px;
            color: red;
        }
    }

}
</style>