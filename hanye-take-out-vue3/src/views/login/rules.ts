import { validatePasswordSame } from '@/views/login/validator'

export function createAccountRules() {
  return [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9]{1,10}$/, message: '用户名必须是1-10的字母数字', trigger: 'blur' }
  ]
}

export function createPasswordRules() {
  return [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { pattern: /^\S{6,15}$/, message: '密码必须是6-15的非空字符', trigger: 'blur' }
  ]
}

export function createRepasswordRules(formValue: Record<string, any>,compareFieldName: string = 'password') {
  return [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    { pattern: /^\S{6,15}$/, message: '密码必须是6-15的非空字符', trigger: 'blur' },
    {
      validator: () => {
        // 使用响应式表单对象的当前值
        return validatePasswordSame(
          formValue[compareFieldName],
          formValue.rePwd // 直接使用表单中的确认密码字段
        );
      },
      message: "两次密码输入不一致",
      trigger: 'blur'
    }
  ];
}

export function createOldPwdRules() {
  return [
    { required: true, message: '请输入原密码', trigger: 'blur' },
    { pattern: /^\S{6,15}$/, message: '原密码必须是6-15的非空字符', trigger: 'blur' }
  ]
}

export function createNewPwdRules() {
  return [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { pattern: /^\S{6,15}$/, message: '新密码必须是6-15的非空字符', trigger: 'blur' }
  ]
}