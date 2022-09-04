<template>
  <div>
    <!--  添加按钮-->
    <el-button type="primary" @click="dialogVisible=true">添加按钮</el-button>
    <!-- 用户表格-->
    <el-table :data="userList" stripe style="width: 100%">
      <!--    索引列-->
      <el-table-column type="index" :index="indexMethod"/>
      <el-table-column label="姓名" prop="name"/>
      <el-table-column label="年龄" prop="age"/>
      <el-table-column label="头衔" prop="position"/>
      <el-table-column label="创建时间">
        <template #default="scope">
          {{ $filters.dateFormat(scope.row.addtime) }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <!--  使用作用域插槽 #default不要漏掉-->
<!--        三种简写方法-->
<!--        <template v-slot:default="scope">-->
<!--        <template #default="scope">-->
<!--        <template v-slot="scope">-->
        <template #default="scope">
<!--          <a href="#">详情</a>&nbsp;-->
          <router-link :to="'/users/'+scope.row.id">详情</router-link>&nbsp;
          <a href="#" @click.prevent="onRemove(scope.row.id)">删除{{scope.row.id}}</a>
        </template>
      </el-table-column>
    </el-table>

  </div>
  <!--  添加用户Dialog对话框-->
  <el-dialog
      v-model="dialogVisible"
      title="添加新用户"
      width="50%"
      @close="onDialogClosed"
  >
<!--  添加用户表单-->
    <span>
      <el-form :model="form" :rules="formRules" label-width="120px" ref="myaddForm">
<!--        rules配置以后，还要配置每个item中的prop-->
          <el-form-item label="用户姓名" prop="formRules.name">
              <el-input v-model="form.name"/>
          </el-form-item>
          <el-form-item label="用户年龄" prop="formRules.age">
              <el-input v-model="form.age"/>
          </el-form-item>
          <el-form-item label="用户职务" prop="formRules.position">
              <el-input v-model="form.position"/>
          </el-form-item>
      </el-form>
    </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onAddNewUser">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: "UserList",
  data() {
    //声明校验年龄的函数
    // let checkAge=(rule,value,cb)=>{
    //   if(!Number.isInteger(value)){
    //     return cb(new Error("请填写整数！"))
    //   }
    //   if(value>100 || value<1){
    //     return cb(new Error("年龄必须在1-100之间！"))
    //   }
    //   cb()
    // };
    return {
      userList: [],
      dialogVisible:false,
      form:{
        name:'',
        age:'',
        position:''
      },
      formRules:{
        name: [
          { required: true, message: '必填项', trigger: 'blur' },
          { min: 3, max: 5, message: '长度为3-5', trigger: 'blur' },
        ],
        // 增加自定义声明校验 {validator:checkAge,trigger: 'blur'},
        age:[
          { required: true, message: '必填项', trigger: 'blur' },
          { min: 1, max: 2, message: '长度为3-5', trigger: 'blur' }
        ],
        position:[
          { required: true, message: '必填项', trigger: 'blur' },
          { min: 3, max: 5, message: '长度为3-5', trigger: 'blur' },
        ]
      }
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    //索引列
    indexMethod(index) {
      return index + 1
    },
    //请求用户列表的数据
    async getUserList() {
      //相当于res.data
      const {data: res} = await this.$http.get('/api/users')
      if (res.status !== 0) {
        return console.log("用户列表数据请求失败！")
      }
      this.userList = res.data;
      //res.data.data才能获得数据
      console.log("res的数据===》", res)
      console.log("res.data的数据===》", res.data)
    },
    //监听对话框关闭事件
    onDialogClosed(){
      console.log('ok')
      //清空表单
      this.$refs.myaddForm.resetFields();
    },
    //用户点击添加按钮
    onAddNewUser(){
       this.$refs.myaddForm.validate(async(valid)=> {
         console.log(valid)
         if (!valid) return;
         //执行添加操作
         let {data:res} =await this.$http.post('/api/users',this.form)
         if(res.status !==0) return this.$message.error("添加失败！")
         console.log("添加成功！")
         this.$message.success("添加成功！")
         console.log("res数据为==》",res)
       })
         this.dialogVisible=false
         //清空表单
         this.$refs.myaddForm.resetFields();
         //重新获取数据
         this.getUserList()
      },
    //点击删除拦截
      async onRemove(id){
        console.log("点击删除了")
        const confirmResult=await this.$confirm('此操作将永久删除该用户,是否进行？','提示',{
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning'
        }).catch(err=>{
          console.log(err)
        })
        if(confirmResult!=='confirm'){
          return this.$message.info('取消了删除！')
        }
        const {data:res} =await this.$http.delete('/api/users/',id)
        if(res.status!=0){
              return this.$message.error('取消了删除！')
        }
        console.log(confirmResult)
        this.$message.success("删除成功！")
        this.getUserList()
      }
    }
}
</script>

<style scoped lang="less">


</style>