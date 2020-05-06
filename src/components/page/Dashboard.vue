<template>
    <div class="dashboard-container">
        <div class="icon">
            <img src="../../styles/放大镜.png" height="100" width="auto">
            <h1>漫搜搜</h1>
        </div>
        <div style="margin-top: 15px;" class="search-input">
            <el-input v-model="input3" placeholder="请输入内容" class="input-with-select" required/>
                <el-button type="primary" icon="el-icon-search" @click="toSearch();addRecord(input3)">搜索</el-button>
            <el-button type="primary" icon="el-icon-search" @click="toAdvanceSearch()">高级搜索</el-button>
        </div>

        <div class="hot">
            <div>
                <img src="../../styles/热门.png" height="20" width="15" class="hot-icon">热门
                <el-button v-for="item in items" round class="hot-item" @click="toHotSearch(item);addRecord(item.keyword)">{{item.keyword}}</el-button>
            </div>
        </div>
        <div class="hot">
            <div>
                <img src="../../styles/日历.png" height="20" width="15" class="hot-icon">历史
                <el-button v-for="item in historys" round class="hot-item" @click="toHotSearch(item)">{{ item.keyword }}</el-button>
                <el-button type="danger" icon="el-icon-delete" circle @click="deleteSerachHistory()"></el-button>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'Dashboard',
        data() {
            return {
                pageSize: 10,
                currentPage:1,
                id:'',
                input3: '',
                items: null,
                historys: null
            }
        },
        created(){

          this.init()
            this.getHotSerach()
            this.getUserSerach()
        },
        methods:{
            toAdvanceSearch: function(){
                this.$router.push({path: 'advanceSearch'})
            },
            toHotSearch: function(item){
                this.$router.push({path: 'search', query: {keyword: item.keyword}})
            },
            init:function() {
                 this.id=localStorage.getItem('id')
            },
            addRecord:function(keyword) {
                let params = new FormData()

                params.append('userId', localStorage.getItem('id'))
                params.append('keyword', keyword )
                this.$axios.post('/addSearch',params).then(successResponse=>{
                    this.getUserSerach()
                })
            },
            getHotSerach:function() {
                this.$axios.get('/getHotSearch',{
                    params: {
                        currentPage: this.currentPage,
                        pageSize: this.pageSize
                    }
                }).then(comics_response =>{
                    this.items=comics_response.data.data.content
                })
            },
            getUserSerach:function() {
                this.$axios.get('/getAllSearchByUserId',{
                    params: {
                        userId:localStorage.getItem('id'),
                        currentPage: this.currentPage,
                        pageSize: this.pageSize
                    }
                }).then(comics_response =>{
                    this.historys=comics_response.data.data.content
                })
            },
            deleteSerachHistory:function() {
                let params = new FormData()
                params.append('userId', localStorage.getItem('id'))
                this.$axios.post('/clearAllSearchByUserId',params).then(successResponse =>{
                    this.getUserSerach()
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .dashboard {
        &-container {
            margin: 30px;
        }
        &-text {
            font-size: 30px;
            line-height: 46px;
        }
    }

    .hot{
        text-align: center;
        color: #FF6F26;
        margin-top: 20px;
    }
    .icon{
        text-align: center;
    }
    .hot-item{
        color: #FF6F26;
    }
    .hot-icon{
        padding-top: 5px;
    }
    .hot-title{
        color: #FF6F26;
    }
    .icon{
        margin: auto;
    }
    .search-input{
        display: flex;
        justify-content: space-between;
    }
    .el-select .el-input {
        width: 130px;
    }
    .input-with-select .el-input-group__prepend {
        background-color: #FF7E2E;
    }
    .search-button{
        color: #FF7E2E;
    }
</style>
