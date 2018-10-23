<template>
    <div>
        <div class="container">
            <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
                <div class="goods-list" v-for="item in list" :key="item.id">
                    <div class="goods">
                        <img :src="item.img_url" alt="">
                        <h1>{{item.title}}</h1>
                    </div>
                    <div class="price">
                        <p>
                            <span class="now">￥{{item.market_price}}</span>
                            <span class="old">￥{{item.sell_price}}</span>
                        </p>
                        <p class="hot">
                            <span>热卖中</span>
                            <span>剩余{{item.stock_quantity}}件</span>
                        </p>
                    </div>
                </div>
            </mt-loadmore>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            pageindex:1,
            list:[],

        }
    },
    created () {
        this.getgoods();
    },
    mounted () {
        
    },
    methods: {
        getgoods() {
            this.$http.get('api/getgoods'+ '?pageindex='+this.pageindex).then(result => {
                if(result.body.status===0) {
                    // this.list = result.body.message;
                    if (this.pageindex == 1) {
                        // 重置下拉状态
                        this.$refs.loadmore.onTopLoaded();
                        // 直接赋值第一页的数据
                        this.list = result.body.message;
                    } else {
                        // 重置上拉状态
                        if (result.body.message.length == 0) {
                        this.allLoaded = true;
                        }
                        // 重置上拉状态
                        this.$refs.loadmore.onBottomLoaded();
                        this.list = this.list.concat(result.body.message);
                    }
                }
            })
        },
        loadBottom() {
        // 加载更多数据
            this.pageindex++,
            this.getgoods();
        }
    }
}
</script>
<style lang="scss" scoped>
.container {
  padding: 7px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .goods-list {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 4px 0;
    padding: 2px;
    min-height: 293px;
    .goods {
      img {
        width: 100%;
      }
      h1 {
        font-size: 14px;
        margin: 5px 0;
      }
    }
    .price {
      background-color: #eee;
      padding: 5px;
      .now {
        color: red;
        font-size: 15px;
        font-weight: bold;
        text-align: left;
      }
      .old {
        text-decoration: line-through;
        font-size: 12px;
        margin-left: 15px;
      }
      .hot {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
      }
    }
  }
}
</style>
