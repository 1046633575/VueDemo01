<template>
    <div>
        <cmtbox :id="$route.params.id"></cmtbox>
    </div>
</template>

<script>
    //载入评论组件
    import cmtbox from '../subcomponents/comment.vue'

    export default{
        components: {
            cmtbox
        }
    }
</script>

<style lang="scss" scoped>

</style>