<script setup>

import {ref} from 'vue'
import {Icon} from '@iconify/vue'

const audio = ref()

const sounds = ref([
    {
        icon: 'ph:wind',
        sound:'wind.wav'
    },
    {
        icon: 'jam:cloud-rain',
        sound:'rain.flac'
    },
    {
        icon: 'jam:cloud-thunder',
        sound:'thunder.mp3'
    },
    {
        icon: 'icon-park-outline:bird',
        sound:'birds.wav'
    },
    {
        icon: 'uil:keyboard',
        sound:'typing.wav'
    },
    {
        icon: 'lucide:coffee',
        sound:'cafe.wav'
    },
    {
        icon: 'hugeicons:rain',
        sound:'rain-window.wav'
    },
])

</script>

<template>
    <section>
        <h1 class="text-center">Sounds</h1>
        <div class="sound-buttons flex gap-3 flex-wrap ">
            <button v-for="(sound, i) of sounds" :key="i" @click="" class="text-4xl p-4 button">
                <Icon :icon="sound.icon" />
            </button>
        </div>
    </section>
</template>


<style scoped>


</style>