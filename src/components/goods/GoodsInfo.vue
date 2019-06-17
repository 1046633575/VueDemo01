<template>
    <div class="goodsinfo-container">
        <!--购物车小球-->
        <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>

        <!--商品轮播图区域-->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :lunbotu-list="lunbotu" :isfull="false"></swiper>
                </div>
            </div>
        </div>

        <!--商品购买区域-->
        <div class="mui-card">
            <div class="mui-card-header">{{ goodsinfo.title }}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：<del>￥{{ goodsinfo.market_price }}</del>&nbsp;&nbsp;销售价：<span class="now_price">￥{{ goodsinfo.sell_price }}</span>
                    </p>
                    <p>购买数量:<numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox></p>
                    <p>
                        <mt-button type="primary" size="small" >立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                    </p>
                </div>
            </div>
        </div>

        <!--商品参数区域-->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{ goodsinfo.goods_no }}</p>
                    <p>库存情况：{{ goodsinfo.stock_quantity }}件</p>
                    <p>上架时间：{{ goodsinfo.add_time | dateFormat }}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="getDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="getComment(id)">商品评论</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
    //轮播图组件
    import swiper from '../subcomponents/swiper.vue'
    //商品数量组件
    import numbox from '../subcomponents/goodsinfo_numbox.vue'

    export default{
        data(){
            return{
                id: this.$route.params.id, //将路由参数的id挂载到 data,方便后期调用
                lunbotu: [], //轮播图数据
                goodsinfo: [], //获取商品信息
                ballFlag: false,  //控制小球显示与隐藏
                selectCount: 1 //保存用户选中的商品数量， 默认为 1
            };
        },
        created(){
            this.getLunbotu();
            this.getGoodsInfo();
        },
        methods: {
            getLunbotu(){
                this.$http.get("api/getthumimages/" + this.id).then(result =>{
                    if(result.body.status === 0){
                        //获取到轮播图数据后先循环处理 因为轮播图组件中是 img 传过来的 src
                        result.body.message.forEach(item =>{
                            item.img = item.src;
                        });
                        this.lunbotu = result.body.message;
                    }
                });
            },
            getGoodsInfo(){
                //获取商品信息
                this.$http.get("api/goods/getinfo/" + this.id).then(result=>{
                    if(result.body.status === 0){
                        this.goodsinfo = result.body.message[0];
                    }
                });
            },
            getDesc(id){
                //使用编程式导航跳转到 图文介绍页面
                this.$router.push({ name: "goodsdesc", params: { id }});
            },
            getComment(id){
                //点击跳转到 评论页面
                this.$router.push({ name: "goodscomment", params: { id } });
            },
            addToShopCar(){
                //添加到购物车
                this.ballFlag = !this.ballFlag;
                // { id:商品的id, count:要购买的数量, price:商品的单价, selected:false }
                var goodsinfo = {
                    id: this.id,
                    count: this.selectCount,
                    price: this.goodsinfo.sell_price,
                    selected: true
                };
                // 调用 vuex mutations中的方法传递 goodsinfo
                this.$store.commit('addToCar', goodsinfo);
            },
            beforeEnter(el){
                el.style.transform = "translate(0, 0)";
            },
            enter(el, done){
                //获取小球与徽标的位置 domObj.getBoundingClientRect()

                //获取小球在页面中的位置
                const ballPosition = this.$refs.ball.getBoundingClientRect();
                //获取 徽标在页面中的位置
                const badgePosition = document.getElementById("badge").getBoundingClientRect();

                const xDist = badgePosition.left - ballPosition.left;
                const yDist = badgePosition.top - ballPosition.top;

                el.offsetWidth;
                el.style.transform = `translate(${xDist}px, ${yDist}px)`;
                el.style.transition = "all 0.5s cubic-bezier(.43,-0.24,.17,.17)";
                done();
            },
            afterEnter(el){
                this.ballFlag = !this.ballFlag;
            },
            getSelectedCount(count){
                //当子组件把选中数量传递给父组件时候，选中值保存到 data上
                this.selectCount = count;
                console.log(this.selectCount)
            }
        },
        components: {
            swiper,
            numbox
        }

    }
</script>

<style lang="scss" scoped>
    .goodsinfo-container{
        background-color: #eee;
        overflow: hidden;
    }
    .now_price{
        font-size: 16px;
        color: red;
        font-weight: 600;
    }
    .mui-card-footer{
        display: block;
        button{
            margin: 15px 0;
        }
    }
    .ball{
        width: 15px;
        height: 15px;
        background-color: red;
        border-radius: 50%;
        z-index: 999;
        position: absolute;
        top: 390px;
        left: 140px;
    }
</style>