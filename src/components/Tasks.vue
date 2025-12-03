<script setup>
  import { useRouter } from "vue-router";
  import { ref } from "vue";
  import { VueDatePicker } from "@vuepic/vue-datepicker";
  import '@vuepic/vue-datepicker/dist/main.css'

  const startDate = ref();
  const endDate = ref();
  const startTime = ref();
  const endTime = ref();

  const router = useRouter();

  const enterToDoList = () => {
    router.push("/to-do-list");
  }

</script>

<template>
  <section>
    <header class="heading"><h1>ADD TASK BELOW:</h1></header>
    <div class="taskGrid">
      <div class="query q1">Add a task:
        <input class="queryDetails">
      </div>
      <div class="query q1">Task Details:
        <input class="queryDetails">
      </div>
      <div class="query q2">Start Date:
        <VueDatePicker v-model="startDate" :time-config="{enableTimePicker: false}" class="queryDetails" />
      </div>
      <div class="query q2">End Date:
        <VueDatePicker v-model="endDate" :time-config="{enableTimePicker: false}" class="queryDetails" />
      </div>
      <div class="query q3">Start Time:
      <!-- The code :time-picker="{enableDatePicker: false}" should not be used according to the warning,
      however the "timeOnly" propo, as suggested by the documentation, does not work flat out.
      Maybe a pull request is need in their github repo.-->
        <VueDatePicker v-model="startTime" :time-picker="{enableDatePicker: false}" class="queryDetails" />
      </div>
      <!-- Need to figure out how to increment the time by 5 minutes when selecting a time.
      The below and current reading is not working. -->
      <div class="query q3">End Time:
        <VueDatePicker v-model="endTime" :time-picker="{enableDatePicker: false}" :time-config="{minutesGridIncrement: 5}" class="queryDetails" />
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
}
button:hover {
  cursor: pointer;
}
</style>