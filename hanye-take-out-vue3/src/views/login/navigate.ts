import Login from '@/views/login/login.vue'
import Register from '@/views/login/register.vue'
import { type Component, ref } from 'vue'
import { defineStore } from 'pinia'

export enum ComponentName {
  Login = "login",
  Register = "register"
}

export const useNavigate = defineStore('navigate', () => {
  const routerName = ref(ComponentName.Login)
  const components: Record<ComponentName, Component> = {
    [ComponentName.Login]: Login,
    [ComponentName.Register]: Register
  }

  function getComponent() {
    return components[routerName.value]
  }

  function setComponent(name: ComponentName) {
    routerName.value = name
  }

  return {
    getComponent,
    setComponent
  }
})