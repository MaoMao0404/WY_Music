<template>
    <div>
        <!-- 编辑推荐 -->
        <div class="wrap">
            <div class="title">编辑推荐</div>
            <div class="content">
                <van-row gutter="4">
                    <van-col span="8" v-for="item in list" :key="item.id">
                        <div class="item">
                            <router-link :to="'/playlist/'+item.id">
                                <img :src="item.picUrl" alt="" />
                                <!-- <div class="total">{{ num(item.playCount) }}</div> -->
                                <div class="total"><img src="@/assets/images/headset.png" /> {{ item.playCount | num }}
                                </div>
                                <div class="info">{{ item.name }}</div>
                            </router-link>
                        </div>
                    </van-col>
                </van-row>
            </div>
        </div>

        <!-- 最新音乐 -->
        <div class="main">
            <div class="title">最新音乐</div>
            <div class="list">
                <div   v-for="item in newsong" :key="item.id">
                  <!-- <router-link :to='"/songpage/"+item.id+"/"+item.name' class="list-item"> -->
                  <router-link :to="{name:'songpage',params:{id:item.id,name:item.name}}" class="list-item">
                    <div class="left">
                        <div class="subtitle">{{ item.name }} <span>{{ item.song.alias[0] }}</span> </div>
                        <div class="author">
                            <span v-for="ele in item.song.artists" :key="ele.id" class="ele">
                                {{ ele.name }}
                            </span>
                            - {{ item.song.album.name }}
                        </div>
                    </div>
                    <div class="right">
                        <img src="@/assets/images/play.png" alt="">
                    </div>
                  </router-link>
                </div>
                <!-- <div class="list-item">
                   <div class="left">
                        <div class="subtitle">歌曲名称 <span>xxxx</span> </div>
                        <div class="author">作者</div>
                   </div>
                   <div class="right">aa</div>
                </div> -->
            </div>
        </div>


        <!-- 最底部 -->
        <div class="bottom">
        </div>

    </div>
</template>

<script>

export default {
    data() {
        return {
            list: [],
            newsong: [], //最新音乐列表数据
        };
    },
    //进入页面获取网络请求---生命周期函数--- 
    created() {
        this.getMusic();
        this.getNewSong();
    },
    methods: {
        //获取推荐音乐数据-------------------------------
        async getMusic() {
            let res = await this.$api.getMusic();
            console.log("推荐音乐", res.data);
            this.list = res.data.result;
        },
        //获取最新音乐-------------------------------
        async getNewSong() {
            let res = await this.$api.getNewSong();
            console.log("最新音乐", res.data);
            this.newsong = res.data.result;
        },
        //处理播放量的数据格式-------------------------
        num(n) {
            return (n / 10000).toFixed(1);
        }
    },
    //过滤器--常见的文本格式化 
    filters: {
        num(val) {
            if (!val)
                return;
            //val播放量的数值
            val = val > 9999 ? (val / 10000).toFixed(1) + "万" : val;
            return val;
        },
        sliceLine(val) {
            if (!val)
                return;
            return val.slice(0, -1);
        }
    },
}
</script>
   
<style lang="less" scoped>
.title {
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
    font-size: 0.34rem;
    position: relative;
    padding-left: 0.2rem;

    &::before {
        content: "";
        position: absolute;
        width: 2px;
        height: 20px;
        top: 2px;
        background: #ff5555;
        left: 0;
    }
}

.content {
    .item {
        position: relative;

        img {
            width: 100%;
        }

        .total {
            color: #fff;
            position: absolute;
            right: 2px;
            top: 2px;

            img {
                width: 0.3rem;
                position: absolute;
                top: 0.08rem;
                left: -0.34rem;
            }
        }

        .info {
            margin: .14rem;
            text-overflow: ellipsis;
            overflow: hidden;
            font-size: 0.26rem;
            color: #333;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            /* 这里是超出几行省略 */
        }
    }

    .van-col {
        height: 3.56rem;
    }
}

// 最新音乐
.list-item {
    border-bottom: 1px solid #eee;
    padding-left: 10px;
    padding-top: 6px;
    padding-bottom: 6px;
    display: flex;

    .left {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: normal;
    }

    .right {
        width: .9rem;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
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

        span {
            // font-size: 12px;
            color: #888;
        }
    }

    .author {
        margin-top: 4px;
        font-size: 12px;
        color: #888;

        .ele {
            &::after {
                content: "/";
            }
        }

        .ele:last-child {
            &::after {
                content: "";
            }
        }
    }
}

.bottom {
    background: url('@/assets/images/recommand_bg_2x.png') no-repeat;
    height: 4rem;
    background-size: cover;
    margin-top: .2rem;
}
</style>