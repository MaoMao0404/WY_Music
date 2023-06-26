<template>
    <div>
    <div class='list' v-for="(item,index) in list" :key="item.id">
            <!--方法2： 使用插槽渲染 歌曲编号序列 -->
            <slot name="code" :index="index"></slot>
            <!-- 方法1：控制编号显示隐藏 -->
            <!-- <div class="code" v-if="isShow">{{ index+1 }}</div> -->
            <!-- 热歌榜 -->
            <!-- <div class="code" :class="{'code-red':index<3}" v-else>{{ index>8?index+1 :'0'+ (index+1) }}</div> -->

            <div class="list-item" @click="playMusic(item.id,item.name)">
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
                    <img src="@/assets/images/play.png" alt="" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    // props:['list','isShow'],
    props:{
        list:{
            type:Array,
            default:function(){
                return []
            }
        },
        isShow:{
            type:Boolean,
            default:true
        }
    },
    methods:{
        //跳转进入音乐播放界面--传送id 
        playMusic(id,name){
            // console.log('id----',id,this.$router);
            this.$router.push({
                // path:'/songpage/'+id
                name:'songpage',
                params:{id,name}
            })
        }
    }
}
</script>

<style lang="less" scoped>

.list {
    display: flex;

    .code {
        width: 1rem;
        display: flex;
        align-items: center;
        text-align: center;
        justify-content: center;
        font-size: 16px;
        color: #888;
    }

    .code-red {
        color: #df3436;
    }
}

.list-item {
    border-bottom: 1px solid #eee;
    // padding-left: 10px;
    padding-top: 6px;
    padding-bottom: 6px;
    display: flex;
    // flex: 1;
    width: 6.5rem;

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
</style>