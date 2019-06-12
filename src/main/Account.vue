<template>
    <div>
        <h1>这是 Account 组件</h1>
        <router-link to="/account/login">登录</router-link>
        <router-link to="/account/register">注册</router-link>
        <router-view></router-view>
    </div>

</template>

<script>

</script>

<style lang="scss" scoped>
    /* 普通的 style 标签只支持 普通样式，如果想启动 scss 或  less 需要给 style加 lang属性*/
    // 只要 style标签是在 .vue组件中定义的， 那么推荐 style开启 scoped属性
    body{
        div{
            font-size: 30px;
        }
    }
</style>
