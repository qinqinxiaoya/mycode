<template>
    <div>
        <!-- 顶部滑动区 -->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item',item.id===0 ? 'mui-active':'']"  v-for="item in cates" :key="item.id" @click="getimageList(item.id)">
                        {{item.title}}
                    </a>
                </div>
            </div>
        </div>
    <!-- 图片列表区 -->
    <ul class="photolist">
        <router-link class="listbox" v-for="item in images" :key="item.id"  :to="'/home/photoinfo/'+item.id">
            <img v-lazy="item.img_url">
            <div class="info">
                <h1 class="info-title">{{item.title}}</h1>
                <span class="info-content">{{item.zhaiyao}}</span>
            </div>
        </router-link>
    </ul>
    </div>
</template>
<script>
import mui from '../../assets/mui/js/mui.min.js'
//初始化滑动区间

export default {
    data() {
        return {
            cates:[],
            images:[]
        }
    },
    created () {
      this.getAllCategory();
      this.getimageList(0);  
    },
    mounted () {
        mui('.mui-scroll-wrapper').scroll({
	        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });  
    },
    methods: {
        getAllCategory() {
            this.$http.get('api/getimgcategory').then(result => {
                // console.log(result.body.message);
                if(result.body.status===0) {
                    result.body.message.unshift({title:'全部',id:0});
                    this.cates = result.body.message;
                }
            })
        },
        getimageList(cateId) {
            this.$http.get('api/getimages/'+ cateId).then(result=> {
                if(result.body.status===0) {
                    this.images = result.body.message;
                }
            })
        }
    }
    
}
</script>
<style lang="scss" scpoed>
    * {
        touch-action: pan-y;
    }
    img[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
    }
.photolist {
    list-style:none;
    text-align: center;
    padding: 10px;
    margin: 0;
    .listbox { 
        margin-bottom: 10px;
        position: relative;
        display: block;
        img {
            width: 100%;
            box-shadow: 0 0 9px #999;
            vertical-align: middle;
        }
        .info {
            color:#fff;
            text-align: left;
            position: absolute;
            bottom:0;
            background-color:rgba(0,0,0,0.4);
            max-height: 84px;
            padding: 3px;
            .info-title {
                font-size: 14px;
            }
            .info-content {
                font-size: 13px;
            }
        }
    }
}
</style>

