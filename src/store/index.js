import { createStore } from 'vuex'

const store = createStore({
    state: {
        workMinutes: 30,
        workSeconds: 0,
        restMinutes: 5,
        restSeconds: 0,
        minutes: 30,
        seconds: 0,
        endTime: 30 * 60,
        numberOfCycles: 3,
        work: true,
        cycle: 1,
        activeSounds: new Map()
    },
    getters: {},
    mutations: {
        setVolume(state, payload) {
            if (!state.activeSounds.has(payload.sound)) return
            state.activeSounds.get(payload.sound).volume = payload.volume
        },
        setTime(state, payload) {
            state.workMinutes = payload.workMinutes
            state.workSeconds = payload.workSeconds
            state.restMinutes = payload.restMinutes
            state.restSeconds = payload.restSeconds
            state.endTime = state.workMinutes * 60 + state.workSeconds
            state.minutes = state.workMinutes
            state.seconds = state.workSeconds,
                state.numberOfCycles = payload.cycles,
                state.cycle = 1
        },
        spendTime(state) {
            if (state.seconds == 0) {
                state.minutes--
                state.seconds = 60
                return
            } else {
                state.seconds--
            }
        },
        nextPhaze(state) {
            if (state.work) {
                state.work = false
                state.minutes = state.restMinutes
                state.seconds = state.restSeconds
                state.endTime = state.restMinutes * 60 + state.restSeconds
                return
            }
            state.work = true
            state.minutes = state.workMinutes
            state.seconds = state.workSeconds
            state.endTime = state.workMinutes * 60 + state.workSeconds
            if (state.cycle == state.numberOfCycles) {
                state.cycle = 1
            } else {
                state.cycle++
            }
        },
        endSession(state) {
            state.minutes = state.workMinutes
            state.seconds = state.workSeconds
            state.endTime = state.workMinutes * 60 + state.workSeconds
            state.cycle = 1
        },
        toggleSound(state, sound) {
            // Check if the sound is already playing
            const audioElement = state.activeSounds.get(sound);
            if (audioElement) {
                audioElement.pause()
                audioElement.remove()
                state.activeSounds.delete(sound)
            } else {
                // Otherwise, create a new audio element, set its source, and play it
                const newAudioElement = document.createElement('audio');
                newAudioElement.src = `./src/assets/sounds/${sound}`;
                newAudioElement.play().catch(error => console.error("Error playing audio:", error));
                // Store the new audio element in the map
                state.activeSounds.set(sound, newAudioElement);
            }
        }
    }
})

export default store