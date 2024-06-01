<script setup>

import { ref, onBeforeMount } from 'vue'
import { Icon } from '@iconify/vue'
import { useStore } from 'vuex'

const store = useStore()

const audioURL = ref('')

const player = ref('')

function convertSpotifyToEmbedLink(baseLink) {
  const parts = baseLink.split('.com/');

  const embedLink = parts[0] + '.com/embed/' + parts[1];
  console.log(parts)

  return embedLink;
}

function convertYandexToEmbedLink(baseLink) {
    const userIdAndPlaylistId = baseLink.match(/users\/(.+?)\/playlists\/(\d+)/);

  if (!userIdAndPlaylistId || userIdAndPlaylistId.length!== 3) {
    throw new Error("Invalid base link format.");
  }

  const userId = userIdAndPlaylistId[1];
  const playlistId = userIdAndPlaylistId[2];

  // Формируем ссылку для встраивания
  const embedLink = `https://music.yandex.ru/iframe/playlist/${userId}/${playlistId}`;

  return embedLink;
}


const createPlayer = ()=>{
    localStorage.setItem('musicURL', audioURL.value)
    if (audioURL.value.includes('spotify')){
        player.value = `<iframe class="rounded-xl" style="border-radius:12px" src="${convertSpotifyToEmbedLink(audioURL.value)}?utm_source=generator" width="100%" height="100%" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`
    } else if (audioURL.value.includes('yandex')){
        player.value = `<iframe class="rounded-xl" frameborder="0" style="border:none;width:100%;height:100%;" width="100%" height="100%" src="${convertYandexToEmbedLink(audioURL.value)}"></iframe>`
    }
}


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

    let url = localStorage.getItem('musicURL')
    if (url && url != 'null') audioURL.value = url
    createPlayer()
    for (let i = 0; i<sounds.value.length; i++){
        if (store.state.activeSounds.get(sounds.value[i].sound) && !store.state.activeSounds.get(sounds.value[i].sound).paused){
            sounds.value[i].isActive = true
        }
    }
})


</script>

<template>
    <section class="flex flex-col gap-5 overflow-y-scroll">
        <h1 class="text-center">Sounds</h1>
        <div class="sound-buttons grid">
            <button v-for="(sound, i) of sounds" :key="i"
                @click.self="store.commit('toggleSound', sound.sound); sound.isActive = !sound.isActive"
                :class="sound.isActive ? 'bg-white text-dark' : ''"
                class=" relative group text-[3rem] aspect-square flex justify-center items-center button">
                <Icon @click.self="store.commit('toggleSound', sound.sound); sound.isActive = !sound.isActive"
                    :icon="sound.icon" />
                <div
                    class="soundrange absolute top-full flex p-4 bg-dark z-10 rounded-xl drop-shadow-2xl scale-0 duration-200 group-hover:scale-100">
                    <input type="range"
                        @input="store.commit('setVolume', { sound: sound.sound, volume: $event.target.value })" min="0"
                        max="1" step="0.01" class="w-full">
                </div>
            </button>
        </div>
        <div class="music flex flex-col items-center h-full">
            <h1>Music</h1>
            <span class="flex gap-2 mb-5 min-w-64">
                <input v-model="audioURL" type="text" class=" bg-transparent border-b-2 border-white w-full" placeholder="Yandex or spotify playlist URL">
                <button @click="createPlayer" class="text-2xl"><Icon icon="ci:save" /></button>
            </span>
            <span v-if="player.length>0" v-html="player" class="w-full h-full min-h-96"></span>
        </div>
    </section>
</template>


<style scoped>

section{
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}

.sound-buttons {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(75px, 1fr));
}
</style>