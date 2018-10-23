<template>
    <div>
        <h4 class="subcomment">发表评论</h4>
        <hr>
        <textarea class="talkarea" maxlength="120" placeholder="请输入你想说的" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="postcomment">发表评论</mt-button>
        <div class="comment">
            <div class="commentlist" v-for="(item, i) in commentlist" :key="item.add_time">
              <p>
                第{{i+1}}楼&nbsp;&nbsp;
                用户：{{item.user_name}}&nbsp;&nbsp;
                发表时间：{{item.add_time | dateFormat}}
              </p>
              <div class="content">
                {{item.content==='undefined' ? '此用户很懒':item.content}}
              </div>
            </div>
        </div>
        <mt-button type="danger" size="large" plain @click="getmore">加载更多</mt-button>
    </div>
    
</template>
<script>
import {Toast} from 'mint-ui';
export default {
  name: "Welcome",
  data() {
    return {
      pageindex:1,
      commentlist:[],
      msg:''

    };
  },
  created () {
    this.getcomment();
  },
  methods: {
    getcomment() {
      this.$http.get("api/getcomments/"+this.id+"?pageindex="+this.pageindex).then(result=> {
        // console.log(result.body);
        if(result.body.status===0) {
          this.commentlist = this.commentlist.concat(result.body.message);
        }
      })
    },
    getmore() {
      this.pageindex++,
      this.getcomment()
    },
    postcomment() {
      if(this.msg.trim().length === 0) {
        Toast('提交内容不能为空');
      }
      this.$http.post('api/postcomment/'+this.$route.params.id,{content:this.msg.trim()}).then(result=> {
        // alert(111);
        if(result.body.status === 0) {
          var cmt = {
            user_name:"匿名用户",
            add_time:Date.now(),
            content:this.msg.trim()
          };
          this.commentlist.unshift(cmt);
        }
      })
    }
  },
  props: ['id'],
};
</script>
<style lang="scss" scoped>
.talkarea {
  margin-bottom: 0;
}
.comment {
  padding: 5px 0;
  .commentlist {
    p {
      background-color: #ccc;
      color: black;
    }
  }
}
</style>
