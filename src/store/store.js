import { defineStore } from 'pinia'
import {ref,reactive,computed} from 'vue'
import axios from 'axios'

const AppStore = defineStore('uniqueID', ()=>{
    
    const inCompleteProject = ref([]);
    const completeProject = ref([]);

    const addProject = async function(inputData, clearData){
        const data = reactive({
            name : inputData,
            status : 'pending'
        })

       const response = await axios.post(`https://devmunna.xyz/api/store`, data);
       if (response.status == 200){
            inCompleteProjectsFunction()
            completeProjectsFunction()
            clearData()
       }
    }

    const inCompleteProjectsFunction = async function(){
        const response = await axios.get(`https://devmunna.xyz/api/pending/data`);
        inCompleteProject.value = response.data;
    }

    const completeProjectsFunction = async function(){
        const res = await axios.get(`https://devmunna.xyz/api/complete/data`);
        completeProject.value = res.data; 
    }

   async function doneAsComplete(id){
       const response = await axios.put(`https://devmunna.xyz/api/mark/complete/${id}`);
       if(response.status == 200){
            inCompleteProjectsFunction()
            completeProjectsFunction()
        }
   }

   async function doneAsInComplete(id){
    const res = await axios.put(`https://devmunna.xyz/api/mark/undo/${id}`);
        if(res.status == 200){
            inCompleteProjectsFunction()
            completeProjectsFunction()
        }
   }

   async function deleteProject(id){
    const response = await axios.delete(`https://devmunna.xyz/api/delete/${id}`);
       if(response.status == 200){
            inCompleteProjectsFunction()
            completeProjectsFunction()
        }
   }


    return {inCompleteProject, inCompleteProjectsFunction, doneAsComplete, completeProjectsFunction ,completeProject , doneAsInComplete, deleteProject, addProject}
});



export {AppStore}

