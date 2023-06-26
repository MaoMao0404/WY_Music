<template>
  <div>
    <!-- 1. 搜索 -->
    <div class="search">
      <input v-focus type="text" v-model="inpVal" placeholder="搜索歌曲、歌手" class="inp" name="" id="">
    </div>
    <!-- 2. 热门搜索 -->
    <div class="hot-search" v-if="isShow">
      <div class="title">热门搜索</div>
      <div class="wrapper">
        <div class="item" v-for="(item,index) in hots" :key="index">{{ item.first }}</div>
      </div>
    </div>
    <!-- 3. 搜索的数据列表展示 -->
    <div class="search-list" v-else>
        <div class="name">搜索 "{{ inpVal }}"</div>
        <div class="info" v-for="item in list" :key="item.keyword">
          <img src="@/assets/images/search.png" alt="">
          {{ item.keyword }}</div>
        <div>{{ info }}</div>
    </div>

  </div>
</template>

<script>
export default {
  //定义指令--获取焦点
  directives: {
    focus: {
      // 指令的定义
      inserted: function (el) {
        el.focus()
      }
    }
  },
  data(){
    return{
      hots:[],
      isShow:true,//是否显示热门搜索
      inpVal:'',//输入的内容
      list:[],//搜索列表
      info:''
    }
  },
  created(){
    this.hotSearch();
  },
  methods:{
    //获取热搜信息---------------------
    async hotSearch(){
      let res = await this.$api.hotSearch();
      console.log('热搜----',res.data);
      this.hots = res.data.result.hots;//first
    },
    //搜索数据--------------------------
    async getSearch(keywords){
      let res = await this.$api.search({
        keywords,
        type:'mobile'
      });
      console.log('搜索数据---',res.data);
      //判断是否查询到数据---code ==200 
      if(res.data.result.allMatch){
        this.list = res.data.result.allMatch;
        this.info=''
      }else{
        this.list=[];
        this.info='查无数据'
      }

    }
  },
  //侦听器------ 
  /* 
   请求方式	get	
        参数	是	keywords 	string	关键字
        参数	是	type 	    string	'mobile' 移动端
  */
  watch:{
    inpVal(val){
      console.log('输入的值修改了',val);
      //隐藏热门搜索词语 
      if(val){
        this.isShow = false;
        //搜索数据查询------
        this.getSearch(val)
      }else{
        this.isShow = true;
      }

    }
  }
}
</script>

<style lang="less" scoped>
.search {
  padding: .3rem;
  // display: flex;
  border-bottom: 1px solid #eee;

  .inp {
    border: 0;
    outline: none;
    width: 100%;
    box-sizing: border-box;
    background: #eee;
    height: .6rem;
    line-height: .6rem;
    border-radius: 0.2rem;
    padding-left: .2rem;
  }
}

.hot-search {
  padding: 15px 10px 0;

  .title {
    font-size: 12px;
    line-height: 12px;
    color: #666;
  }

  .wrapper {
    margin: 10px 0 7px;

    .item {
      display: inline-block;
      height: 32px;
      margin-right: 8px;
      margin-bottom: 8px;
      padding: 0 14px;
      font-size: 14px;
      line-height: 32px;
      color: #333;
      border: 1px solid #d3d4da;
      border-radius: 32px;
    }
  }
}

.search-list{
  .name{
    color: red;
    padding-left: .2rem;
    line-height: .9rem;
    border-bottom: 1px solid #eee;
  }
  .info{
    line-height: .9rem;
    height: .9rem;
    padding-left: .2rem;
    border-bottom: 1px solid #eee;
    img{
      width: .4rem;
    }
  }
}
</style>