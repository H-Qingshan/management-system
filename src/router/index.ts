import { createRouter, createWebHistory,RouteRecordRaw} from "vue-router"

const routes:Array<RouteRecordRaw> = [
    {
        path:'/',
        name:'Home',
        component:()=>import("../views/Home.vue")
    },
    {
        path:'/:catchAll(.*)',
        name:'404',
        component:()=>import("../views/404.vue")
    },
    {
        path:'/register',
        name:'Register',
        component:()=>import("../views/Register.vue")
   },
   {
    path:'/login',
    name:'Login',
    component:()=>import("../views/Login.vue")
},
]

const router =createRouter({
    history:createWebHistory(),
    routes
})
     router.beforeEach((to,from,next)=>{
        const islogin:boolean = localStorage.token?true :false;
        if(to.path=="/login"||to.path==="/register"){
            next()
        }else{
            islogin? next():next("/login")
        }
     })
export default router
  