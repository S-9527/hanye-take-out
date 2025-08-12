<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage, type FormInstance } from 'element-plus'
import { createAccountRules, createPasswordRules } from '@/views/login/rules'
import { useGoto } from '@/composables/goto'
import { useUserStore } from '@/store/user'
import { ComponentName, useNavigate } from '@/views/login/navigate'

interface LoginFormValue {
  account: string
  password: string
}

const { gotoHome } = useGoto()
const userStore = useUserStore()

const loginRef = ref<FormInstance | null>(null)
const form = ref<LoginFormValue>({
  account: '',
  password: ''
});

const rules = {
  account: createAccountRules(),
  password: createPasswordRules()
}

async function handleLogin() {
  loginRef.value?.validate(async (result: boolean) => {
    if (result) {
      const res = await userStore.login(form.value)
      console.log(res)
      ElMessage.success('登录成功')
      gotoHome()
    }
  })
}

const { setComponent } = useNavigate()
function handleClick() {
  setComponent(ComponentName.Register)
}
</script>

<template>
  <el-form label-width="0px" class="login-box" :model="form" :rules="rules" ref="loginRef">
    <div class="title-box">登 录</div>
    <el-form-item prop="account">
      <el-input v-model="form.account" placeholder="请输入账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item class="my-el-form-item">
      <el-button type="primary" class="btn-login" @click="handleLogin">登录</el-button>
      <el-link type="info" @click="handleClick">去注册</el-link>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="less">
body {
  margin: 0;
  padding: 0;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.background {
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-image: url('../../assets/image/login.jpg');
  overflow: hidden; // 防止页面滚动条闪动
}

.background::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  /* 黑色半透明 */
  z-index: 1;
  /* 确保伪元素在背景图之上 */
}

.rain {
  position: relative;
  display: flex;
}

.rain span {
  position: relative;
  width: 20px;
  height: 20px;
  background-color: #eee;
  margin: 0 4px;
  border-radius: 50%;
  box-shadow: 0 0 10px 5px rgba(238, 238, 238, 0.5), /* 微调颜色和透明度 */
  0 0 30px 15px rgba(238, 238, 238, 0.3), /* 模糊半径和扩散范围 */
  0 0 50px 30px rgba(221, 221, 221, 0.2);
  animation: animate 15s linear infinite;
  animation-duration: calc(200s / var(--i));
}

.rain span:nth-child(even) {
  background: #ff8800;
  /* 橙色调 */
  box-shadow: 0 0 10px 5px rgba(255, 150, 50, 0.5),
    /* 颜色和透明度 */
  0 0 30px 15px rgba(200, 100, 50, 0.3),
  0 0 50px 30px rgba(200, 50, 50, 0.1);
}


@keyframes animate {
  0% {
    transform: translateY(100vh) scale(0);
  }

  100% {
    transform: translateY(-10vh) scale(1);
  }
}

.login-box {
  z-index: 10;
  width: 400px;
  height: 340px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 0 30px;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  box-shadow: #dddddd 0 0 100px;

  .title-box {
    height: 100px;
    line-height: 100px;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    color: #00aaff;
  }

  .el-form-item {
    margin-bottom: 20px;
  }

  .btn-login {
    width: 100%;
  }

  .el-link{
    margin-top: 25px;
  }
}
</style>