<script setup>

import {Icon} from '@iconify/vue'
import { ref, onBeforeMount } from 'vue'
import { useStore } from 'vuex'

const store = useStore()


const presetName = ref('')
const workMinutes = ref('30')
const workSeconds = ref('00')

const restMinutes = ref('05')
const restSeconds = ref('00')
const cycles = ref(3)

const formatMinutes = () => {
    if (workMinutes.value.length > 3) workMinutes.value = workMinutes.value.substring(0, 3)
}
const formatSeconds = () => {
    if (workSeconds.value.length > 2) workSeconds.value = workSeconds.value.substring(0, 3)
    if (parseInt(workSeconds.value) > 59) workSeconds.value = '59'
}
const formatTime = (num) => {
    num = `${num}`
    if (num.length == 1) return '0' + num
    return num
}

const applyTimerSettings = () => {
    store.commit('setTime', {
        workMinutes:parseInt(workMinutes.value), 
        workSeconds:parseInt(workSeconds.value), 
        restMinutes:parseInt(restMinutes.value), 
        restSeconds:parseInt(restSeconds.value),
        cycles: cycles.value
    })
}

const presets = ref([])
const presetID=  ref(-1)

onBeforeMount(()=>{
    const saved = JSON.parse(localStorage.getItem('timerPresets'))
    if (saved){
        presets.value = saved
    }
})

const savePreset = ()=>{
    if (presetID.value == -1){
        presets.value.push({
            name: presetName.value,
            workMinutes:parseInt(workMinutes.value), 
            workSeconds:parseInt(workSeconds.value), 
            restMinutes:parseInt(restMinutes.value), 
            restSeconds:parseInt(restSeconds.value),
            cycles: cycles.value
        })
    } else{
        presets.value[presetID.value] = {
            name: presetName.value,
            workMinutes:parseInt(workMinutes.value), 
            workSeconds:parseInt(workSeconds.value), 
            restMinutes:parseInt(restMinutes.value), 
            restSeconds:parseInt(restSeconds.value),
            cycles: cycles.value
        }
    }
    savePresets()
}

const pickPreset = (id)=>{
    presetID.value = id
    workMinutes.value = presets.value[id].workMinutes
    workSeconds.value = presets.value[id].workSeconds
    restMinutes.value = presets.value[id].restMinutes
    restSeconds.value = presets.value[id].restSeconds
    cycles.value = presets.value[id].cycles
    presetName.value = presets.value[id].name
}

const removePreset = (id)=>{
    presetID.value = -1
    presetName.value = ''
    workMinutes.value = '30'
    workSeconds.value = '00'
    restMinutes.value = '05'
    restSeconds.value = '00'
    cycles.value = 3

    presets.value.splice(id, 1)
    savePresets()
}

const savePresets = ()=>{
    localStorage.setItem('timerPresets', JSON.stringify(presets.value))
}

</script>

<template>
    <section class=" flex flex-col gap-5">
        <h1 class="text-center">Timer</h1>
        <div class="config flex flex-col gap-5 items-center">
            <div class="preset_header flex items-center gap-2">
                <input v-model="presetName" placeholder="Preset name" type="text" class=" bg-transparent border-b-2 border-white">
                <button @click="savePreset" class="text-2xl duration-300 hover:text-green-400"><Icon icon="ci:save" /></button>
            </div>
            <div class="controls flex justify-around items-center gap-2 w-full">
                <div class="flex flex-col gap-2">
                    <div class="text-center">
                        <h2 class="text-xl">Work time: </h2>
                        <div class="flex items-center justify-center gap-2">
                            <input v-model="workMinutes" @input="formatMinutes"
                                class="text-4xl p-1 w-16 rounded-xl  text-dark text-center" type="text">
                            <span class="flex flex-col gap-2">
                                <span class="w-2 h-2 bg-white block rounded-full"></span>
                                <span class="w-2 h-2 bg-white block rounded-full"></span>
                            </span>
                            <input v-model="workSeconds" @input="formatSeconds"
                                class="text-4xl p-1 w-16 rounded-xl  text-dark text-center" type="text">
                        </div>
                    </div>
                    <div class="text-center">
                        <h2 class="text-xl">Rest time: </h2>
                        <div class="flex items-center justify-center gap-2">
                            <input v-model="restMinutes" @input="formatMinutes"
                                class="text-4xl p-1 w-16 rounded-xl  text-dark text-center" type="text">
                            <span class="flex flex-col gap-2">
                                <span class="w-2 h-2 bg-white block rounded-full"></span>
                                <span class="w-2 h-2 bg-white block rounded-full"></span>
                            </span>
                            <input v-model="restSeconds" @input="formatSeconds"
                                class="text-4xl p-1 w-16 rounded-xl  text-dark text-center" type="text">
                        </div>
                    </div>
                </div>
                <div class="text-center">
                    <h2 class="text-xl">Cycles: </h2>
                    <div class="flex items-center text-[4rem] justify-center gap-2">
                        <button @click="if (cycles>1) cycles--;"><Icon icon="mdi:minus" /></button>
                        <input v-model="cycles" @input="formatMinutes"
                            class=" p-1 w-24 rounded-xl  text-dark text-center" type="text">
                        <button @click="cycles++"><Icon icon="mdi:plus" /></button>
                    </div>
                </div>
            </div>
            <button class="button w-fit mx-auto" @click="applyTimerSettings" type="button">Apply</button>
        </div>
        <div class="presets grid gap-2">
            <div  v-for="(preset, i) of presets" :key="i" class="preset_wrapper relative group">
                <button @click="removePreset(i)" class="remove_preset absolute top-0 right-0 m-2 text-xl z-10 duration-300 group-hover:text-dark"><Icon icon="mdi:trash-can" /></button>
                <div @click="pickPreset(i)" class="preset w-full cursor-pointer relative flex flex-col items-center p-2 border-white border-2 rounded-xl duration-300 hover:text-dark hover:bg-white">
                    <h2>{{ preset.name }}</h2>
                    <p>Work time: {{ formatTime(preset.workMinutes) }}:{{ formatTime(preset.workSeconds) }}</p>
                    <p>Rest time: {{ formatTime(preset.restMinutes) }}:{{ formatTime(preset.restSeconds) }}</p>
                    <p>Cycles: {{ preset.cycles }}</p>
                </div>
            </div>
        </div>

    </section>
</template>


<style scoped>

.presets{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
}
.remove_preset:hover{
    color: rgb(248 113 113 / var(--tw-text-opacity)) !important;
}

</style>