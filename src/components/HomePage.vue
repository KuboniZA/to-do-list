<script setup>

</script>

<template>
  <section>
    <RouterLink to="/to-do-list" class="welcome">Welcome to List It!</RouterLink>
  </section>
</template>

<style scoped>
section {
  position: absolute;
  display: flex;
  align-items: center;
  top: 40vh;
  left: 10%;
  font-size: 10rem;
}
.welcome:hover {
  cursor: pointer;
}
a {
  text-decoration: none;
  color: black;
}
</style>