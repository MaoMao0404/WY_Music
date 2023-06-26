<template>
    <div>
        {{ id }}--{{ name }}
        <!-- 音频 html5 -->
        <!-- <audio :src="url" controls></audio> -->
        <!-- 使用插件---组件 -->
        <!-- :music="audio[0]" 歌曲信息  :list="audio" 歌曲列表  :showlrc="true" 是否显示歌词 -->
        <aplayer :music="{...audio}" :showlrc="true" v-if="audio.url"></aplayer>

    </div>
</template>

<script>
import aplayer from 'vue-aplayer'
export default {
    props: ['id','name'],
    components: {
        aplayer
    },
    data() {
        return {
            url: '',
            audio: {
                title: this.name, // 歌曲名字
                artist: '演唱者', // 演唱者
                url: "", // 音频文件url
                pic: '', // 演唱者封面
                lrc: '[00:00.00] (,,•́ . •̀,,) 刚刚开始学钢琴弹的hhhh', // 歌词或者歌词文件
                theme: '', // 歌曲主题
            },
        }
    },
    mounted() {
        this.getSong();
        this.getLyric();
    },
    methods: {
        //获取音乐的url地址-------------------------------
        async getSong() {
            let res = await this.$api.songUrl()
            console.log('--res---', res.data);
            this.url = res.data.data[0].url;
            //获取音乐的url 
            this.audio.url = res.data.data[0].url;
            console.log('this.audio.url',this.audio.url);
        },
        //获取歌词-------------------------
        async getLyric(){
            let res = await this.$api.getLyric({id:this.id})
            console.log('歌词----',res.data);
            console.log('歌词----',res.data.lrc.lyric);
            //获取歌词
            this.audio.lrc =res.data.lrc.lyric 
        }
    }
}
</script>

<style>

</style>