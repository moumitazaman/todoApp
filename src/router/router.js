import { createRouter, createWebHistory } from "vue-router";
import store from "../store/authStore";
import HomeComponent from '../components/Home.vue';
import LoginComponent from '../components/Login.vue';
import RegisterComponent from '../components/Register.vue';
import TodosComponent from '../components/Todos.vue';

const routes = [
    {
        path : '/',
        name : 'Home',
        component : HomeComponent
    },

    {
        path : '/login',
        name : 'Login',
        component : LoginComponent
    },

    {
        path : '/register',
        name : 'Register',
        component : RegisterComponent
    },

    {
        path : '/todos',
        name : 'Todos',
        component : TodosComponent,
        meta : {
            isAuthenticate : true
        }
    },
]


const router = createRouter({
   history : createWebHistory(),
   routes
});


router.beforeEach((to,from,next)=>{
    const state = store()
    if(to.meta.isAuthenticate == true && !state.isAuthenticate){
        next('/login')
    }else{
        next()
    }
})


export default router;