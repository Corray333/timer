<script setup>

import {Icon} from '@iconify/vue'
import { ref, onBeforeMount } from 'vue'
import { useStore } from 'vuex'

const store = useStore()



const minutes = ref('30')
const seconds = ref('00')

const restMinutes = ref('05')
const restSeconds = ref('00')
const cycles = ref(3)

const formatMinutes = () => {
    if (minutes.value.length > 3) minutes.value = minutes.value.substring(0, 3)
}
const formatSeconds = () => {
    if (seconds.value.length > 2) seconds.value = seconds.value.substring(0, 3)
    if (parseInt(seconds.value) > 59) seconds.value = '59'
}

const applyTimerSettings = () => {
    store.commit('setTime', {
        workMinutes:parseInt(minutes.value), 
        workSeconds:parseInt(seconds.value), 
        restMinutes:parseInt(restMinutes.value), 
        restSeconds:parseInt(restSeconds.value),
        cycles: cycles.value
    })
}

</script>

<template>
    <section class=" flex flex-col gap-5">
        <h1 class="text-center">Timer</h1>
        <div class="controls flex justify-around items-center gap-2">
            <div class="flex flex-col gap-2">
                <div class="text-center">
                    <h2 class="text-xl">Work time: </h2>
                    <div class="flex items-center justify-center gap-2">
                        <input v-model="minutes" @input="formatMinutes"
                            class="text-4xl p-1 w-16 rounded-xl  text-dark text-center" type="text">
                        <span class="flex flex-col gap-2">
                            <span class="w-2 h-2 bg-white block rounded-full"></span>
                            <span class="w-2 h-2 bg-white block rounded-full"></span>
                        </span>
                        <input v-model="seconds" @input="formatSeconds"
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
    </section>
</template>


<style scoped></style>