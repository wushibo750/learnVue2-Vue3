import { createApp } from 'vue'
import App from './App.vue'
//导入router
import router from "@/router";
//导入elementplus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//导入axios
import axios from 'axios'
//配置axios
axios.defaults.baseURL='https://www.escook.cn'

let app=createApp(App)
app.config.globalProperties.$http= axios
// axios.defaults.baseURL='https://localhost:8080'
axios.defaults.baseURL='/api'
app.use(ElementPlus).use(router).mount('#app')