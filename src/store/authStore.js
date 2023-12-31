import {ref, reactive} from 'vue';
import router from '../router/router';
import {defineStore} from 'pinia';

import todoStore from './todoStore';


const authStore = defineStore('auth', () => {
    const isAuthenticated = ref(localStorage.getItem('isAuthenticated'));
    const user = ref({
        email:'moumitasub@gmail.com',
        password:'12345',
    });

    const login = (email, password) => {
        if(JSON.parse(localStorage.getItem('user')) != null)
            user.value = JSON.parse(localStorage.getItem('user'));

        if(user.value.email == email && user.value.password == password){
            localStorage.setItem('isAuthenticated',true);
            isAuthenticated.value = true;
            todoStore().action.fetch();
            router.push('/todos');
        }
        else{
            console.log('Username or Password is incorrect');
        }

    };

    const register = (formData) => {
        if(localStorage.setItem('user', JSON.stringify(formData))){
            localStorage.setItem('isAuthenticated',true);
            isAuthenticated.value = true;
            todoStore().action.fetch();
            return formData;
        }

        router.push('/todos');

    };

    const logout = () => {
        localStorage.setItem('isAuthenticated',false);
        isAuthenticated.value = false;
        localStorage.setItem('user', null);
        user.value = null;
        router.push('/login');
    };

    return {isAuthenticated,user, register, login, logout};
});

export default authStore;