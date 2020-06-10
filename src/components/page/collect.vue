<template>

    <div class="all">
        <div class="content">
            <div class="search-result">
                <p class="item-title">
                    我的收藏
                </p>
                <div class="search-result-inside" >
                    <div v-for="item in items" class="item">
                        <div class="left">
                            <div class="imgdiv">
                                <img :src="item.pics" alt="" width="200px" height="auto" class="img">
                            </div>

                            <span class="item-title">
                              <el-button type="primary" round icon="el-icon-star-off" size="mini" class="cancel-button" @click="toDetail(item.comicId)" >查看详情</el-button>
                                <el-button type="danger" round icon="el-icon-delete" size="mini" class="cancel-button" @click="cancelCollect(item.collectId)" >取消收藏</el-button>
                            </span>
                        </div>

                    </div>
                </div>
                <div class="block" v-if="total!=0">
                    <el-pagination
                            layout="prev, pager, next"
                            :current-page.sync="currentPage"
                            :page-count="total"
                            @current-change="add">
                    </el-pagination>
                </div>
                <transition name="bounce">

                <div v-if="total==0"><img src="../../styles/null.png" height="50" width="50" style="margin-bottom: -10px"  />您似乎未收藏过漫画~</div></transition>
            </div>
        </div>
    </div>
</template>

<script>


    export default {
        name: 'search',
        data() {
            return {
                total:20,
                keyword: '',
                currentPage:1,
                pageSize:10,
                items:null
            }
        },
        created(){
            this.add()
        },
        methods:{
            init:function(keyword){
                this.keyword=keyword
            },
            add:function() {
                this.$axios.get('/getAllCollectByUserId',{
                    params: {
                        userId: localStorage.getItem('id'),
                        currentPage: this.currentPage,
                        pageSize: this.pageSize
                    }
                }).then(comics_response =>{
                    this.items=comics_response.data.data.content
                    this.total=comics_response.data.data.totalPages
                })
            },
            search:function() {
                let params = new FormData()
                params.append('keyword', this.keyword)
                params.append('pageSize', this.pageSize)
                params.append('currentPage', this.currentPage)
                this.$axios.get('/searchComic',{
                    params: {
                        keyword: this.keyword,
                        pageSize: this.pageSize,
                        currentPage: this.currentPage
                    }
                }).then(comics_response =>{
                    this.items=comics_response.data.data.content
                    this.total=comics_response.data.data.totalPages
                    console.log(comics_response.data.data.totalPages)
                })
            },
            toDetail:function(comicId) {
                console.log('toDe')
                console.log(comicId)
                this.$router.push({name: 'comicDetail', params: {id: comicId}})
            },
            cancelCollect:function(collectId) {
                let params = new FormData()
                params.append('collectId', collectId)
                this.$axios.post('/deleteCollectByCollectId',params).then(comics_response =>{
                    location.reload()
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .chapter{
        margin: 10px;
    }
    /*.item{*/
    /*    display: flex;*/
    /*    justify-content: center;*/
    /*}*/
    .left{
        width: 220px;
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
        display: flex;
    }
    .search-result{
        margin: 20px 30px 30px 30px;
    }
    /*.icon-pic{*/
    /*    margin-top: 15px;*/
    /*}*/
    /*.hot{*/
    /*    text-align: center;*/
    /*    color: #FF6F26;*/
    /*    margin-top: 20px;*/
    /*}*/
    .icon-inside{
        display: flex;
        justify-content: center;
    }
    .icon{
        text-align: center;
    }
    .img{
        box-shadow: lightgray 5px 5px 5px 5px ;
    }
    .icon-inside{
        display: flex;
        justify-content: center;
    }
    .icon-pic{
        margin-top: 15px;
    }
    .icon{
        text-align: center;
    }
    .item{
        display: flex;
        justify-content: center;
    }
    .left{
        width: 220px;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .item-line span {
        margin-right: 25px;
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
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
        width: 95%;
        margin: 20px 30px 30px 30px;
    }
    .search-result-inside{
        width: 100%;
        display: flex;
        justify-content: inline-block;
        flex-direction: row;
        flex-wrap: wrap;
    }
    .icon-pic{
        margin-top: 15px;
    }

    .icon-inside{
        display: flex;
        justify-content: center;
    }
    .icon{
        text-align: center;
    }

    .icon{
        margin: auto;
    }
    .el-select .el-input {
        width: 130px;
    }
    .input-with-select .el-input-group__prepend {
        background-color: #FF7E2E;
    }
    .block{
        text-align: center;
    }
    .imgdiv{
        height: 280px;
        width: 200px;
    }
    .bounce-enter-active {
        animation: bounce-in .5s;
    }
    .bounce-leave-active {
        animation: bounce-in .5s reverse;
    }
    @keyframes bounce-in {
        0% {
            transform: scale(0);
        }
        30%{
            transform: scale(0.3);
        }
        70% {
            transform: scale(0.7);
        }
        100% {
            transform: scale(1);
        }
    }
</style>
