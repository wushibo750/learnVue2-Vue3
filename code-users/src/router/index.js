import {createRouter,createWebHashHistory} from "vue-router";
import UserList from "@/components/UserList";
import UserDetail from "@/components/UserDetail";
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
        },
        {
            path:'/users/:id',
            component:UserDetail,
            props:true
        }
    ]
})

export default router;
