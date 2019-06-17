<template>
        <div class="mui-numbox" data-numbox-min="1" style="height: 25px; width: 110px">
            <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
            <input id="test" class="mui-input-numbox" type="number" :value="initcount" @change="countChanged" ref="numbox" readonly>
            <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
        </div>
</template>

<script>
    //导入mui
    import mui from '../../lib/mui/js/mui.min.js'

    export default{
        mounted(){
            //初始化数字选择框组件
            mui('.mui-numbox').numbox();
        },
        methods: {
            countChanged(){
                //每当文本框数据改变时候，把最新数据传递给父组件
                // console.log(this.$refs.numbox.value);
                //数量值改变时，把最新数量同步到购物车中的 store中，覆盖之前的数量
                this.$store.commit("updateGoodsInfo",{
                    id: this.goodsid,
                    count: this.$refs.numbox.value
                })
            }
        },
        props: ["initcount", "goodsid"],
    };
</script>

<style lang="scss" scoped>

</style>