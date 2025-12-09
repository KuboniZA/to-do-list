<script setup>
import { RouterLink } from "vue-router";
import {ref} from "vue";

const clicked = ref(false);
const handleClick = (buttonName) => { /* Just write this form of function when using a router to do other things */
  clicked.value = buttonName;
}

</script>

<template>
  <nav class="navBar">
    <img src="@/assets/list_it_logo_2.svg" alt="The List It! Logo" class="logo" />

    <button class="navButton" :class="clicked === 'Home' ? 'active' : ''" @click="handleClick('Home')">
      <RouterLink to="/">Home</RouterLink>
    </button>
    <button  class="navButton" :class="clicked === 'AddTasks' ? 'active' : ''" @click="handleClick('AddTasks')">
      <RouterLink to="/add-tasks">Add Tasks</RouterLink>
    </button>
    <button class="navButton" :class="clicked === 'To-Do-List' ? 'active' : ''" @click="handleClick('To-Do-List')">
      <RouterLink to="/to-do-list">To-Do-List</RouterLink>
    </button>
<!--    <button class="navButton">-->
<!--      <RouterLink to="/calendar">Calendar</RouterLink>-->
<!--    </button>-->
  </nav>
</template>

<style scoped>
  .navBar {
    display: flex;
    position: absolute;
    width: 100%;
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
  a { /* This remain "a" even though the Vue attribute is RouterLink */
    text-decoration: none;
    color: black;
  }
  button:hover {
    background-color: lightblue; /* Alternate colour #f1f1f1 */
  }
  a:hover {
    color: blue;
  }
  .active {
    color: red; /* The font weight changes, but the colour doesn't for some reason */
    font-weight: bold;
  }
</style>