import { createApp } from 'vue'
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



const routes = createRouter({
    history: createWebHistory(import.meta.env.VITE_APP_BASE_PATH),
    routes:[ // 종속관계를 ui로 봐야 한다.
        {path:'/',component:Layout, children:[
            {path: 'index',component:Index},
            {path:'menu',component:MenuLayout, children:[
                {path:'list',component:MenuList} 
            ]},
        ]},
        {path:'/admin/',component:AdminLayout,children:[
            {path:'index',component:AdminIndex},
            {path:'menu',component:AdminMenuLayout, children:[
                {path:'list',component:AdminMenuList} 
            ]},
        ]}

    ]

});


createApp(App) // 제일 먼저 실행, router를 위한 영역만 가지고 있다. 그 다음 위를 path를 거친다.
.use(routes) // router 객체 생성 
.mount('#app')