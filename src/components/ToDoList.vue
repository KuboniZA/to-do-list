<script setup>
import {ref, computed} from "vue";
import { useTaskStore } from "@/stores/taskStore.js";
// Reactive base date (starts at today)
const currentDate = ref(new Date());

// Tooltip visibility
const showTooltip = ref(false);

// Nicely formatted version for display
const formattedDate = computed(() => {
  return currentDate.value.toLocaleDateString("en-ZA", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });
});

// Go back to TODAY when title is clicked
const goToToday = () => {
  currentDate.value = new Date();
};

// Move by DAY
const changeDay = (amount) => {
  const newDate = new Date(currentDate.value);
  newDate.setDate(newDate.getDate() + amount);
  currentDate.value = newDate;
};

// Move by WEEK
const changeWeek = (amount) => {
  changeDay(amount * 7);
};

// Move by MONTH
const changeMonth = (amount) => {
  const newDate = new Date(currentDate.value);
  newDate.setMonth(newDate.getMonth() + amount);
  currentDate.value = newDate;
};

// Move by YEAR
const changeYear = (amount) => {
  const newDate = new Date(currentDate.value);
  newDate.setFullYear(newDate.getFullYear() + amount); // Note that setFullYear and getFullYear because setYear/GetYear have been deprecated due to a randomisation bug.
  currentDate.value = newDate;
};

const showInfo = ref(null);

// *************************** TASK STORE ****************************

const taskStore = useTaskStore();

const filteredTasks = computed(() => {
  return taskStore.tasks.filter(task => {
    if (!task.date) return false;

    const taskDate = new Date(task.date).toDateString();
    const activeDate = new Date(currentDate.value).toDateString();

    return taskDate === activeDate;
  });
});



</script>

<template>
  <div class="notepad-container">
    <div class="notepad-header">
      <div class="list-name" >
        <span @click="goToToday" @mouseenter="showTooltip = true" @mouseleave="showTooltip = false">To-Do-list</span>
        <span v-if="showTooltip" class="tooltip">Click to reset</span>
      </div>
        <div class="notepad-ring-holder">
          <div class="date-controls">
            <button @click="changeYear(-1)" @mouseenter="showInfo = 'year-before'" @mouseleave="showInfo = null">◀ Year
              <span v-if="showInfo === 'year-before'" class="info i1">Go back 1 year</span>
            </button>
            <button @click="changeYear(-1)" @mouseenter="showInfo = 'month-before'" @mouseleave="showInfo = null">◀ Month
              <span v-if="showInfo === 'month-before'" class="info i2">Go back 1 month</span>
            </button>
            <button @click="changeWeek(-1)" @mouseenter="showInfo = 'week-before'" @mouseleave="showInfo = null">◀ Week
              <span v-if="showInfo ==='week-before'" class="info i3">Go back 1 week</span>
            </button>
            <button @click="changeDay(-1)" @mouseenter="showInfo = 'day-before'" @mouseleave="showInfo = null">◀ Day
              <span v-if="showInfo === 'day-before'" class="info i4">Go back 1 day</span>
            </button>

            <div>
              <div class="list-date">{{ formattedDate }} </div>
            </div>

            <button @click="changeDay(1)" @mouseenter="showInfo = 'day-after'" @mouseleave="showInfo = null">Day ▶
              <span v-if="showInfo === 'day-after'" class="info i5">Go forward 1 day</span>
            </button>
            <button @click="changeWeek(1)" @mouseenter="showInfo = 'week-after'" @mouseleave="showInfo = null">Week ▶
              <span v-if="showInfo === 'week-after'" class="info i6">Go forward 1 week</span>
            </button>
            <button @click="changeMonth(1)" @mouseenter="showInfo = 'month-after'" @mouseleave="showInfo = null">Month ▶
              <span v-if="showInfo === 'month-after'" class="info i7">Go forward 1 month</span>
            </button>
            <button @click="changeYear(1)" @mouseenter="showInfo = 'year-after'" @mouseleave="showInfo = null">Year ▶
              <span v-if="showInfo === 'year-after'" class="info i8">Go forward 1 year</span>
            </button>
          </div>
        </div>
    </div>
    <div class="notepad-paper">
      <div v-for="task in filteredTasks" :key="task.id" class="task-line">
        <div class="task-content">
          <strong>{{ task.name }}</strong>
          <small>{{ task.time }}</small>
          <p>{{ task.details }}</p>
        </div>
        <button class="complete-btn" @click="taskStore.removeTask(task.id)">
          ✅
        </button>
      </div>
      <div class="line" />
      <div class="line" />
      <div class="line" />
      <div class="line" />
      <div class="line" />
      <div class="line" />
      <div class="line" />
      <div class="line" />
      <div class="line" />
      <div class="line" />
      <div class="line" />
      <div class="line" />
      <div class="line" />
      <div class="line" />
      <div class="line" />
      <div class="line" />
      <div class="line" />
      <div class="line" />
      <div class="line" />
      <div class="line" />
      <div class="line" />
      <div class="line" />

    </div>
  </div>
</template>

<style scoped>
body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f0f0;
  margin: 0;
  font-family: sans-serif;
}

.notepad-container {
  width: 60vw;
  height: 39rem;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  top: 8rem;
  left: 20vw;
}

.notepad-header {
  background-color: #f8f8f8;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: center;
  position: relative;
  min-height: 55px;
}

.list-name {
  display: flex;
  position: absolute;
  justify-content: center;
  left: 45%;
}
.list-name:hover {
  cursor: pointer;
}
.tooltip {
  position: absolute;
  top: -0.25rem;
  left: 5rem;
  background: lightgrey;
  color: black;
  padding: 5px 10px;
  font-size: 12px;
  border-radius: 5px;
  white-space: nowrap;
  opacity: 0.9;
  pointer-events: none;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
}
.info {
  position: absolute;
  background: lightgrey;
  color: black;
  padding: 5px 10px;
  font-size: 12px;
  border-radius: 5px;
  white-space: nowrap;
  opacity: 0.9;
  pointer-events: none;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
}
.i1 {
  top: -2rem;
  left: 0;
}
.i2 {
  top: -2rem;
  left: 5rem;
}
.i3 {
  top: -2rem;
  left: 10.75rem;
}
.i4 {
  top: -2rem;
  left: 16rem;
}
.i5 {
  top: -2rem;
  right: 13.5rem;
}
.i6 {
  top: -2rem;
  right: 8.25rem;
}
.i7 {
  top: -2rem;
  right: 2.75rem;
}
.i8 {
  top: -2rem;
  right: -2.5rem;
}
.list-date {
  margin-right: 1.5rem;
}
.notepad-ring-holder {
  display: flex;
  gap: 30px;
}

.date-controls {
  display: flex;
  position: relative;
  top: 55%;
}
button {
  height: 30px;
  display: flex;
  gap: 10px;
  border: none;
  background-color: transparent;
  margin-right: 1.5rem;

}
button:hover {
  cursor: pointer;
  color: blue;
}

.notepad-paper {
  flex-grow: 1;
  padding: 15px 20px;
  position: relative;
  background-color: #ECE63D70; /* or #fff */
  line-height: 2.5; /* Adjust for line spacing */
}

/* Red vertical line on the left */
.notepad-paper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 40px; /* Adjust position as needed */
  width: 1px;
  height: 100%;
  background-color: #ff0000; /* Red color */
}

.line {
  border-bottom: 1px dotted #ccc; /* Dotted lines for paper */
  margin-bottom: 5px; /* Space between lines */
  height: 1em; /* Ensure lines have height */
  border-top: none;
  border-left: none;
  border-right: none;
  background-color: transparent;
  width: 100%;
}
</style>