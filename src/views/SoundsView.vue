<script setup>

import { ref, onBeforeMount } from 'vue'
import { Icon } from '@iconify/vue'
import { useStore } from 'vuex'

const store = useStore()

const audio = ref()


const sounds = ref([
    {
        icon: 'ph:wind',
        sound: 'wind.wav',
        isActive: false
    },
    {
        icon: 'jam:cloud-rain',
        sound: 'rain.flac',
        isActive: false
    },
    {
        icon: 'jam:cloud-thunder',
        sound: 'thunder.mp3',
        isActive: false
    },
    {
        icon: 'icon-park-outline:bird',
        sound: 'birds.wav',
        isActive: false
    },
    {
        icon: 'uil:keyboard',
        sound: 'typing.wav',
        isActive: false
    },
    {
        icon: 'lucide:coffee',
        sound: 'cafe.wav',
        isActive: false
    },
    {
        icon: 'hugeicons:rain',
        sound: 'rain-window.wav',
        isActive: false
    },
])

onBeforeMount(()=>{
    for (let i = 0; i<sounds.value.length; i++){
        if (store.state.activeSounds.get(sounds.value[i].sound) && !store.state.activeSounds.get(sounds.value[i].sound).paused){
            sounds.value[i].isActive = true
        }
    }
})


</script>

<template>
    <section class="flex flex-col gap-5">
        <h1 class="text-center">Sounds</h1>
        <div class="sound-buttons grid">
            <button v-for="(sound, i) of sounds" :key="i"
                @click.self="store.commit('toggleSound', sound.sound); sound.isActive = !sound.isActive"
                :class="sound.isActive ? 'bg-white text-dark' : ''"
                class=" relative group text-[3rem] aspect-square flex justify-center items-center button">
                <Icon @click.self="store.commit('toggleSound', sound.sound); sound.isActive = !sound.isActive"
                    :icon="sound.icon" />
                <div
                    class="soundrange absolute top-full flex p-4 box-border bg-dark z-10 rounded-xl drop-shadow-md shadow-white scale-0 duration-200 group-hover:scale-100">
                    <input type="range"
                        @input="store.commit('setVolume', { sound: sound.sound, volume: $event.target.value })" min="0"
                        max="1" step="0.01" class="w-full">
                </div>
            </button>
        </div>
    </section>
</template>


<style scoped>
.sound-buttons {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(75px, 1fr));
}
</style>