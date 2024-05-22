<script setup>
import Timer from './components/Timer.vue'
import Navbar from './components/Navbar.vue'

</script>

<template>
  <section class=" flex flex-col-reverse justify-around  lg:flex-row p-5 sm:p-20 gap-10 w-full min-h-screen">
    <section class="flex flex-col lg:flex-row lg:max-w-[50%] h-full w-full">
      <Navbar class=" ml-8 lg:mt-8 -mr-1"/>
      <router-view class="bg-dark text-white p-5 rounded-3xl min-w-96  w-full h-full"></router-view>
    </section>
    <section class="timer flex justify-center items-center w-full h-full">
      <Timer/>
    </section>
  </section>
</template>

<style scoped>

</style>
