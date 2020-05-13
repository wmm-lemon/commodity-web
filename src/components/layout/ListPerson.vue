<template>
<div>
    <span style="font-size:22px;font-weight:bold">客户列表</span>
    <el-form :inline="true" class="demo-form-inline" align="right">
        <el-form-item label="">
            <el-input v-model="nameParam" prefix-icon="el-icon-search" placeholder="搜索关键词" @keyup.enter.native="getlist()" @blur="getlist()"/>
        </el-form-item>
        <el-form-item>
            <el-button  @click="getlistExport()" type="primary">下载<i class="el-icon-download el-icon--right"></i></el-button>
        </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width:100%" :default-sort="{prop:'createtime',order:'descending'}">
        <el-table-column prop="username" label="姓名" sortable></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="company" label="公司" sortable></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="type" label="类型" sortable></el-table-column>
        <el-table-column prop="createtime" label="时间" sortable></el-table-column>
    </el-table>
    <el-pagination align="right"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
</div>
    
</template>
<script>
export default {
    data(){
        return{
            nameParam:'',
            tableData:[],
            currentPage:1,
            pageSize:10,
            total:0
        }
    },
    created(){
        this.getlist();
    },
    methods:{
        //获取列表
        getlist: function(){
            this.$axios.get('/person/getPersionList', {
                params: {
                    currentPage: this.currentPage,
                    pageSize:this.pageSize,
                    nameParam:this.nameParam
                }
            })
            .then((res) => {
                console.log(res);
                if(res.data.code===1){
                    this.total=res.data.data.list.totalElements;
                    this.tableData=res.data.data.list.content;
                }else{
                    alert(res.data.msg_cn);
                }
            })
            .catch((error) => {
                console.log(error);
                this.$router.push("/");
            });
        },
        handleSizeChange(val){
            console.log(`每页 ${val} 条`);
            this.pageSize = val;
            console.log("pageSize:"+this.pageSize);
            this.getlist();
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage = val;
            console.log("currentPage:"+this.currentPage);
            this.getlist();
        },
        goBack() {
            this.$router.go(-1);
        },
        getlistExport: function(){
            this.$axios.get('/person/getlistExport', {
                params: {
                    nameParam:this.nameParam
                }
            })
            .then((response) => {
                console.log(response);
                if(response.data.data!=null){
                    this.export2Excel(response.data.data);
                }
                
            })
            .catch((error) => {
                console.log(error);
                //this.$router.push("/");
            });
        },
        export2Excel(list){
          require.ensure([], () => {
            const { export_json_to_excel } = require('../../vendor/Export2Excel');
            //头
            const tHeader = [ '姓名', '电话', '公司','邮箱','类型','时间'];
            //对应的标签
            const filterVal = ['username', 'phone', 'company', 'email', 'type', 'createtime'];
            //标签对应的内容  是一个数组结构            
            //const list = this.tableData;
            //一个方法 我也不知道干嘛的
            const data = this.formatJson(filterVal, list);
            export_json_to_excel(tHeader, data, '列表excel');
          })
        },
        formatJson(filterVal, jsonData){
            return jsonData.map(v => filterVal.map(j => v[j]))
        },
    }
}
</script>