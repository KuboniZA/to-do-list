<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useTaskStore } from "@/stores/taskStore.js";
const route = useRoute();
const router = useRouter();
const taskStore = useTaskStore();

const taskId = Number(route.params.id);

const task = computed(() =>
  taskStore.tasks.find(t => t.id === taskId)
);

if (!task.value) {
  router.replace("/");
}
</script>

<template>
  <div v-if="task" class="task-detail">
    <h1>{{ task.name }}</h1>
    <p v-if="task.details">{{ task.details }}</p>
    <p>📆 {{ new Date(task.date).toLocaleDateString() }}
      <span v-if="task.dateEnd">→ {{ new Date(task.dateEnd).toLocaleDateString() }}</span>
    </p>
    <p>⏱️ {{ task.time }}
      <span v-if="task.timeEnd">→ {{ task.timeEnd }}</span>
    </p>
    <button @click="$router.back()">⬅️ Back</button>

  </div>

</template>

<style scoped>
.task-detail {
  padding: 2rem;
}
</style>