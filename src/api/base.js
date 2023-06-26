/* 
    公共的接口配置资源
*/
const base={
    host:'http://iwenwiki.com:3000',//基本域名
    musicUrl:'/api/personalized?limit=6',//首页-推荐音乐 limit=1
    newsong:"/foo/weapi/personalized/newsong",//首页-最新音乐
    playlist:"/foo/weapi/v6/playlist/detail",//热歌榜列表数据
    hotSearch:"/foo/weapi/search/hot",//热门搜索接口
    search:"/api/search/suggest",//搜索接口
    musicplaylist:"/foo/weapi/v6/playlist/detail",//首页-推荐音乐-列表界面
    songUrl:'/boo/weapi/song/enhance/player/url/v1',//音乐
    lyric:'/api/lyric',//歌词
}

//可以单个导出
// export const host='http://iwenwiki.com:3000/personalized?limit=1'

export default base