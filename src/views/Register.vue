<script setup lang="ts">
    import {ref,reactive} from 'vue'
    import {registerType,registerRulesType} from "../utils/types"
    import { ElMessage, FormInstance} from 'element-plus'
    // import {axios} from axios     请求
    const ruleFormRef = ref<FormInstance>()

    const registerUser = ref<registerType>({
        name:'hqs',
        email:'1292331340@qq.com',
        password:'123',
        password2:'123',
        indetity:"管理员",
    });

    const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请重新输入密码'))
  } else if (value !== registerUser.value.password) {
    callback(new Error("密码不一致!"))
  } else {
    callback()
  }
}

    const handleSubmit =(formEl: FormInstance | undefined)=>{
         if (!formEl) return
        /*async是一个加在函数前的修饰符，被async定义的函数会默认返回一个Promise对象resolve的值。
        因此对async函数可以直接then，返回值就是then方法传入的函数
        await也是一个修饰符，只能放在async定义的函数内。可以理解为等待。
        wait修饰的如果是Promise对象：可以获取Promise中返回的内容（resolve或reject的参数），且取到值后语句才会往下执行；*/
            formEl.validate( async(valid) => {
                if (valid) {
                console.log('submit!')
                /*
                const {data} = await axios.post(
                    "/api/users/register",
                    registerUser.value
                )
                */
               
                ElMessage({
                    message: 'Congrats, this is a success message.',
                    type: 'success',
                })
                
                } else {
                console.log('error submit!')
                return false
                }
            })
    }

  const rules = reactive<registerRulesType>({
  name: [{ required:true,message:"用户名不能为空",trigger: 'change' },
         {min:2,max:30,message:"长度在2到30个字符之间",trigger:"blur"}
        ],
   email: [{required:true,type:"email",message:"邮箱格式不正确",trigger: 'blur' }],
   password: [{ required:true,message:"密码不能为空",trigger: 'blur' },
         {min:6,max:30,message:"长度在6到30个字符之间",trigger:"blur"}],
   password2:[
        
        {min:6,max:30,message:"长度在6到30个字符之间",trigger:"blur"},
        {validator: validatePass2,trigger:"blur"}
        ]
})
</script>
<template>
    <div class="register">
        <section class="form-container">
        <div class="manage-tip">
            <span class="title">后台管理系统</span>
                <el-form ref="ruleFormRef" :model="registerUser"  :rules="rules" class="registerForm" label-width="80px">
                    <el-form-item label="用户名" prop="name">
                      <el-input v-model="registerUser.name" placeholder="请输入用户名" />
                    </el-form-item>
                    <el-form-item  label="邮箱" prop="email">
                      <el-input  v-model="registerUser.email" placeholder="请输入邮箱"  />
                    </el-form-item>
                    <el-form-item  label="密码" prop="password">
                      <el-input v-model="registerUser.password" type="password" placeholder="请输入密码" />
                    </el-form-item>
                    <el-form-item  label="确认密码" prop="password2">
                      <el-input v-model="registerUser.password2" type="password" placeholder="请确认密码" />
                    </el-form-item>
                    <el-form-item label="选择身份"  >
                      <el-select v-model="registerUser.indetity" placeholder="选择身份">
                        <el-option label="管理员" value="manager"></el-option>
                        <el-option label="员工" value="employee"></el-option>
                      </el-select>
                    </el-form-item>

                    <el-form-item>
                        <el-button  @click="handleSubmit(ruleFormRef)" class="submit-btn">注册</el-button>
                    </el-form-item>
                </el-form>
        </div>
        </section>
    </div>
</template>


<style scoped>
 .register{
    position: relative;
    width: 100%;
    height: 100%;

    background-size: 100% 100%;
 }
 .form-container{
    width: 370px;
    height: 210px;
    position: absolute;
    top: 10%;
    left: 34%;
    padding: 25px;
    border-radius: 5px;
    text-align: center;
 }
 .form-container .manage-tip .title {
    font-family: "Microsoft YaHei";
    font-weight: bold;
    font-size: 26px;
    color: #fff
    ;
 } 
 .registerForm{
  margin-top: 20px;
  background-color: #fff;
  padding:  20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #ccc;
 }
 .submit-btn{
  width: 100%;
 }
</style>