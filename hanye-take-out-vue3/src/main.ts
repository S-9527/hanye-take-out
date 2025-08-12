import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from './router/router'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
const pinia = createPinia()

app.use(ElementPlus)
// 注册使用 ElementPlusIconsVue 的所有 icon 图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(pinia)
await setupRouter(app)

app.mount('#app')
