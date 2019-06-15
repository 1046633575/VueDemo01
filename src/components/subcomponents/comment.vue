<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入要内容（最多120字）" maxlength="120" v-model="msg"></textarea>

        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>

        <div class="cmt-list">
            <div class="cmt-item" v-for="(item, i) in comments" :key="item.add_time">
                <div class="cmt-title">
                    第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_time | dateFormat }}
                </div>
                <div class="cmt-body">
                    {{ item.content === 'undefined' ? '此用户很懒，什么都没说' : item.content}}
                </div>
            </div>
        </div>

        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default{
    data(){
        return {
            pageIndex: 1, //默认展示第一页数据
            comments: [],  //所有评论数据
            msg: ''
        };
    },
    created(){
        this.getComments();
    },
    methods: {
        getComments(){  //获取评论
            this.$http
                .get("api/getcomments/" + this.id + "?pageindex=" + this.pageIndex)
                .then(result => {
                    if(result.body.status === 0){
                        // this.comments = result.body.message;
                        //获取评论是拼接新数据，而不是清空后添加新数据
                        this.comments = this.comments.concat(result.body.message)
                    }else{
                        Toast("评论获取失败!");
                    }
                });
        },
        getMore(){
            this.pageIndex++;
            this.getComments();
        },
        postComment(){
            //校验表单中的数据是否为空
            if(this.msg.trim().length === 0){
                return Toast("评论内容不能为空!");
            }

            /**
             * 发表评论
             * params1: 请求的url地址
             * params2: 提交给服务器的数据对象 { content: this.msg}
             * params3: 定义提交的时候，表单中的数据格式 { emulateJSON: true }
             */
            this.$http.post("api/postcomment/" + this.id, {
                content: this.msg.trim()
            }).then(function(result) {
                if(result.body.status === 0){
                    //拼接处一个评论对象
                    var cmt = {
                        user_name: "匿名用户",
                        add_time: Date.now(),
                        content: this.msg.trim()
                    };
                    this.comments.unshift(cmt);
                    this.msg = "";
                }
            },function(err){
                return Toast("评论发表失败！");
            });
        }

    },
    props: ["id"]
}
</script>

<style lang="scss" scoped>
.cmt-container{
    h3{
        font-size: 18px;
    }
    textarea{
        font-size: 14px;
        height: 85px;
        margin: 0;
    }
    .cmt-list{
        margin: 6px 0;
        .cmt-item{
            font-size: 13px;
            .cmt-title{
                line-height: 30px;
                background-color: #ccc;
            }
            .cmt-body{
                line-height: 35px;
                text-indent: 2em;
            }
        }
    }
}
</style>