<script setup>
import {ref, computed} from "vue";

// Reactive base date (starts at today)
const currentDate = ref(new Date());

// Nicely formatted version for display
const formattedDate = computed(() => {
  return currentDate.value.toLocaleDateString("en-ZA", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });
});

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

</script>

<template>
  <div class="notepad-container">
    <div class="notepad-header">
      <div class="list-name">To-Do-list</div>
        <div class="notepad-ring-holder">
          <div class="date-controls">
            <button @click="changeDay(-1)">◀ Day</button>
            <button @click="changeWeek(-1)">◀ Week</button>
            <button @click="changeMonth(-1)">◀ Month</button>
            <div class="list-date">{{ formattedDate }} </div>
            <button @click="changeDay(1)">Day ▶</button>
            <button @click="changeWeek(1)">Week ▶</button>
            <button @click="changeMonth(1)">Month ▶</button>
          </div>
        </div>
    </div>
    <div class="notepad-paper">
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
  width: 50vw;
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
  left: 25vw;
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