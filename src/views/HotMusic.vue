<template>
  <div>
    <!-- 1. 热歌榜图片 -->
    <div class="info">
      <img src="@/assets/images/hot_music_bg_2x.jpg" width="100%" />
    </div>
    <!-- 2. 热歌列表 -->
    <MusicList :list="list" :isShow="false">
      <template #code="obj">
        <div class="code" :class="{'code-red':obj.index<3}">{{ obj.index>8?obj.index+1 :'0'+ (obj.index+1) }}</div>
      </template>
    </MusicList>
    <!-- <div class='list' v-for="(item,index) in list" :key="item.id">
      <div class="code" :class="{'code-red':index<3}">{{ index>8?index+1 :'0'+ (index+1) }}</div>
      <div class="list-item">
        <div class="left">
          <div class="subtitle">{{ item.name }} <span>{{ item.alia[0] }}</span> </div>
          <div class="author">
            <span v-for="ele in item.ar" :key="ele.id" class="ele">
                                {{ ele.name }} 
                            </span> 
                            - {{ item.al.name }}
          </div>
        </div>
        <div class="right">
          <img src="@/assets/images/play.png" alt=""/>
        </div>
      </div>
    </div> -->

  </div>
</template>

<script>
import MusicList from '@/components/MusicList.vue'
export default {
  components:{
    MusicList
  },
  data(){
    return {
      list:[],//音乐列表数据
    }
  },  
  created(){
    this.getPlaylist()
  },
  methods:{
    //获取热歌榜数据---------------------------
    async getPlaylist(){
      let res = await this.$api.getPlaylist()
      console.log('获取热歌榜数据-',res.data);
      this.list = res.data.playlist.tracks
    }
  }
}
</script>

<style lang="less" scoped>
.info{

}
.list{
  display: flex;
  .code{
      width:1rem;
      display: flex;
      align-items: center;
      text-align: center;
      justify-content: center;
      font-size: 16px;
    }
  .code-red{
    color: #df3436;
  }
}
.list-item {
    border-bottom: 1px solid #eee;
    // padding-left: 10px;
    padding-top: 6px;
    padding-bottom: 6px;
    display:flex;
  flex: 1;
    .left{
        flex:1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: normal;
    }
    .right{
        width:.9rem;
        display: flex;
        align-items: center;
        justify-content: center;
        img{
            width: .6rem;
            height: .6rem;

        }
    }
    .subtitle {
        font-size: 17px;
        color: #333;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: normal;
        span{
            // font-size: 12px;
            color: #888; 
        }
    }

    .author {
        margin-top: 4px;
        font-size: 12px;
        color: #888;
       
        .ele{
           &::after{
            content: "/";
           }
        }
        .ele:last-child{
            &::after{
            content: "";
           }
        }
    }
}
</style>