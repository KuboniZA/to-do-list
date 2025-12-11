<script setup>
  // import { useRouter } from "vue-router";
  import { ref } from "vue";
  import { VueDatePicker } from "@vuepic/vue-datepicker";
  import '@vuepic/vue-datepicker/dist/main.css'
  import { useTaskStore } from "@/stores/taskStore.js";

  const taskName = ref("");
  const taskDetails = ref("");
  const startDate = ref(null);
  const endDate = ref(null);
  const startTime = ref("");
  const endTime = ref("");

  // const router = useRouter();

  // ***************************** HANDLE TASKS *************************************

  const taskStore = useTaskStore();

  const enterToDoList = () => {
    taskStore.addTask({
      id: Date.now(),
      name: taskName.value,
      details: taskDetails.value,
      date: startDate.value, // this links to ToDoList
      dateEnd: endDate.value,
      time: startTime.value,
      timeEnd: endTime.value,
    });

    // reset
    taskName.value = "";
    taskDetails.value = "";
    startDate.value = null;
    endDate.value = null;
    startTime.value = "";
    endTime.value = "";
  };

</script>

<template>
  <section>
    <header class="heading"><h1>ADD TASK BELOW:</h1></header>
    <div class="taskGrid">
      <div class="query q1">Add a task:
        <p class="required">(Required)</p>
        <input v-model="taskName" placeholder="Add Task Name" class="queryDetails">

      </div>
      <div class="query q1">Task Details:
        <input v-model="taskDetails" placeholder="Enter Details" class="queryDetails">
      </div>
      <div class="query q2">Start Date:
        <p class="required">(Required)</p>
        <VueDatePicker v-model="startDate" placeholder="Click to select" :time-config="{enableTimePicker: false}" :formats="{input: 'dd/MM/yyyy', preview: 'dd/MM/yyyy'}" class="queryDetails" />
      </div>
      <div class="query q2">End Date:
        <VueDatePicker v-model="endDate" placeholder="Click to select" :time-config="{enableTimePicker: false}" :formats="{input: 'dd/MM/yyyy', preview: 'dd/MM/yyyy'}" class="queryDetails" />
      </div>
      <div class="query q3">Start Time:
        <p class="required">(Required)</p>
      <!-- Writing "time-picker has resolved the issue and I can now just select the time with no date.-->
        <VueDatePicker v-model="startTime" placeholder="Click to select" time-picker :model-type="'HH:mm'" class="queryDetails" />
      </div>
      <!-- Click on on the minutes to increment by 5 -->
      <div class="query q3">End Time:
        <VueDatePicker v-model="endTime" placeholder="Click to select" time-picker :model-type="'HH:mm'" class="queryDetails" />
      </div>
    </div>
    <button @click="enterToDoList">SUBMIT</button>
  </section>
</template>

<style scoped>
section {
  display: flex;
}
.heading {
  position: relative;
  height: 3rem;
  width: 70vw;
  top: 6rem;
  left: 40%;
;
}
.taskGrid {
  position: absolute;
  top: 12rem;
  left: 15%;
  height: 70vh;
  width: 70%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 1fr 1fr 1fr;
  padding: 0;
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  gap: 1px;
}
.query {
  position: relative;
  height: 10rem;
  width: 80%;
  left: 2rem;
  font-size: 2rem;
  background-color: #ffffff;
}
.q1 {
  top: 2rem;
}
.q2 {
  top: -0.5rem;
}
.q3 {
  top: -2rem;
}
.queryDetails {
  border-bottom: 1px dotted #ccc; /* Dotted lines for paper */
  margin-bottom: 5px; /* Space between lines */
  height: 2rem; /* Ensure lines have height */
  border-top: none;
  border-left: none;
  border-right: none;
  background-color: #ffffff;
  width: 100%;
  font-size: 1.2rem;
}
button {
  position: relative;
  top: 81vh;
  right: 27%;
  width: 10rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #ccc;
  border-radius: 15px;
}
button:hover {
  cursor: pointer;
}
.required {
  position: absolute;
  color: lightgrey;
  font-size: 0.85rem;
  top: -0.3rem;
  left: 35%;
}
</style>