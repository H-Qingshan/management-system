<script setup lang="ts">
    import {ref,reactive} from 'vue'
    import {registerType,registerRulesType} from "../utils/types"
    import { ElMessage, FormInstance} from 'element-plus'
    import { useRouter } from 'vue-router';
    // import {axios} from axios     请求
    const ruleFormRef = ref<FormInstance>()
    const router =useRouter();

    const loginUser = ref<registerType>({
      
        email:"1292331340@qq.com",
        password:"123123",

    });



    const handleSubmit =(formEl: FormInstance | undefined)=>{
         if (!formEl) return
        /*async是一个加在函数前的修饰符，被async定义的函数会默认返回一个Promise对象resolve的值。
        因此对async函数可以直接then，返回值就是then方法传入的函数
        await也是一个修饰符，只能放在async定义的函数内。可以理解为等待。
        wait修饰的如果是Promise对象：可以获取Promise中返回的内容（resolve或reject的参数），且取到值后语句才会往下执行；*/
            formEl.validate( async(valid) => {
                if (valid) {
                  /*
                const {data} = await axios.post(
                    "/api/users/login",
                    loginUser.value
                )
                */
                console.log("data")
              
               
                ElMessage({
                    message: '用户登录成功',
                    type: 'success',
                })
                router.push('/system')
                } else {
                console.log('密码错误')
                return false
                }
            })
    }

 const rules = reactive<registerRulesType>({
   email: [
            {
            type:"email",
            required:true,
            message:"邮箱格式不正确",
            trigger: 'blur' 
            },
        ],
   password: [{ required:true,message:"密码不能为空",trigger: 'blur' },
         {min:6,max:30,message:"长度在6到30个字符之间",trigger:"blur"}],
})
</script>
<template>
    <div class="login">
        <section class="form-container">
        <div class="manage-tip">
            <span class="title">后台管理系统</span>
                <el-form ref="ruleFormRef" :rules="rules" :model="loginUser"  class="loginForm" label-width="80px">
                    <el-form-item  label="邮箱" prop="email">
                      <el-input  v-model="loginUser.email" placeholder="请输入邮箱"  />
                    </el-form-item>
                    <el-form-item  label="密码" type="password">
                      <el-input v-model="loginUser.password"  placeholder="请输入密码" />
                    </el-form-item>
                    

                    <el-form-item>
                        <el-button  @click="handleSubmit(ruleFormRef)" class="submit-btn">登录</el-button>
                    </el-form-item>
                    <div class="tip">
                        <p>
                            还没有账号？现在<router-link to="/register">注册</router-link>
                        </p>
                    </div>
                </el-form>
        </div>
        </section>
    </div>
</template>


<style scoped>
 .login{
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
    color: #fff;
 }
  .LoginForm{
  margin-top: 20px;
  background-color: #fff;
  padding:  20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #ccc;
 }
 .submit-btn{
  width: 100%;
 }
 .tip{
    text-align: right;
    font-size: 12px;
    color: #333;
 }
 .tip p a{
    color: #409eff;
 }

</style>