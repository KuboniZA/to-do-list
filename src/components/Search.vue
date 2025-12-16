<script setup>

</script>

<template>
  <div class="search">
    <input placeholder="Search Tasks">
  </div>


</template>

<style scoped>
.search {
  position: absolute;
  display: flex;
  top: 0;
  left: 8rem;
  width: 92%;
  height: 100vh;
  place-items: center;
  justify-content: center;
}
input {
  position: absolute;
  display: flex;
  height: 4rem;
  width: 45rem;
  border-radius: 1000px;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  padding-left: 2.5rem;
  font-size: 1.2rem;
}
</style>