<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">漫搜搜</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="password"
                        v-model="param.password"
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
                <div class="login-btn">
                    <el-button type="primary" @click="handleReg()">注册</el-button>
                </div>
            </el-form>
        </div>

        <el-dialog title="注册用户" :visible.sync="regVisible" width="30%">
            <el-form ref="reg" :model="reg" :rules="rules" label-width="70px">
                <el-form-item prop="username" label="用户名">
                    <el-input v-model="reg.username"  ></el-input>
                </el-form-item>
                <el-form-item prop="password1" label="密码" >
                    <el-input v-model="reg.password1" type="password"></el-input>
                </el-form-item>
                <el-form-item prop="password2" label="密码" >
                    <el-input v-model="reg.password2" type="password"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
		        <el-button @click="regVisible = false">取 消</el-button>
		        <el-button type="primary" @click="submitReg()">确 定</el-button>
		    </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            regVisible:false,
            reg:{
                username: '',
                password1:'',
                password2:''
            },
            param: {
                username: 'admin',
                password: '111111',
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            },
        };
    },
    methods: {
        handleReg(){
            this.regVisible = true;
        },
        submitReg(){
            this.$refs.reg.validate(vaild=>{
                if(vaild){
                    let params = new FormData()
                    params.append('username', this.reg.username)
                    params.append('password1', this.reg.password1)
                    params.append('password2', this.reg.password2)
                    this.$axios.post('/reg',params).then(successResponse =>{
                        if (successResponse.data.code===200){
                            this.regVisible = false;
                            this.$message.success(successResponse.data.data);

                        }
                        else{
                            this.$message.error(successResponse.data.data)
                        }
                    })
                }else{
                    return false;
                }


            });
        },
        submitForm() {
            this.$refs.login.validate(valid => {
                if (valid) {
                    let params = new FormData()
                    params.append('username', this.param.username)
                    params.append('password', this.param.password)
                    this.$axios.post('/login',params).then(successResponse =>{
                        if (successResponse.data.code===200){
                            this.$message.success('登录成功');
                            localStorage.setItem('ms_username',  this.param.username);
                            localStorage.setItem('id', successResponse.data.data);
                            this.$router.push('/');
                        }
                        else{
                            this.$message.error('登录失败')
                        }
                    })

                } else {
                    this.$message.error('请输入账号和密码');
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    },
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>
