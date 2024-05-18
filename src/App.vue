<script setup>
import Timer from './components/Timer.vue'
import Navbar from './components/Navbar.vue'

</script>

<template>
  <section class="flex p-5 sm:p-20 h-screen">
    <section class="flex h-full max-w-[50%] w-full">
      <Navbar class=" mt-8"/>
      <router-view class="bg-dark text-white p-5 rounded-3xl min-w-96  w-full h-full"></router-view>
    </section>
    <section class="timer flex justify-center items-center w-full h-full">
      <Timer/>
    </section>
  </section>
</template>

<style scoped>

</style>
