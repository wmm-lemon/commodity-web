<template>
    <div id="login">
    <img src="../assets/logo.jpg" width="400px" height="300px"/>
    <el-row :gutter="20">
      <el-col :span="8" :offset="8">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username" autocomplete="off" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapMutations } from 'vuex';
export default {
    name:'login',
    data(){
        var validateUsername = (rule,value,callback) =>{
            if(value===''){
                callback(new Error('请输入账号'));
            }else{
                callback();
            }
        };
        var validatePassword = (rule,value,callback) => {
            if(value===''){
                callback(new Error('请输入密码'));
            }else{
                callback();
            }
        };
        return{
            ruleForm:{
                username:'',
                password:''
            },
            rules:{
                username:[
                    {validator:validateUsername,trigger:'blur'}
                ],
                password:[
                    {validator:validatePassword,trigger:'blur'}
                ]
            }
        }
    },
    methods:{
        ...mapMutations(['changeLogin']),
        submitForm(formName){
            var _this = this;
            this.$refs[formName].validate((valid) => {
                if(valid){
                    var params = new URLSearchParams();
                    params.append('username',this.ruleForm.username);
                    params.append('password',this.ruleForm.password);
                    this.$axios({
                        method:'post',
                        url:'/login',
                        data:params
                    }).then(res => {
                        if(res.data.code===1){
                            console.log(res.data);
                            var username = res.data.data.user.username;
                            var nickname = res.data.data.nickname;
                            var authorization = res.headers.authorization;
                            _this.changeLogin({Authorization: authorization,username:username,nickname:nickname})
                            this.$router.push('/helloWorld');
                        }else{
                            alert(res.data.msg_cn);
                        }
                    }).catch(error => {
                        console.log("登录错误"+error);
                        alert("服务器错误！");
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>