<script setup>
import { ref, nextTick, onBeforeMount, onBeforeUnmount } from 'vue'
import { Icon } from '@iconify/vue'

const tasks = ref([])

onBeforeMount(()=>{
    let saved = JSON.parse(localStorage.getItem('tasks'))
    if (saved){
        tasks.value = saved
    }
})

const saveTasks = ()=>{
    localStorage.setItem('tasks', JSON.stringify(tasks.value))
}

const newTask = (index) => {
    tasks.value.splice(index+1, 0, {
        task: '',
        isDone: false
    })
    saveTasks()
    nextTick(() => {
        const newTaskElement = document.querySelectorAll('[contenteditable]')[index + 1]
        if (newTaskElement) {
            newTaskElement.focus()
        }
    })
}

const removeTask = (id)=>{
    tasks.value.splice(id, 1)
    saveTasks()
}

const focusedElement = ref(null)

const handleInput = (task, event) => {
    const inputText = event.target.innerText
    if (inputText.length > 100) {
        event.target.innerText = inputText.slice(0, 100)
        task.task = inputText.slice(0, 100)
    } else {
        task.task = inputText
    }
    saveTasks()
    nextTick(() => {
        if (focusedElement.value) {
            const range = document.createRange()
            const sel = window.getSelection()
            range.setStart(focusedElement.value.childNodes[0], focusedElement.value.innerText.length)
            range.collapse(true)
            sel.removeAllRanges()
            sel.addRange(range)
            focusedElement.value.focus()
        }
    })
}

const handleFocus = (event) => {
    focusedElement.value = event.target
}

const handleBlur = () => {
    focusedElement.value = null
}

</script>

<template>
    <section class="h-full">
        <h1 class="text-center flex items-center justify-center">Tasks 
            <button class="text-xl" @click="newTask(tasks.length-1)">
                <Icon icon="mdi:plus" />
            </button>
        </h1>
        <p v-if="tasks.length==0" class="text-center text-sm opacity-50">No tasks yet, create the first one</p>
        <div v-else class="flex flex-col gap-2">
            <div v-for="(task, index) of tasks" :key="index" :task="task" @done="task.isDone = !task.isDone" class=" group pl-5 relative task flex  gap-2" :style="task.isDone ? 'opacity:0.5' : ''">
                <button @click="removeTask(index)"><Icon icon="mdi:trash-can" class=" absolute left-0 top-0 text-xl duration-300 hover:text-red-400 scale-0 group-hover:scale-100" /></button>
                <div @click="task.isDone = !task.isDone; saveTasks()"
                    class=" cursor-pointer w-6 h-6 flex justify-center items-center border-2 border-white rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="10" viewBox="0 0 12 10" fill="none">
                        <path :style="task.isDone ? 'stroke-dashoffset: -40;' : 'stroke-dashoffset: -20;'"
                            d="M1 5.5L4.18849 8.28992C4.62644 8.67313 5.29783 8.6029 5.64699 8.13735L11 1"
                            stroke="white" stroke-width="2" stroke-linecap="round" />
                    </svg>
                </div>
                <p :class="task.isDone ? 'done' : ''" class="w-fit relative flex items-center">
                    <span role="textbox" contenteditable class="relative flex items-center w-fit"
                        @keydown.enter="newTask(index)"
                        spellcheck="false"
                          @input="handleInput(task, $event)"
                          @focus="handleFocus"
                          @blur="handleBlur"
                          v-text="task.task"></span>
                </p>
            </div>
        </div>
    </section>
</template>

<style scoped>
input {
    background: transparent;
    color: dark;
    font-family: 'Montserrat', sans-serif;
    font-weight: normal;
}

path {
    stroke-dasharray: 20;
    transition: all 0.3s;
}

p::after {
    content: '';
    position: absolute;
    height: 2px;
    width: 0;
    background-color: white;
    transition: all 0.3s;
}

.done {
    opacity: 0.5;
}

.done::after {
    width: 100%;
}
</style>
