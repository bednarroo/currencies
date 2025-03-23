<script setup>
import { RouterView } from 'vue-router'
import MainNavbar from '@/components/MainNavbar.vue'


</script>

<template>
  <MainNavbar/>
  <section class="content">
    <RouterView />
  </section>

</template>

<style scoped>

</style>
