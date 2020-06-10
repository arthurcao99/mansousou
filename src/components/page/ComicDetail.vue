<template>

    <div class="all">
        <div class="search-result">
            <div  class="item">
                <div class="left">
                    <div class="imgdiv">
                        <img :src="item.pics" alt="" width="200px" height="280" border-radius="50px" class="img">
                    </div>

                </div>

                <div class="right">
                    <div class="right-top">
                        <p class="item-title">
                            {{ item.title }}
                        </p>
                        <p class="item-line">

                  <span>
                    作者：
                    {{ item.author }}
                  </span>
                        </p>
                        <p class="item-line">
                  <span>
                    状态：
                    {{ item.status }}
                  </span>
                            <span>
                    更新：
                    {{ item.status }}
                  </span>
                        </p>
                        <p class="item-line">
                  <span>
                    类型：
                    {{ item.genre }}
                  </span>

                        </p>
                        <p class="item-line-content">
                            {{ item.desc }}
                        </p>
                        <p v-if="isCollected==='no'">
                            <el-button type="primary" round icon="el-icon-message-solid" size="medium" class="cancel-button" @click="addCollect(item)">订阅</el-button>
                        </p>

                        <transition name="slide-fade">

                            <p v-if="isCollected==='yes'">
                                <el-tag type="success">已订阅</el-tag>
                            </p>
                        </transition>

                    </div>

                </div>
            </div>
<!--            <div class="chapter">-->

<!--                <el-button type="primary" plain  round v-for="chap in chapter" class="chapter-item" @click="add(chap)"><a :href="chap.url" target="_blank">第{{chap.no}}章</a></el-button>-->
<!--            </div>-->
            <div class="middle">
                <div class="middleLeft">
                    <div class="chapter-detail" >
                        <div v-for="(item , index)  in  localchapter" class="chapter-card">
                            <el-card :body-style="{ padding: '0px' }">
                                <img :src="item.url" class="image">
                                <div style="padding: 14px;">
                                    <span>{{item.chapter}}</span>
                                    <div class="bottom clearfix">
                                        <time class="time">{{ item.update_time }}</time>
                                        <el-button type="text" class="button">前往阅读</el-button>
                                    </div>
                                </div>
                            </el-card>
                        </div>
                    </div>

                    <p class="title">看过《{{item.title}}》的人还看过</p>
                    <br>
                    <div class="see-more">
                        <div class="see-more-block" v-for="more in recommend.slice(0,5)">
                            <img :src="more.pics" alt="" width="135px">
                            <p class="info-title">{{more.title | ellipsis8}}</p>
                            <p class="brief">{{more.desc | ellipsis20 }}</p>
                        </div>
                    </div>
                    <br>
                    <div class="see-more">
                        <div class="see-more-block" v-for="more in recommend.slice(5,10)">
                            <img :src="more.pics" alt="" width="135px">
                            <p class="info-title">{{more.title | ellipsis8}}</p>
                            <p class="brief">{{more.desc | ellipsis20 }}</p>
                        </div>
                    </div>
                    <br>
                </div>
                <div class="middleRight">
                    <div class="avatar-bar">
                        <img class="avatar" src="http://css99tel.cdndm5.com/v202004101040/blue/images/header-partner.png" alt="">
                        <p class="title">{{item.author}}</p>
                        <p class="subtitle"></p>
                        <p class="tip">作品数：40</p>
                        <div class="bottom">
                            <img src="http://css99tel.cdndm5.com/v202004101040/blue/images/sd/detail-logo-1.png" alt="">
                            <img src="http://css99tel.cdndm5.com/v202004101040/blue/images/sd/detail-logo-2.png" alt="">
                        </div>
                    </div>
                    <div class="other">
                        <p class="title">{{item.author}}的其他作品</p>
                    </div>
                    <br>

                    <div class="avatar-bar">
                        <div class="block">

                            <el-carousel height="300px">
                                <el-carousel-item v-for="(items) in recommend.slice(0,3)" :key="item.value">
                                    <router-link :to="{name: 'comicDetail', params: {id: item.comicId}}">
                                    <img :src="items.pics" width="240px" height="300px" alt="">

                                    </router-link>

                                </el-carousel-item>
                            </el-carousel>
                        </div>
                    </div>
                    <div class="other">
                        <p class="title">热门作品</p>
                        <br>
                    </div>
                    <div class="recommend-bar">
                        <div class="recommend-block" v-for="i in recommend.slice(3,8)">

                            <div class="cover">
                                <img :src="i.pics" alt="" width="60px" @click="refresh(i.comicId)">
                            </div>

                            <div class="info">
                                <p class="info-title">{{i.title | ellipsis8}}</p>
                                <p class="brief">{{i.desc | ellipsis20 }}</p>
                                <p class="brief">评分：<font color="orange">{{i.rate}}</font></p>
                                <el-button type="text" @click="refresh(i.comicId)">阅读</el-button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
<!---->
        </div>

    </div>
</template>


<script>
    export default {
        name: 'search',
        filters: {
            ellipsis8 (value) {
                if (!value) return ''
                if (value.length > 8) {
                    return value.slice(0,8) + '...'
                }
                return value
            },
            ellipsis20 (value) {
                if (!value) return ''
                if (value.length > 20) {
                    return value.slice(0,20) + '...'
                }
                return value
            }
        },
        data() {
            return {
                username:'',
                message:'',
                list:[],
                value:9.4,
                id:'',
                item:{
                    id:'',
                    title:'君临臣下',
                    pics:'https://manhua.qpic.cn/vertical/0/22_09_50_9b2849acd2c1067170c27013fcdd84b0_1555897823879.jpg/420',
                    status:'已完结',
                    desc:'主公为臣，君为天。我逆天改命，只求未来有你。已完结~敬请跳隔壁修仙新坑《夺天阙》一起吸猫，感谢各位六年支持！君临粉丝群：226535903',
                    author:'花香蘑菇',
                    genre:'爆笑,冒险,科幻',
                    rate:'8.3'
                },
                handleSend: function () {
                    if (this.username === '') {
                        window.alert('请输入昵称')
                        return
                    }
                    if (this.message === '') {
                        window.alert('请输入留言内容')
                        return
                    }
                    // 数组list存储了所有的留言内容，通过函数给list添加一项留言数据，添加成功后把文本框置空
                    this.list.push({
                        name: this.username,
                        message: this.message
                    })
                    this.message = ''
                },
                handleReply: function (index) {
                    var name = this.list[index].name
                    this.message = '回复@' + name + ':'
                    this.$refs.message.focus()
                },
                localchapter:[
                    {
                        "chapter": "鬼灭之刃：第202话 一起回去吧",
                        "no": 202,
                        "url": "http://mhfm7tel.cdndm5.com/chaptercover/46/45149/694053/20180927192905_17.jpg",
                        "id": "645248_202",
                        "comic_id": "645248",
                        "create_time": "2020-04-23",
                        "update_time": "2020-04-23"
                    },
                    {
                        "chapter": "鬼灭之刃：第201话 鬼之王",
                        "no": 201,
                        "url": "http://mhfm9tel.cdndm5.com/chaptercover/46/45149/695600/20180918164133_30.jpg",
                        "id": "645248_201",
                        "comic_id": "645248",
                        "create_time": "2020-04-23",
                        "update_time": "2020-04-23"
                    },
                    {
                        "chapter": "鬼灭之刃：第200话 胜利的代价",
                        "no": 200,
                        "url": "http://mhfm3tel.cdndm5.com/chaptercover/46/45149/695602/20180918164216_26.jpg",
                        "id": "645248_200",
                        "comic_id": "645248",
                        "create_time": "2020-04-23",
                        "update_time": "2020-04-23"
                    },
                    {
                        "chapter": "鬼灭之刃：第199话 暌违千年的日出",
                        "no": 199,
                        "url": "http://mhfm8tel.cdndm5.com/chaptercover/46/45149/695605/20180918164256_28.jpg",
                        "id": "645248_199",
                        "comic_id": "645248",
                        "create_time": "2020-04-23",
                        "update_time": "2020-04-23"
                    },
                    {
                        "chapter": "鬼灭之刃：第198话 回过神才发现",
                        "no": 198,
                        "url": "http://mhfm9tel.cdndm5.com/chaptercover/46/45149/696873/20180921180915_116.jpg",
                        "id": "645248_198",
                        "comic_id": "645248",
                        "create_time": "2020-04-23 13:58:47",
                        "update_time": "2020-04-23"
                    },
                    {
                        "chapter": "鬼灭之刃：第202话 一起回去吧",
                        "no": 202,
                        "url": "http://mhfm8tel.cdndm5.com/chaptercover/46/45149/698145/20180925181417_128.jpg",
                        "id": "645248_202",
                        "comic_id": "645248",
                        "create_time": "2020-04-23 13:58:47",
                        "update_time": "2020-04-23"
                    },
                    {
                        "chapter": "鬼灭之刃：第201话 鬼之王",
                        "no": 201,
                        "url": "http://mhfm9tel.cdndm5.com/chaptercover/46/45149/695600/20180918164133_30.jpg",
                        "id": "645248_201",
                        "comic_id": "645248",
                        "create_time": "2020-04-23 13:58:47",
                        "update_time": "2020-04-23"
                    },
                    {
                        "chapter": "鬼灭之刃：第200话 胜利的代价",
                        "no": 200,
                        "url": "http://mhfm2tel.cdndm5.com/chaptercover/46/45149/704468/20181009174027_131.jpg",
                        "id": "645248_200",
                        "comic_id": "645248",
                        "create_time": "2020-04-23 13:58:47",
                        "update_time": "2020-04-23"
                    },
                    {
                        "chapter": "鬼灭之刃：第199话 暌违千年的日出",
                        "no": 199,
                        "url": "http://mhfm3tel.cdndm5.com/chaptercover/46/45149/708056/20181016174014_112.jpg",
                        "id": "645248_199",
                        "comic_id": "645248",
                        "create_time": "2020-04-23 13:58:47",
                        "update_time": "2020-04-23"
                    },
                    {
                        "chapter": "鬼灭之刃：第198话 回过神才发现",
                        "no": 198,
                        "url": "http://mhfm1tel.cdndm5.com/chaptercover/46/45149/715733/20181030211949_111.jpg",
                        "id": "645248_198",
                        "comic_id": "645248",
                        "create_time": "2020-04-23 13:58:47",
                        "update_time": "2020-04-23"
                    },
                    {
                        "chapter": "鬼灭之刃：第202话 一起回去吧",
                        "no": 202,
                        "url": "http://mhfm7tel.cdndm5.com/chaptercover/46/45149/694053/20180927192905_17.jpg",
                        "id": "645248_202",
                        "comic_id": "645248",
                        "create_time": "2020-04-23",
                        "update_time": "2020-04-23"
                    },
                    {
                        "chapter": "鬼灭之刃：第201话 鬼之王",
                        "no": 201,
                        "url": "http://mhfm9tel.cdndm5.com/chaptercover/46/45149/695600/20180918164133_30.jpg",
                        "id": "645248_201",
                        "comic_id": "645248",
                        "create_time": "2020-04-23",
                        "update_time": "2020-04-23"
                    }],
                currentPage:1,
                pageSize:50,
                total:0,
                isCollected:'no',
                recommend:[]


            }
        },

        watch: {
            '$route' (to, from) { //监听路由是否变化
                if(this.$route.params.id){// 判断条件1  判断传递值的变化
                    this.id=this.$route.params.id
                    this.getComicByComicId()
                    this.isCollectedByUser()
                    this.search()
                }
            }
        },
        created(){
            this.id=this.$route.params.id
            console.log('11111')
            console.log(this.$route.params.id)
            this.getComicByComicId()
            this.isCollectedByUser()
            this.search()
            this.getRandom()
        },
        methods:{
            getComicByComicId:function(){
                this.$axios.get('/getComicByComicId',{
                    params: {
                        comicId: this.id,
                    }
                }).then(chapter_response =>{
                   this.item=chapter_response.data.data.data
                })
            },
            add:function(chap) {
                let params = new FormData()
                params.append('userId', localStorage.getItem('id'))
                params.append('comicId', this.item.id)
                params.append('title',this.item.title)
                params.append('chapterId',chap.id)
                params.append('chapter',chap.chapter)
                params.append('url',chap.url)
                this.$axios.post('/recordRead',params).then()
            },
            addCollect:function(item) {
                let params = new FormData()
                params.append('userId', localStorage.getItem('id'))
                params.append('comicId', item.id)
                params.append('title',item.title)
                params.append('url',item.url)
                params.append('pics',item.pics)
                this.$axios.post('/addCollect',params).then(comic_response =>{
                    if (comic_response.data.code===200){
                        this.$message.success('订阅成功');
                        this.isCollected='yes'
                    }
                })
            },
            isCollectedByUser:function(){
                let params = new FormData()
                params.append('userId', localStorage.getItem('id'))
                params.append('comicId', this.id)
                this.$axios.post('/isComicCollectedByUser',params).then(comic_response =>{
                    this.isCollected=comic_response.data.data
                })
            },
            getRecommend:function() {
                this.$axios.get('/getRecommendByUser',{
                    params: {
                        userId:localStorage.getItem('id')
                    }
                }).then(comics_response =>{
                    if (comics_response.data.data.length!=0){
                        this.recommend=comics_response.data.data
                    }
                    else{
                        this.$axios.get('/getRandRecommend',{
                            params: {
                                limit:10
                            }
                        }).then(a_response =>{
                            this.recommend=a_response.data.data
                        })
                    }
                    console.log(this.recommend)
                })
            },
            getRandom:function(){
                this.$axios.get('/getRandRecommend',{
                    params: {
                        limit:10
                    }
                }).then(a_response =>{
                    this.recommend=a_response.data.data
                })
            },
            search:function() {
                this.$axios.get('/getAllChapterByComicId',{
                    params: {
                        comicId: this.id,
                        currentPage: this.currentPage,
                        pageSize: this.pageSize
                    }
                }).then(chapter_response =>{
                    this.chapter=chapter_response.data.data.content
                    this.currentPage=chapter_response.data.data.currentPage
                    this.pageSize=chapter_response.data.data.pageSize
                    this.total=chapter_response.data.data.totalPages
                })
            },
            refresh:function(value) {
                this.id=value;
                this.getComicByComicId();
                this.isCollectedByUser()
                this.search()
                this.getRandom()
                window.scrollTo(0,0);
            }
        }
    }
</script>

<style lang="scss" scoped>
    a:link {

        color: black;
        text-decoration: none;
    }
    a:visited {

        color: black;
        text-decoration: none;
    }
    a:hover {

        color: black;
        text-decoration: underline;
    }
    .all{
        margin-top: 80px;
        margin-right: 30px;
        margin-left: 30px;
    }
    .chapter{
        margin: 10px;
    }
    .chapter-item{
        margin: 10px;
    }
    .item{
        margin-left: 100px;
        margin-right: 100px;
        display: flex;
        justify-content: center;
        margin-bottom: 30px;
    }
    .chapter{
        margin-left: 100px;
        margin-right: 100px;
    }
    .middleLeft{
        margin-left: 100px;
    }
    .left{
        width: 220px;
        margin-top: -40px;
        margin-right: 30px;
    }
    .right{
        width:1000px;
        margin-top: 30px;
    }
    .item-line {
        font-size: 14px;
        color: #686868;
        letter-spacing: 0px;
        margin-top: 8px;
        line-height: 18px;
    }
    .item-line span {
        margin-right: 25px;
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .item-line-content {
        font-size: 14px;
        color: #686868;
        letter-spacing: 0px;
        margin-top: 8px;
        position: relative;
        line-height: 20px;
    }
    .item-title {
        font-size: 22px;
        color: #303030;
        letter-spacing: 0;
        font-weight: bold;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: inline-block;
    }
    .search-result{
        margin: 10px 30px 30px 30px;
        background-color:white;
        border-radius: 10px;
    }
    .block{
        text-align: center;
    }
    .imgdiv{
        width: 200px;
        height: 280px;
        border-radius: 50px;
        box-shadow: lightgray 5px 5px 5px 5px ;
    }
    .time {
        font-size: 13px;
        color: #999;
    }

    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }

    .button {
        padding: 0;
        float: right;
    }

    .image {
        width: 100%;
        display: block;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }
    .middleLeft{
        width: 65%;
    }
    .chapter-detail{

        display: flex;
        justify-content: space-between;
        flex-direction: row;
        flex-wrap: wrap;
    }
    .chapter-card{
        margin-bottom: 30px;
        width: 180px;
    }
    .avatar-bar {
        background: #fff;
        border: 1px solid #d9d9d9;
        text-align: center;
        margin-bottom: 30px;
    }
    .avatar {
        width: 80px;
        height: 80px;
        margin-top: 30px;
        border-radius: 50%;
    }
    .middle{
        display: flex;
        justify-content: space-between;
    }
    .middleRight{
        width: 240px;
        margin-right: 40px;
    }
    .title {
        font-size: 20px;
        color: #252525;
        margin-top: 10px;
    }
    .subtitle {
        font-size: 13px;
        color: #252525;
        margin-top: 5px;
    }
    .tip {
        font-size: 13px;
        color: #252525;
        margin-top: 5px;
    }
    .bottom {
        margin-top: 25px;
        padding-bottom: 30px;
    }
    .bottom img {
        margin: 0 15px;
        vertical-align: top;
    }
    .other{
        text-align: center;
    }
    .brief {
        font-size: 12px;
        color: #666;
        margin-top: 4px;
        line-height: 18px;
    }
    .info-title {
        margin-left: 0;
        font-size: 14px;
        color: #252525;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: 700;
    }
    .recommend-block{
        display: flex;
        justify-content: space-between;
        border-bottom: dashed #d9d9d9 0.01em;
        margin-bottom: 5px;
    }
    .cover{
        text-align: center;
        width: 80px;
    }
    .cover img{
        box-shadow: lightgray 2px 2px 2px 2px ;
    }
    .info{
        width: 160px;
    }
    .recommend-bar{
        background: #fff;
        border: 1px solid #d9d9d9;
        margin-bottom: 30px;
    }
    .see-more{
        justify-content: space-between;
        display: flex;
    }
    .see-more-block{
        width: 135px;
    }
    .message {
        display: flex;
        flex-direction: column;
    }
    .message div{
        margin-bottom: 12px;
        flex-direction: row;
    }
    .message input:focus,
    .message textarea:focus{
        border: 1px solid #3399ff;
        border-radius: 5px;
    }
    .message .btn-con{
        text-align: center;
        display: inline-block;
    }
    .message .btn{
        padding: 6px 15px;
        border: 1px solid #39f;
        border-radius: 4px;
        color: #fff;
        background-color: #39f;
        cursor: pointer;
        outline: none;
    }
    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active for below version 2.1.8 */ {
        transform: translateX(10px);
        opacity: 0;
    }
</style>
