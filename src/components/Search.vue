<script setup>
import { ref, computed } from 'vue';
import { useTaskStore} from "@/stores/taskStore.js";
import {useRouter} from "vue-router";

const taskStore = useTaskStore();
const router = useRouter();
const search = ref('');
const activeIndex = ref(-1)

const suggestions = computed(() => {
  if (!search.value) return [];

  const q = search.value.toLowerCase();

  return taskStore.tasks
      .filter(t => t.name.toLowerCase().includes(q))
      .slice(0, 7);
});

const handleEnterKey = () => {
  if (!suggestions.value.length) return;

  const index = activeIndex.value >= 0 ? activeIndex.value : 0;

  router.push({
    name: 'TaskDetail',
    params: { id: suggestions.value[0].id }
  });
  closeSearch()
};

const moveDown = () => {
  if (!suggestions.value.length) return;

  activeIndex.value =
      (activeIndex.value +1) % suggestions.value.length;
};
const moveUp = () => {
  if (!suggestions.value.length) return;

  activeIndex.value =
      (activeIndex.value -1) % suggestions.value.length;
};




const closeSearch = () => {
  search.value = '';
  activeIndex.value = -1;
}

const goToTask = (id) => {
  router.push({
    name: 'TaskDetail',
    params: { id }
  });
  closeSearch();
};

const highlight = (text) => {
  if (!search.value) return text;

  const q = search.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return text.replace(
      new RegExp(`(${q})`, 'gi'),
      '<mark>$1</mark>'
  );
}

</script>

<template>
  <div class="search">
    <input v-model="search" @keydown.enter.prevent="handleEnterKey" @keydown.down.prevent="moveDown" @keydown.up.prevent="moveUp" placeholder="Search Tasks">
    <ul v-if="suggestions.length" class="suggestions">
      <li v-for="(task, i) in suggestions" :key="task.id" :class="{ active: i === activeIndex }" @mouseenter="activeIndex = i" @click="goToTask(task.id)" v-html="highlight(task.name)"></li>
    </ul>
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
input:focus {
  outline: none;
  border: 2px solid rgb(0, 0, 255);
}
.suggestions {
  position: absolute;
  top: 60%;
  width: 45rem;
  background: white;
  list-style: none;
  padding: 0;
  margin: 0;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.25);
  overflow: hidden;
}

.suggestions li {
  padding: 12px 18px;
  cursor: pointer;
}

.suggestions li:hover {
  background: #f0f0f0;
}
mark {
  background: #fff3a0;
  padding: 0 2px;
  border-radius: 3px;
}
.suggestions li.active {
  background-color: #e0e0ff;
}

</style>