<template>
    <div class="photoinfo-container">
        <h3>{{ photoinfo.title }}</h3>
        <p class="subtitle">
            <span>{{ photoinfo.add_time | dateFormat }}</span>
            <span>点击：{{ photoinfo.click }}次</span>
        </p>

        <hr>

        <!--缩略图区域-->
        <div class="imgbox">
            <img class="preview-img" v-for="(item,index) in list" :key="item.src" :src="item.src" height="100">
        </div>

        <!--图片内容区域-->
        <div class="content" v-html="photoinfo.content"></div>

        <!--评论区域-->
        <cmt-box :id="id"></cmt-box>
    </div>
</template>

<script>
    //引入评论组件
    import comment from '../subcomponents/comment.vue'

    export default{
        data() {
            return {
                id: this.$route.params.id, //从路由中获取到的图片ID
                photoinfo: {}, //图片详情
                list: []  //缩略图
            };
        },
        created(){
            this.getPhotoInfo();
            this.getThumbs();
        },
        methods: {
            getPhotoInfo(){
                //获取图片的详情
                this.$http.get("api/getimageInfo/" + this.id).then(result =>{
                    if(result.body.status === 0){
                        this.photoinfo = result.body.message[0];
                    }
                });
            },
            getThumbs(){
                //获取缩略图
                this.$http.get("api/getthumimages/" + this.id).then(result =>{
                    if(result.body.status === 0){
                        //循环每一个图片的数据，补全图片的宽高
                        result.body.message.forEach(item =>{
                            item.w = 600;
                            item.h = 400;
                        });
                        //把完整的数据保存到 list 中
                        this.list = result.body.message;
                        console.log(this.list);
                    }
                })
            }
        },
        components: {
            //注册 评论子组件
            "cmt-box": comment
        }
    }
</script>

<style lang="scss" scoped>
.photoinfo-container{
    padding: 5px;
    h3{
        color: #26A2FF;
        font-size: 15px;
        text-align: center;
        margin: 15px 0;
    }
    .subtitle{
        display: flex;
        justify-content: space-between;
    }
    .content{
        font-size: 13px;
        line-height: 30px;

    }
    .suoluetu {
        img {
            width: 60px;
            height: 80px;
            margin: 5px;
            box-shadow: 0 0 8px #999;
        }
    }
    .imgbox{
        img{
            margin: 10px;
            box-shadow: 0 0 9px #999;
        }
    }
}
</style>