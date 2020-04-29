<template>
  <div class="hello">
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#000000"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1">码段生成</el-menu-item>
      <el-submenu index="2">
        <template slot="title">APP版本</template>
        <el-menu-item index="2-1">获取版本</el-menu-item>
        <el-menu-item index="2-2">上传版本</el-menu-item>
      </el-submenu>
      <el-menu-item index="3">客户查询</el-menu-item>
      <el-submenu index="4" style="float:right">
        <template slot="title">{{username}}</template>
        <el-menu-item style="text-align:center" index="4-1" @click="logout()">退出</el-menu-item>
      </el-submenu>
    </el-menu>
    <div style="margin-top:20px">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username:localStorage.getItem('username')+"|"+localStorage.getItem('nickname'),
      activeIndex: '',
      activeIndex2: ''
    }
  },
  methods:{
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      if(key==='1'){
        this.$router.push('/createCode');
      } else if(key==='2-1'){
        this.$router.push('/getVersion');
      } else if(key==='2-2'){
        this.$router.push('/setVersion');
      } else if(key==='3'){
        this.$router.push('/listPerson');
      }
    },
    logout(){
      this.$confirm('确认退出吗？','提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      }).then(() => {
        this.$axios({
          method:'post',
          url:'/logout'
        }).then(res => {
          localStorage.removeItem('Authorization');
          localStorage.removeItem('username');
          localStorage.removeItem('nickname');
          this.$router.push('/');
        }).catch(res => {
          console.log('注销出错:'+res);
        });
      }).catch(() => {
        // this.$message({
        //   type:'info',
        //   message:'已取消'
        // })
      });
    }
  }
}

</script>

