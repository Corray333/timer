<script setup>

import { Icon } from '@iconify/vue'
import { useStore } from 'vuex'
import { ref } from 'vue'

const store = useStore()

const timeFull = -2000
const timeMin = 1000



const formatTime = (num) => {
    num = `${num}`
    if (num.length == 1) return '0' + num
    return num
}

let interval = ref(null)

const startTimer = () => {
    interval.value = setInterval(() => {
        if (store.state.minutes == 0 && store.state.seconds == 0) {
            clearInterval(interval.value)
            interval.value = null
            store.commit('nextPhaze')
        } else store.commit('spendTime')

    }, 1000)
}

const nextPhaze = () => {
    clearInterval(interval.value)
    interval.value = null
    store.commit('nextPhaze')
}

const endSession = ()=>{
    clearInterval(interval.value)
    interval.value = null
    store.commit('endSession')
}


</script>

<template>
    <section class="flex flex-col items-center gap-5">
        <div class="clock relative flex justify-center items-center w-fit">
            <h3 class=" text-4xl font-bold absolute">{{ formatTime(store.state.minutes) }}:{{
                formatTime(store.state.seconds) }}</h3>
            <svg class=" -rotate-90" width="320" height="320">
                <circle class=" opacity-25" cx="160" cy="160" r="150" stroke-width="20" fill="transparent"
                    stroke="#1b1b1b" stroke-linecap="round" />
                <circle
                    :style="`stroke-dashoffset: ${timeFull / 2 * ((store.state.minutes * 60 + store.state.seconds) / store.state.endTime) - 1000}`"
                    cx="160" cy="160" r="150" stroke-width="20" fill="transparent" stroke="#1b1b1b"
                    stroke-linecap="round" />
            </svg>
        </div>
        <div class="info text-center">
            <p>Phaze: {{ store.state.work ? 'work' : 'rest' }}</p>
            <p>Cycles: {{ store.state.cycle }}/{{ store.state.numberOfCycles }}</p>
        </div>
        <section class="flex gap-2">
            <button @click="endSession" class="button-control">
                <Icon icon="ph:stop-bold" />
            </button>
            <button @click="startTimer" class="button-control">
                <Icon :icon="interval ? 'ph:pause-bold' : 'ph:play-bold'" />
            </button>
            <button @click="nextPhaze" class="button-control">
                <Icon icon="ph:arrow-fat-line-right-bold" />
            </button>
        </section>
    </section>

</template>


<style setup>
.clock circle {
    stroke-dasharray: 1000;
    transition: all 0.3s;
}
</style>