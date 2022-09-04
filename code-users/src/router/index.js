import {createRouter,createWebHashHistory} from "vue-router";
import UserList from "@/components/UserList";
const router=createRouter({
    history:createWebHashHistory(),
    routes:[
        {
            path:'/',
            redirect:'/users'
        },
        {
            path:'/users',
            component:UserList
        }
    ]
})

export default router;
