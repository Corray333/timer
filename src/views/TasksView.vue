<script setup>

import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import Task from '../components/Task.vue'

const tasks = ref([
    {
        task: 'Task task1',
        isDone: false
    },
    {
        task: 'Task task2',
        isDone: false
    },
    {
        task: 'Task task3',
        isDone: false
    },
])

const newTask = ()=>{
    tasks.value.push({
        task: 'New task',
        isDone: false
    })
}





</script>

<template>
    <section>
        <h1 class="text-center flex items-center justify-center">Tasks 
            <button class="text-xl" @click="newTask">
                <Icon icon="mdi:plus" />
            </button></h1>
        <div class="flex flex-col gap-2">
            <div  v-for="(task) of tasks" :key="task.task" :task="task" @done="task.isDone = !task.isDone" class="task flex items-center gap-2" :style="task.isDone ? 'opacity:0.5' : ''">
                <div @click="task.isDone = !task.isDone"
                    class=" cursor-pointer w-6 h-6 flex justify-center items-center border-2 border-white rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="10" viewBox="0 0 12 10" fill="none">
                        <path :style="task.isDone ? 'stroke-dashoffset: -40;' : 'stroke-dashoffset: -20;'"
                            d="M1 5.5L4.18849 8.28992C4.62644 8.67313 5.29783 8.6029 5.64699 8.13735L11 1"
                            stroke="white" stroke-width="2" stroke-linecap="round" />
                    </svg>
                </div>
                <p :class="task.isDone ? 'done' : ''" class="w-fit relative flex items-center">
                    <span role="textbox" contenteditable class="relative flex items-center w-fit" @input="task.task = $event.target.innerText" v-text="task.task"></span>
                </p>
            </div>
        </div>
    </section>
</template>


<style scoped>

input{
    background: transparent;
    color: dark;
    font-family: 'Montserrat', sans-serif;
    font-weight: normal;
}

path{
    stroke-dasharray: 20;
    transition: all 0.3s;
}

p::after{
    content: '';
    position: absolute;
    height: 2px;
    width: 0;
    background-color: white;
    transition: all 0.3s;
}
.done{
    opacity: 0.5;
}
.done::after{
    width: 100%;
}
</style>