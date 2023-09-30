<script setup>
  import { AppStore } from '../store/store';
  import { onMounted, reactive,ref } from 'vue';
  const store = AppStore();

  const inputData = ref('')
  const isChecked = ref(null)

  function clearInput(){
    inputData.value = ''
  }
  
  function insertInputData(){
      store.addProject(inputData, clearInput)
  }

  onMounted(()=>{
    store.inCompleteProjectsFunction();
    store.completeProjectsFunction();
  });
</script>

<template>
    <div class="w-full flex items-center justify-center bg-teal-lightest font-sans" style="height: 600px;">
      <div class="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div class="mb-4">
          <h1 class="text-grey-darkest">Todo App</h1>
          <div class="flex mt-4">
            <input v-model="inputData" class="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
              placeholder="Add Todo">
            <button @click="insertInputData()"
              class="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal">Add</button>
          </div>
        </div>
        <div>

          
          <div class="flex mb-4 items-center" v-for="(project, index) in store.inCompleteProject" :key="index">
            <p class="w-full text-grey-darkest">{{ project.name }}</p>

            <button
             @click="store.doneAsComplete(project.id)" type="button" class="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green">
             Done
            </button>

            <button type="button" @click="store.deleteProject(project.id)"
              class="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red">X</button>
          </div>
          
          <br><br>
          
          <div class="flex mb-4 items-center" v-for="(project, index) in store.completeProject" :key="index">
            <p class="w-full line-through text-green">{{ project.name }}</p>
            <button
            @click="store.doneAsInComplete(project.id)" type="button" class="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-grey border-grey hover:bg-grey">Not
              Done</button>
            <button type="button" @click="store.deleteProject(project.id)"
              class="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red">Remove</button>
          </div>

        </div>
      </div>
    </div>
</template>

<style scoped>

</style>