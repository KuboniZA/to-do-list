<script setup>
//Router import
import { useRouter} from "vue-router";

//DO NOT FORGET PARENTHESIS WHEN CALLING useRouter()!!!
const router = useRouter();

const goToTasks = () => {
  router.push("/add-tasks");
}
</script>

<template>
  <section>
    <p class="welcome">Welcome to List It!</p>
    <p class="enterSite">Click <span @click="goToTasks">enter</span> to begin</p>
  </section>
</template>

<style scoped>
section {
  position: absolute;
  display: flex;
  align-items: center;
  top: 16vh;
  left: 10%;
  font-size: 10rem;
}
.enterSite {
  position: absolute;
  top: 34vh;
  left: 30%;
  font-size: 4rem;
}
span {
  color: blue;
  text-decoration: underline;
}
span:hover {
  cursor: pointer;
}

</style>