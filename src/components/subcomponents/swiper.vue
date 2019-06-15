<template>
    <div>
        <mt-swipe :auto="4000">
            <!--组件中，使用v-for循环，必须使用 key-->
            <!--谁调用 轮播图组件，谁 传递 lunbotuList-->
            <!-- lunbotuList 父组件向子组件传值-->
            <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
                <img :src="item.img" :class="{'full' : isfull}">
            </mt-swipe-item>
        </mt-swipe>

        <!--两个轮播图在 宽度上面有冲突，只能通过调用者手动 传值，决定是否为 100%宽度-->
    </div>
</template>

<script>
    export default{
        props: ["lunbotuList", "isfull"]
    }
</script>

<style lang="scss" scoped>
    .mint-swipe{
        height: 200px;
        text-align: center;
        .mint-swipe-item{

            img{
                height: 100%;
            }
        }

    }
    .full{
        width: 100%;
    }
</style>