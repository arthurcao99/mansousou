<template>

  <div class="all">
    <div class="dashboard-container">
      <div class="icon">
        <div class="icon-inside">
          <img src="../../styles/放大镜.png" height="40" width="auto" class="icon-pic">
          <h2>漫搜搜</h2>
        </div>
      </div>
      <div style="margin-top: 15px;" class="search-input">
        <el-input v-model="keyword" placeholder="请输入内容" class="input-with-select" required />

        <el-button type="primary" icon="el-icon-search" @click="search();addRecord()">搜索</el-button>

      </div>
    </div>
            <div class="search-result">
                <div v-for="item in items" class="item">
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
                            <p class="button">
                                <el-button type="primary" round icon="el-icon-star-off" size="medium" class="cancel-button" @click="toDetail(item.id);add(item)" >查看详情</el-button>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
    <div class="page">
        <el-pagination
                background
                layout="prev, pager, next"
                :page-count="total"
                :current-page.sync="currentPage"
                @current-change="search">
        </el-pagination>
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
        pageSize:10,
        items:null
      }
    },
      watch:{
          '$route' (to, from) { //监听路由是否变化
              if(this.$route.query.keyword){// 判断条件1  判断传递值的变化
                  this.keyword=this.$route.query.keyword
                  this.search()
              }
          }
      },
    created(){
      this.keyword=this.$route.query.keyword
      console.log(this.keyword)
      this.search()
    },
    methods:{
      init:function(keyword){
          this.keyword=keyword
      },
        add:function(item) {
            let params = new FormData()
            params.append('userId', localStorage.getItem('id'))
            params.append('comicId', item.id)
            params.append('title',item.title)
            params.append('url',item.url)
            params.append('pics',item.pics)
            this.$axios.post('/recordRead',params)
        },
        addRecord:function() {
            let params = new FormData()
            params.append('userId', localStorage.getItem('id'))
            params.append('keyword', this.keyword)
            this.$axios.post('/addSearch',params)
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
        margin-bottom: 30px;
    }
    .left{
        width: 220px;
        margin-right: 50px;
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
    .search-input{
        display: flex;
        justify-content: space-between;
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
        padding-left: 150px;
        padding-right: 150px;
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
    .dashboard-container{
        padding-left: 100px;
        padding-right: 100px;
    }
    .page{
        text-align: center;
    }


</style>
