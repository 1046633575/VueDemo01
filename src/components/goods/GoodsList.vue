<template>
    <div class="goods-list">
        <!--<router-link class="goods-item" v-for="item in goodslist" :key="item.id" :to="'/home/goodsinfo/' + item.id" tag="div">-->
            <!--<img :src="item.img_url" alt="">-->
            <!--<h1 class="title">{{ item.title }}</h1>-->
            <!--<div class="info">-->
                <!--<p class="price">-->
                    <!--<span class="now">￥{{ item.sell_price }}</span>-->
                    <!--<span class="old">￥{{ item.market_price }}</span>-->
                <!--</p>-->
                <!--<p class="sell">-->
                    <!--<span>热卖中</span>-->
                    <!--<span>剩 {{ item.stock_quantity }}件</span>-->
                <!--</p>-->
            <!--</div>-->
        <!--</router-link>-->

        <!--使用JS编程式导航-->
        <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="getDetail(item.id)">
            <img :src="item.img_url" alt="">
            <h1 class="title">{{ item.title }}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{ item.sell_price }}</span>
                    <span class="old">￥{{ item.market_price }}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩 {{ item.stock_quantity }}件</span>
                </p>
            </div>
        </div>

        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>

    </div>
</template>

<script>
    export default{
        data(){
            //data是往自己组件内部挂载一些私有数据的
            return {
                pageindex: 1, //分页的页数
                goodslist: [] //存放商品列表的数组
            };
        },
        created(){
          this.getGoodsList();
        },
        methods: {
            getGoodsList(){
                //获取商品列表
                this.$http.get("api/getgoods?pageindex=" + this.pageindex).then(result =>{
                    if(result.body.status === 0){
                        // this.goodslist = result.body.message;
                        this.goodslist = this.goodslist.concat(result.body.message);
                    }
                })
            },
            getMore(){
                this.pageindex ++;
                this.getGoodsList();
            },
            getDetail(id){
                //编程式导航使用 vue-router
                // 用的是 this.$router 而不是 this.$route

                //第一种方式
                // this.$router.push("/home/goodsinfo/" + id);

                //第二种方式
                // this.$router.push({ path: "/home/goodsinfo/" + id })

                //第三种方式 命名的路由
                this.$router.push({ name: 'goodsinfo', params: { id }})
            }
        }
    }
</script>

<style lang="scss" scoped>
    .goods-list{
        display: flex;
        flex-wrap: wrap;
        padding: 8px;
        justify-content: space-between;
        .goods-item{
            width: 49%;
            border: 1px solid #ccc;
            box-shadow: 0 0 8px #ccc;
            margin: 4px 0;
            padding: 2px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 293px;
            img{
                width: 100%;
            }
            .title{
                font-size: 14px;
            }

            .info{
                background-color: #eee;
                p{
                    margin: 0;
                    padding: 5px;
                }
                .price{
                    .now{
                        color: red;
                        font-weight: bold;
                        font-size: 16px;
                    }
                    .old{
                        text-decoration: line-through;
                        font-size: 12px;
                        margin-left: 10px;
                    }
                }
                .sell{
                    display: flex;
                    justify-content: space-between;
                }
            }
        }
    }
</style>