<template>
<div>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>用户详情</span>
        <el-button class="button" @click="goBack" text>返回</el-button>
      </div>
    </template>
    <div  class="text item">
      <p>姓名:{{userInfo.name}}</p>
      <p>年龄:{{userInfo.age}}</p>
      <p>职位:{{userInfo.position}}</p>
    </div>
  </el-card>
</div>
</template>
<script>
export default {
  name: "UserDetail",
  props:['id'],
  data(){
    return{
      userInfo:{}
    }
  },
  created() {
    this.getUserInfo()
  },
  methods:{
    async getUserInfo(){
      const {data:res}=await this.$http.get('/api/users/'+this.id);
      if(res.status!==0)
         return this.$message.error("获取用户详细数据失败！")
      this.userInfo=res.data;
      console.log("跳转返回的数据为===>",this.userInfo)
    },
    goBack(){
      this.$router.go(-1)  //后退一步
    }
  }
}
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
}

</style>