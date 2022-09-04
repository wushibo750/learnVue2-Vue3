<template>
<div>
  UserList组件
</div>
</template>

<script>
export default {
  name: "UserList",
  data(){
    return{
      userList:[]
    }
  },
  created() {
    this.getUserList()
  },
  methods:{
    //请求用户列表的数据
    async getUserList(){
        //相当于res.data
        const {data:res}=await this.$http.get('/api/users')
        if(res.status!==0){
          return console.log("用户列表数据请求失败！")
        }
        this.userList=res.data;
        //res.data.data才能获得数据
        console.log("res的数据===》",res)
        console.log("res.data的数据===》",res.data)
    }
  }
}
</script>

<style scoped lang="less">

</style>