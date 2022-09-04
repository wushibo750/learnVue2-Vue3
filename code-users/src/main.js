import { createApp } from 'vue'
import App from './App.vue'
//导入router
import router from "@/router";
//导入elementplus
//加载过渡效果
import ElementPlus, {ElLoading} from 'element-plus'
import 'element-plus/dist/index.css'
//导入axios
import axios from 'axios'
//配置axios
axios.defaults.baseURL='https://www.escook.cn'

let app=createApp(App)
//添加全局日期过滤器vue3.0的写法，2.0参考官方写法
//声明全局过滤器
app.config.globalProperties.$filters = {
    dateFormat(dtStr) {
        const dt=new Date(dtStr)
        const y=dt.getFullYear()
        const m=dt.getMonth()+1
        const d=dt.getDate()
        const hh=dt.getHours()
        const mm=dt.getMinutes()
        const ss=dt.getSeconds()+1
        return `${y}-${m}-${d} ${hh}-${mm}-${ss}`
    }
}

app.config.globalProperties.$http= axios

axios.defaults.baseURL='/api'
//声明请求拦截器
let loadingInstance=null
axios.interceptors.request.use((config)=>{
    //展示Loading效果
    loadingInstance=ElLoading.service({fullscreen:true})
    return config
})

//声明响应拦截器
axios.interceptors.response.use((response)=>{
    //隐藏Loading效果
    loadingInstance.close()
    return response
})
app.use(ElementPlus).use(router).mount('#app')