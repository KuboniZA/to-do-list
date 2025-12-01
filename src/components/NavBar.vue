<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <nav class="navBar">
    <img src="@/assets/list_it_logo_2.svg" alt="The List It! Logo" class="logo" />

    <button class="navButton">
      <RouterLink to="/">Home</RouterLink>
    </button>
    <button class="navButton">
      <RouterLink to="/to-do-list">To-Do-List</RouterLink>
    </button>
    <button class="navButton">
      <RouterLink to="/tasks">Tasks</RouterLink>
    </button>
    <button class="navButton">
      <RouterLink to="/calendar">Calendar</RouterLink>
    </button>
  </nav>
</template>

<style scoped>
  .navBar {
    display: flex;
    position: absolute;
    width: 100vw;
    min-height: 10vh;
    background-color: lightblue;
    top: 0;
    left: 0;
    border-bottom: 2px solid transparent;
    border-image: linear-gradient(to right, red, yellow) 1;
  }
  img {
    position: relative;
    width: 5rem;
    left: 1rem;
    padding: 6px;
  }
  button {
    position: relative;
    left: 2.2rem;
    padding: 1rem 2.5rem;
    border: none;
    margin-right: 1.5rem;
    background-color: lightblue;
    text-align: left;
  }
  button:hover {
    background-color: #f1f1f1;
    cursor: pointer;
  }
</style>