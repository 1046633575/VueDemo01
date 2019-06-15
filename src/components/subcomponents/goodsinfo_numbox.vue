<template>
        <div class="mui-numbox" data-numbox-min="1" >
            <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
            <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox">
            <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
        </div>
</template>

<script>
    //导入mui
    import mui from '../../lib/mui/js/mui.min.js'

    export default{
        mounted(){
            //初始化数字选择框组件
            mui('mui-numbox').numbox();
        },
        methods: {
            countChanged(){
                //每当文本框数据改变时候，把最新数据传递给父组件
                // console.log(this.$refs.numbox.value);
                this.$emit("getcount", parseInt(this.$refs.numbox.value));
            }
        },
        props: ["max"],
        watch: {
            //属性监听 用来监听选择框最大值
            'max': function(newVal, oldVal){
                //使用 JS api 设置 numbox 最大值
                mui(".mui-numbox").numbox().setOption('max', newVal);
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>