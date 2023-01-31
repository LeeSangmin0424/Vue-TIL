import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useAuthStore } from './store/UserDetails'

import {createRouter, createWebHistory} from 'vue-router' // npm install vue-router@latest
import App from './App.vue' 
import Layout from './components/Layout.vue'
import MenuLayout from './components/menu/Layout.vue'
import MenuList from './components/menu/List.vue'
import Index from './components/Index.vue'

//  /admin/menu/list
import AdminLayout from './components/admin/Layout.vue'
import AdminMenuLayout from './components/admin/menu/Layout.vue'
import AdminMenuList from './components/admin/menu/List.vue'
import AdminIndex from './components/admin/Index.vue'

import UserLogin from './components/user/Login.vue'

const pinia = createPinia();

const app = createApp(App) // 제일 먼저 실행, router를 위한 영역만 가지고 있다. 그 다음 위를 path를 거친다.
app.config.unwrapInjectedRef = true;
app.use(routes)

const store = useAuthStore();
const routes = createRouter({
    history: createWebHistory(import.meta.env.VITE_APP_BASE_PATH),
    routes:[ // 종속관계를 ui로 봐야 한다.
                                            // index만의 header와 footer를 만들기 위해서 Layout과 children 관계를 벗어났다.
        {path: '/index',component:Index}, // header와 footer가 필요하면 index.vue에서 import를 해서 header와 footer를 넣어준다.
        {path:'/',redirect:'/index' ,component:Layout, children:[
            {path:'menu',component:MenuLayout, children:[
                {path:'list',component:MenuList} 
            ]},
        ]},
        {path: '/user',component:Layout, children:[
            {path:'login',component:UserLogin}
        ]},
        {path:'/admin/',component:AdminLayout,children:[
            {path:'menu',component:AdminMenuLayout, children:[
                {path:'list',component:AdminMenuList} 
            ]},
            {path:'index',component:AdminIndex},
        ], beforeEnter:(to, from, next)=>{
            // admin//** 로 들어가지 전에 처리할 내용을 실행해야 할 코드를 입력
            // if(권한 또는 인증)
            if(false)
                next();
            else    
                next('/user/login');
        }}

    ]

});


 // router 객체 생성 
app.use(pinia)
.mount('#app')