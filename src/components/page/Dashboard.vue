<template>
    <transition
            appear
            appear-class="custom-appear-class"
            appear-to-class="custom-appear-to-class" (2.1.8+)
            appear-active-class="custom-appear-active-class"
    >
    <div class="dashboard-container">
        <div class="icon">
            <img src="../../styles/放大镜.png" height="100" width="auto">
            <h1>漫搜搜</h1>
        </div>
        <div style="margin-top: 15px;" class="search-input">
            <el-autocomplete  v-model="input3" placeholder="请输入内容" class="input-with-select" required @keyup.enter.native="toSearch();addRecord(input3)" @select="handleSelect" :fetch-suggestions="querySearchAsync"></el-autocomplete>
            <el-button type="primary" icon="el-icon-search" @click="toSearch();addRecord(input3)">搜索</el-button>
            <el-button type="primary" icon="el-icon-search" @click="toAdvanceSearch()">高级搜索</el-button>
        </div>

        <div class="hot">
            <div>
                <img src="../../styles/热门.png" height="20" width="auto" class="hot-icon">热门
                <el-button v-for="item in items" round class="hot-item" @click="toHotSearch(item);addRecord(item.keyword)">{{item.keyword}}</el-button>
            </div>
        </div>
        <div class="hot">
            <div>
                <img src="../../styles/日历.png" height="20" width="auto" class="hot-icon">历史
                <el-button v-for="item in historys" round class="hot-item" @click="toHotSearch(item)">{{ item.keyword }}</el-button>
                <el-button type="danger" icon="el-icon-delete" circle @click="deleteSerachHistory()"></el-button>
            </div>
        </div>
        <br>
        <div class="everyday">
            <img src="../../styles/关注.png" height="20" width="auto" class="hot-icon">每日推荐
        </div>
        <div class="search-result-inside">
            <div v-for="item in recommend" class="item">
                <div class="left">
                    <router-link :to="{name: 'comicDetail', params: {id: item.comicId}}" >
                    <img :src="item.pics" alt="" width="150px" height="auto" class="img" >
                    </router-link>
                </div>

            </div>
        </div>
    </div>
    </transition>
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
                historys: null,
                restaurants: [],
                state: '',
                timeout:  null,
                recommend:null
            }
        },
        mounted() {
            this.restaurants= this.loadAll();
        },
        created(){

          this.init()
            this.getHotSerach()
            this.getUserSerach()
            this.getRecommend()
        },
        methods:{
            add:function(item) {
                let params = new FormData()
                params.append('userId', localStorage.getItem('id'))
                params.append('comicId', item.id)
                params.append('title',item.title)
                params.append('url',item.url)
                params.append('pics',item.pics)
                this.$axios.post('/recordRead',params)
            },
            loadAll() {
                return [
                    {
                        "index": 1,
                        "value": "盘龙"
                    },
                    {
                        "index": 2,
                        "value": "Phantasy幻想国度"
                    },
                    {
                        "index": 3,
                        "value": "偏偏喜欢你"
                    },
                    {
                        "index": 4,
                        "value": "叛逆王子（禾林漫画）"
                    },
                    {
                        "index": 5,
                        "value": "叛逆神令"
                    },
                    {
                        "index": 6,
                        "value": "平行恋人"
                    },
                    {
                        "index": 7,
                        "value": "庖厨天下"
                    },
                    {
                        "index": 8,
                        "value": "庞贝街63号"
                    },
                    {
                        "index": 9,
                        "value": "怦然心情"
                    },
                    {
                        "index": 10,
                        "value": "扑倒那只傲娇"
                    }
                ];
            },
            querySearchAsync(queryString, cb) {
                // var restaurants = this.restaurants;
                this.$axios.get('/getSuggest',{
                    params: {
                        keyword:this.input3
                    }
                }).then(comics_response =>{
                    if (comics_response.data.data!=null){
                        this.restaurants=comics_response.data.data;
                        var restaurants = this.restaurants;
                        var results =  restaurants;
                    }
                    console.log(comics_response.data.data)



                    // clearTimeout(this.timeout);
                    // this.timeout = setTimeout(() => {
                        cb(results);
                    // }, 3);

                })


            },
            createStateFilter(queryString) {
                return (state) => {
                    return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            handleSelect(item) {
                this.$router.push({path: 'search', query: {keyword: this.input3}})
            },
            toSearch: function(){
                this.$router.push({path: 'search', query: {keyword: this.input3}})
            },
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
    .el-select .el-input .el-autocomplete{
        width: 300px;
    }
    .hot{
        text-align: center;
        color: #FF6F26;
        margin-top: 20px;
    }

    .recommend{
        text-align: center;
        background-color: red;

    }
    .item{
        display: flex;
        justify-content: space-between;
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
        justify-content: center;
        align-content: flex-start
    }
    .search-input div{
        width: 60%;
    }
    .el-select .el-input {
        width: 60%;
    }
    .input-with-select .el-input-group__prepend {
        background-color: #FF7E2E;
    }
    .search-button{
        color: #FF7E2E;
    }
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
    .everyday{
        padding-left: 10px;
        color: #FF7E2E;
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
        width: 100%;
        margin: 20px 30px 30px 30px;
    }
    .search-result-inside{
        width: 100%;
        display: flex;
        justify-content: space-around ;
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
        position: absolute;
        width: 100%;
    }
    .block{
        text-align: center;
    }

</style>
