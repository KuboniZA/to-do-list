<script setup>
import { RouterLink } from "vue-router";



</script>

<template>
  <nav class="navBar">
    <img src="@/assets/list_it_logo_2.svg" alt="The List It! Logo" class="logo" />

    <button class="navButton b1">
      <RouterLink to="/" active-class="active">Home</RouterLink>
    </button>
    <button class="navButton b2">
      <RouterLink to="/to-do-list" active-class="active">Today</RouterLink>
    </button>
    <button  class="navButton b3">
      <RouterLink to="/add-tasks" active-class="active">Add Tasks</RouterLink>
    </button>
    <button  class="navButton b4">
      <RouterLink to="/upcoming" active-class="active">Upcoming</RouterLink>
    </button>
    <button  class="navButton b5">
      <RouterLink to="/search" active-class="active">Search</RouterLink>
    </button>
    <button  class="navButton b6">
      <RouterLink to="/calendar" active-class="active">Calendar</RouterLink>
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
    width: 8%;
    min-height: 100%;
    background-color: lightblue;
    top: 0;
    left: 0;
    box-shadow: 0 10px 12px rgba(0, 0, 0, 0.5);
  }
  img {
    position: absolute;
    width: 5rem;
    left: 1rem;
    padding: 6px;
  }
  button {
    display: flex;
    position: absolute;
    height: 4rem;
    width: 8rem;
    margin-bottom: 1rem;
    left: 0;
    border: none;
    background-color: lightblue;
    justify-content: center;
    align-items: center;
  }
  .b1 {
    top: 6rem;
  }
  .b2 {
    top: 11rem;
  }
  .b3 {
    top: 16rem;
  }
  .b4 {
    top: 21rem;
  }
  .b5 {
    top: 26rem;
  }
  .b6 {
    top: 31rem;
  }
  a { /* This remain "a" even though the Vue attribute is RouterLink */
    text-decoration: none;
    color: black;
  }
  button:hover {
    background-color: blue; /* Alternate colour #f1f1f1 */
    color: white;
  }
  button:has(.active) { /* This works, but is greyed out for some reason */
    border-right: 2px solid transparent;
    border-image: linear-gradient(to bottom, red, yellow) 1;
  }
  a:hover {
    color: white;

  }
  .active {
    color: blue; /* The font weight changes, but the colour doesn't for some reason */
    font-weight: bold;
    transform: scale(1.05) translateY(-2px);
  }
</style>