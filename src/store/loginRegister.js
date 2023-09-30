import { defineStore } from "pinia";
import router from '../router/router'
import axios from 'axios'
import {ref} from 'vue'

const store =  defineStore('register',()=>{

   const token = ref('');
   const isAuthenticate = ref(localStorage.getItem('token') ? true : false)
   const userInfo = ref(JSON.parse(localStorage.getItem('token')));

   async function registration(data){
        const response = await axios.post(`https://devmunna.xyz/api/register`,data)
        if(response.data.status == 200){
            router.push('/login')
        }
    }

    async function login(data){
        const response = await axios.post(`https://devmunna.xyz/api/login`,data)
        if(response.data.status == 200){
            localStorage.setItem('token',JSON.stringify(response.data))
            isAuthenticate.value = true
            userInfo.value = response.data
            router.push('/todos')
        }else{
            console.log(response.data.message)
        }
    }

    
    function logOut(){
        localStorage.removeItem('token')
        isAuthenticate.value = false
        router.push('/login')
        userInfo.value = ''
    }




    return {registration, login, logOut, isAuthenticate, userInfo}
})


export default store;

