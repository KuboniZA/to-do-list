<script setup>
import { RouterLink } from "vue-router";



</script>

<template>
  <nav class="navBar">
    <img src="@/assets/list_it_logo_2.svg" alt="The List It! Logo" class="logo" />

    <button class="navButton">
      <RouterLink to="/" active-class="active">Home</RouterLink>
    </button>
    <button  class="navButton">
      <RouterLink to="/add-tasks" active-class="active">Add Tasks</RouterLink>
    </button>
    <button class="navButton">
      <RouterLink to="/to-do-list" active-class="active">To-Do-List</RouterLink>
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
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.3);
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
    background-color: transparent; /* Alternate colour #f1f1f1 */
  }
  button:has(.active) { /* This works, but is greyed out for some reason */
    border-bottom: 2px solid transparent;
    border-image: linear-gradient(to right, red, yellow) 1;
  }
  a:hover {
    color: blue;

  }
  .active {
    color: blue; /* The font weight changes, but the colour doesn't for some reason */
    font-weight: bold;
    transform: scale(1.05) translateY(-2px);
  }
</style>