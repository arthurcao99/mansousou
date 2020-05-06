<template>

  <div class="all">
      <div class="searh-block" v-show="Vresult">
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
      <el-form ref="form" :model="form" label-width="80px" v-show="Vsearch">
          <el-form-item label="标题">
              <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="作者">
              <el-input v-model="form.author"></el-input>
          </el-form-item>
          <el-form-item label="类型">
              <el-select v-model="form.genre" placeholder="请选择类型">
                  <el-option label="玄幻" value="玄幻"></el-option>
                  <el-option label="都市" value="都市"></el-option>
                  <el-option label="恐怖" value="恐怖"></el-option>
                  <el-option label="校园" value="校园"></el-option>
                  <el-option label="悬疑" value="悬疑"></el-option>
                  <el-option label="科幻" value="科幻"></el-option>
                  <el-option label="生活" value="生活"></el-option>
                  <el-option label="热血" value="热血"></el-option>
                  <el-option label="爆笑" value="爆笑"></el-option>
                  <el-option label="纯爱" value="纯爱"></el-option>
                  <el-option label="推理" value="推理"></el-option>
                  <el-option label="魔幻" value="魔幻"></el-option>
                  <el-option label="历史" value="历史"></el-option>
                  <el-option label="动作" value="动作"></el-option>
                  <el-option label="战争" value="战争"></el-option>
                  <el-option label="彩虹" value="彩虹"></el-option>
                  <el-option label="萌系" value="萌系"></el-option>
                  <el-option label="穿越" value="穿越"></el-option>
                  <el-option label="后宫" value="后宫"></el-option>
                  <el-option label="唯美" value="唯美"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="精确查询">
              <el-switch v-model="form.isExactMatch"></el-switch>
          </el-form-item>
          <el-form-item label="连载状态">
              <el-radio-group v-model="form.status">
                  <el-radio label="连载中"></el-radio>
                  <el-radio label="已完结"></el-radio>
              </el-radio-group>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
      </el-form>
  </div>
</template>

<script>


  export default {
    name: 'advanceSearch',
      data() {
          return {
              Vresult:false,
              Vsearch:true,
              form: {
                  title: '',
                  author: '',
                  genre: '',
                  isExactMatch: false,
                  status: '',
              },
              total:0,
              keyword: '',
              currentPage:1,
              pageSize:10,
              items:null
          }
      },
      methods: {
          onSubmit() {
              console.log('submit!');
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
              this.Vresult=true
              this.Vsearch=false
              var flag=0

              if (this.form.isExactMatch===false){
                  flag=0
              }else{
                  flag=1
              }
              this.$axios.get('/advancedSearch',{
                  params: {
                      title:this.form.title,
                      author:this.form.author,
                      status:this.form.status,
                      genre:this.form.genre,
                      isExactMatch:flag,
                      pageSize: this.pageSize,
                      currentPage: this.currentPage
                  }
              }).then(comics_response =>{
                  this.items=comics_response.data.data.content
                  this.total=comics_response.data.data.totalPages
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
    .search-desc{
        margin-top: 30px;
        margin-bottom: 20px;
        width: 400px;
        background-color: white;
        border-radius: 10px;
        height: 25px;
    }
    .block1{
        display: flex;
        justify-content: center;
        text-align: center;
    }

</style>
