<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage, type FormInstance } from 'element-plus'
import { createAccountRules, createPasswordRules, createRepasswordRules } from '@/views/login/rules'
import { goToLogin } from '@/composables/goto'
import { useUserStore } from '@/store/user'
import { ComponentName, useNavigate } from '@/views/login/navigate'

export interface RegisterFormValue {
  account: string,
  password: string,
  rePwd: string
}

// 表单校验的ref
const registerRef = ref<FormInstance | null>(null);
const form = ref<RegisterFormValue>({ // 表单的数据对象
  account: '', // 用户名
  password: '', // 密码
  rePwd: '' // 确认密码
})

const rules = {
  account: createAccountRules(),
  password: createPasswordRules(),
  rePwd: createRepasswordRules(form.value)
}

const userStore = useUserStore()
function register() {
  registerRef.value?.validate(async (result: boolean) => {
    if (result) {
      await userStore.register(form.value)
      ElMessage.success('注册成功')
      goToLogin()
    }
  })
}

const { setComponent } = useNavigate()
function handleClick() {
  setComponent(ComponentName.Login)
}
</script>

<template>
  <div class="reg-box">
    <!-- 标题“后台管理系统(图片)”的盒子 -->
    <div class="title-box">注 册</div>
    <!-- 注册的表单区域 -->
    <!-- el-form 自带校验能力，所以直接自定义规则就行(不用什么自定义监听之类的) -->
    <el-form :model="form" label-width="0px" :rules="rules" ref="registerRef">
      <el-form-item prop="account">
        <el-input placeholder="请输入用户名" v-model="form.account"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" placeholder="请输入密码" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item prop="rePwd">
        <el-input type="password" placeholder="请再次确认密码" v-model="form.rePwd"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="btn-reg" @click="register">注册</el-button>
        <el-link class="router" type="info" @click="handleClick">去登录</el-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="less" scoped>
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
  background-image: url('../../assets/image/reg.jpg');
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
  box-shadow: 0 0 10px 5px rgba(238, 238, 238, 0.5),
    /* 微调颜色和透明度 */
  0 0 30px 15px rgba(238, 238, 238, 0.3),
    /* 模糊半径和扩散范围 */
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

.reg-box {
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
    height: 60px;
    line-height: 60px;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    color: #00aaff;
    margin-bottom: 20px;
  }

  .btn-reg {
    width: 100%; // 可以让其占满一行，不用考虑怎么变成块级然后独占一行之类的...
  }

  .router {
    text-align: left;
  }

  .el-link {
    margin-top: 20px;
  }
}
</style>