<template>
    <div class="newsinfo">
        <h1 class="title">{{newsinfolist.title}}</h1>
        <p class="subtime">
          <span>发表时间：{{newsinfolist.add_time | dateFormat}}</span>
          <span>点击：{{newsinfolist.click}}次</span>
        </p>
        <hr>
        <div class="content" v-html="newsinfolist.content"></div>
        <comment-box :id="this.id"></comment-box>
    </div>
    
</template>
<script>
import Toast from 'mint-ui';
import comment from '../subComment/comment.vue';
export default {
  data() {
    return {
      id:this.$route.params.id,
      newsinfolist:{}
    };
  },
  created () {
    this.getcontent();
  },
  methods: {
    getcontent() {
      this.$http.get('api/getnew/'+this.id).then(result=> {
        if(result.body.status===0) {
          console.log(result.body);
          this.newsinfolist=result.body.message[0];
        }else {
          Toast('加载详情失败');
        }
      })
    }
  },
  components: {
    'comment-box':comment
  }
};
</script>
<style lang="scss" scoped>
.newsinfo {
  padding: 0 4px 10px;
    .title {
      font-size: 16px;
      color: red;
      margin: 15px 0;
    }
    .subtime {
      font-size: 13px;
      color: blue;
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }
}
</style>
