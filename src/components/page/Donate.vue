<template>

    <div class="all">
        <div class="content">
            <div class="search-result">
                <p class="item-title">
                    今日
                </p>
                <div class="search-result-inside">
                    <div v-for="item in items" class="item">
                        <div class="left">
                            <img :src="item.pics" alt="" width="200px" height="auto" class="img">
                            <span class="item-title">
              {{ item.title }}
            </span>
                        </div>

                    </div>
                </div>
                <br>
                <br>
                <p class="item-title">
                    昨日
                </p>
                <div class="search-result-inside">
                    <div v-for="item in items" class="item">
                        <div class="left">
                            <img :src="item.pics" alt="" width="200px" height="auto">
                            <span class="item-title">
              {{ item.title }}
            </span>
                        </div>

                    </div>
                </div>
                <br>
                <br>
                <p class="item-title">
                    早些时候
                </p>
                <div class="search-result-inside">
                    <div v-for="item in items" class="item">
                        <div class="left">
                            <img :src="item.pics" alt="" width="200px" height="auto">
                            <span class="item-title">
              {{ item.title }}
            </span>
                        </div>

                    </div>
                </div>

            </div>
            <div class="right">
                <p class="item-title">
                    搜索历史
                </p>

            </div>
        </div>
    </div>
</template>

<script>


    export default {
        name: 'search',
        data() {
            return {
                total:0,
                keyword: '',
                currentPage:1,
                pageSize:20,
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
                this.$axios.get('/getAllReadByUserId',{
                    params: {
                        userId: localStorage.getItem('id'),
                        currentPage: this.currentPage,
                        pageSize: this.pageSize
                    }
                }).then(comics_response =>{
                    this.items=comics_response.data.data.content
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
            toDetail:function(item) {
                console.log('toDe')
                console.log(item)
                this.$router.push({name: 'comicDetail', params: {data: item}})
            }
        }
    }
</script>

<style lang="scss" scoped>
    .chapter{
        margin: 10px;
    }
    .item{
        display: flex;
        justify-content: center;
    }
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
        display: inline-block;
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
        margin: 20px 30px 30px 30px;
    }
    .search-result-inside{
        display: flex;
        align-content:space-around;
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
</style>
