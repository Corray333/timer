<script setup>
import { Icon } from '@iconify/vue'

</script>

<template>
    <aside class="flex flex-row  lg:flex-col">
        <router-link to="/timer"><Icon icon="ph:timer-bold" /></router-link>
        <router-link to="/sounds"><Icon icon="ri:music-fill" /></router-link>
        <router-link to="/tasks"><Icon icon="octicon:checkbox-16" /></router-link>
    </aside>
</template>


<style scoped>

aside>a{
    font-size: 2rem;
    height: 3rem;
    width: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: solid 4px var(--dark);
    margin-left: -4px;
    border-radius: 15px 15px 0 0;
    transition: all 0.5s;
}

@media (min-width: 1024px) {
    aside>a{
    border-radius: 15px 0 0 15px;
    margin-top: -4px;
    }
}
.router-link-active{
    background-color: var(--dark);
}
.router-link-active, aside>a:hover {
    background-color: var(--dark);
    svg>*{
        color: white !important;
    }   
}
</style>