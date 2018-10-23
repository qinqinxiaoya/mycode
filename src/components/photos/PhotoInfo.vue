<template>
    <div>
        <div class="img-detail">
            <h1 class="title">{{list.title}}</h1>
            <p class="subtime">
                <span>发表时间：{{list.add_time | dateFormat}}</span>
                <span>点击{{list.click}}次</span>
            </p>
            <hr>
            <div class="little-img">
                <template>
                    <vue-preview :slides="images" @close="handleClose"></vue-preview>
                </template>
            </div>
            <div class="description">
                {{list.content}}
            </div>
            <!-- 评论子组件模板 -->
            <comment-box :id="id"></comment-box>
        </div>
    </div>
</template>
<script>
// 引入评论子组件
import comment from '../subComment/comment.vue';
export default {
    data () {
        return {
            id:this.$route.params.id,
            list:[],
            images:[]
        }
    },
    created () {
        this.getimageInfo();
        this.getthumimages();
    },
    methods: {
        getimageInfo() {
            this.$http.get('api/getimageInfo/'+this.id).then(result => {
                if(result.body.status===0) {
                    this.list = result.body.message[0];
                    // console.log(this.list);
                }
            })
        },
        getthumimages() {
            this.$http.get('api/getthumimages/'+ this.id).then(result => {
                if(result.body.status===0) {
                    result.body.message.forEach(item => {
                        // console.log(item);
                        item.w = 600;
                        item.h = 400;
                        item.msrc = item.src;//增加页面显示的图片
                    })
                    // console.log(result.body.message);
                    this.images = result.body.message;

                    // console.log(this.images);
                }
            })
        },
        handleClose () {
        console.log('close event')
      }
    },
    components: {
        'comment-box':comment,
    }
}
</script>
<style lang="scss" scoped>
.img-detail {
    padding: 0 10px;
    .title {
        font-size: 15px;
        text-align: center;
        color: blue;
        margin: 15px 0;
    }
    .subtime {
        font-size: 13px;
        display: flex;
        justify-content: space-between; 
    }
    .description {
        font-size: 14px;
    }
    /deep/ .my-gallery {
         display: flex;
         flex-wrap: wrap;
        figure {
            width: 33.33%;
            margin: 0;
            padding: 3px;
        }
        img {
            width: 100%;
            box-shadow: 0 0 8px #999;
            }
    }
}
</style>
