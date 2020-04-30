<template>

    <div class="all">
        <div class="search-result">
            <div  class="item">
                <div class="left">
                    <img :src="item.pics" alt="" width="200px" height="auto">
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
                        <p>
                            <el-button type="primary" round icon="el-icon-message-solid" size="medium" class="cancel-button" @click="addCollect(item)">订阅</el-button>
                        </p>
                    </div>

                </div>
            </div>
            <div class="chapter">

                <el-button type="primary" plain  round v-for="chap in chapter" class="chapter-item" @click="add(chap)"><a :href="chap.url" target="_blank">第{{chap.no}}章 &nbsp;{{chap.chapter}}</a></el-button>
            </div>
        </div>
        <div class="page">
            <!--      <pagination v-show="total>0" :total="total" :page.sync="currentPage" :limit.sync="pageSize" @pagination="getList" />-->
        </div>
    </div>
</template>

<script>


    export default {
        name: 'search',
        data() {
            return {
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
                chapter:null,
                currentPage:1,
                pageSize:10,
                total:0


            }
        },

        watch: {
            // 方法1
            '$route' (to, from) { //监听路由是否变化
                if(this.$route.params.data){// 判断条件1  判断传递值的变化
                    this.item=this.$route.params.data
                    this.search()
                }
            }
        },
        created(){
            this.item=this.$route.params.data
            console.log('11111')
            console.log(this.$route.params.data)
            this.search()
            // this.search()
        },
        methods:{
            init:function(keyword){
                this.item=this.$route.params.data
            },
            add:function(chap) {
                let params = new FormData()
                params.append('userId', localStorage.getItem('id'))
                params.append('comicId', this.item.id)
                params.append('title',this.item.title)
                params.append('chapterId',chap.id)
                params.append('chapter',chap.chapter)
                params.append('url',chap.url)
                this.$axios.post('/recordRead',params)
            },
            addCollect:function(item) {
                let params = new FormData()
                params.append('userId', localStorage.getItem('id'))
                params.append('comicId', item.id)
                params.append('title',item.title)
                params.append('url',item.url)
                params.append('pics',item.pics)
                this.$axios.post('/addCollect',params)
            },
            search:function() {
                let params = new FormData()
                params.append('keyword', this.keyword)
                params.append('pageSize', this.pageSize)
                params.append('currentPage', this.currentPage)
                this.$axios.get('/getAllChapterByComicId',{
                    params: {
                        comicId: this.item.id,
                        currentPage: this.currentPage,
                        pageSize: this.pageSize
                    }
                }).then(chapter_response =>{
                    this.chapter=chapter_response.data.data.content
                    this.currentPage=chapter_response.data.data.currentPage
                    this.pageSize=chapter_response.data.data.pageSize
                    this.total=chapter_response.data.data.totalPages
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .all{
        margin-top: 80px;
        margin-right: 100px;
        margin-left: 100px;
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
    }
    .chapter{
        margin-left: 100px;
        margin-right: 100px;
    }
    .left{
        width: 220px;
        margin-top: -40px;
    }
    .right{
        width:1000px;
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
        margin: 20px 30px 30px 30px;
        background-color:white;
        border-radius: 10px;
    }
</style>
