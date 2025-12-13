<script setup>
import NavBar from "@/components/NavBar.vue"
import { RouterView } from "vue-router"
</script>

<template>
  <NavBar />
  <RouterView v-slot="{ Component }" >
    <transition name="page" mode="out-in">
      <component :is="Component" />
    </transition>
  </RouterView>

</template>

<style scoped>

</style>

