import { createRouter, createWebHistory } from "vue-router";
import store from "../store/authStore";
import LoginComponent from '../components/Login.vue';
import RegisterComponent from '../components/Register.vue';
import TodosComponent from '../components/Todos.vue';
import CompletedComponent from '../components/Completed.vue';


const routes = [
    {
        path : '/',
        name : 'Login',
        component : LoginComponent
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
            isAuthenticated : true
        }
    },
    {
        path : '/completed',
        name : 'Completed',
        component : CompletedComponent,
        meta : {
            isAuthenticated : true
        }
    },
]


const router = createRouter({
   history : createWebHistory(),
   routes
});


router.beforeEach((to,from,next)=>{
    const state = store()
    if(to.meta.isAuthenticated == true && !state.isAuthenticated){
        next('/login')
    }else{
        next()
    }
})


export default router;