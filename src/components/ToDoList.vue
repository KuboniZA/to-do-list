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

// Below code will need to be amended to include the endTime of the task

const filteredTasks = computed(() => {
  const active = new Date(currentDate.value).setHours(0,0,0,0);

  return taskStore.tasks
      .filter(task => {
        const start = new Date(task.date).setHours(0,0,0,0);
        const end = task.dateEnd
            ? new Date(task.dateEnd).setHours(0,0,0,0)
            : start;

        return active >= start && active <= end;
      })
      .sort((a, b) => {
        if (!a.time) return 1;
        if (!b.time) return -1;
        return a.time.localeCompare(b.time);
      })
      .map(task => {
        const now = new Date();

        const endDateTime = task.dateEnd
            ? new Date(`${task.dateEnd} ${task.timeEnd || "23:59"}`)
            : new Date(`${task.date} ${task.time || "23:59"}`);

        const warningTime = new Date(endDateTime);
        warningTime.setMinutes(warningTime.getMinutes() - 30);

        return {
          ...task,
          overdue: now > endDateTime,
          warning: now >= warningTime && now < endDateTime
        };
      });
});

// ********************* UNDO FEATURES **********************

const completingTaskId = ref(null);
const lastDeletedTask = ref(null);
const showUndo = ref(false);
const undoComplete = ref(false);

// Soft delete, task complete.
const completeTask = (id) => {
  completingTaskId.value = id;

  setTimeout(() => {
    lastDeletedTask.value = taskStore.tasks.find(t => t.id === id);
    // taskStore.removeTask(id);
    undoComplete.value = true;

    setTimeout(() => {
      showUndo.value = false;
      lastDeletedTask.value = null;
    }, 5000);
  }, 600);
};

// Undo Delete code
const undoDelete = () => {
  if (!lastDeletedTask.value || !lastDeletedTask.value.task) {
    showUndo.value = false;
    return;
  }
  let undoDeleteTimeout = null;
  const { task: deleted, index } = lastDeletedTask.value;

  const exists = taskStore.tasks.some(t => t.id === deleted.id);
  if (!exists) {
    if(typeof taskStore.insertTaskAt === "function" ) {
      taskStore.insertTaskAt(index, JSON.parse(JSON.stringify(deleted)));
    } else if (typeof taskStore.addTaskAt === "function") {
      taskStore.addTaskAt(index, JSON.parse(JSON.stringify(deleted)));
    }
    else {
      taskStore.addTask(JSON.parse(JSON.stringify(deleted)));
    }
  }
  showUndo.value = false;
  lastDeletedTask.value = null;
  undoCountdown.value = 0;

  if (undoTimerInterval) {
    undoTimerInterval = null;
  }
};
// Hard delete
const deleteTask = (id) => {
  const tasks = taskStore.tasks;
  const idx = tasks.findIndex(t => t.id === id);
  if (idx === -1) return;

  let copy;
  try {
    copy = JSON.parse(JSON.stringify(tasks[idx]));
  } catch (e) {
    copy = { ...tasks[idx] };
  }

  lastDeletedTask.value = {
    task: copy,
    index: idx,
  };

  taskStore.removeTask(id);
  showUndo.value = true;
  undoCountdown.value = 10;

  if (undoTimerInterval) clearInterval(undoTimerInterval);

  undoTimerInterval = setInterval(() => {
    undoCountdown.value--;

    if(undoCountdown.value <= 0) {
      clearInterval(undoTimerInterval);
      undoTimerInterval = null;
      taskStore.removeTask(id);
      showUndo.value = false;
      lastDeletedTask.value = null;
    }
  }, 1000);
};

// *************************** TIMEOUT BUTTON ***************************

const undoCountdown = ref(0);
let undoTimerInterval = null;

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
      <TransitionGroup name="task" tag="div" class="paper-grid">
        <div v-for="(task, index) in filteredTasks" :key="task.id" class="paper-line" :class="{ overdue: task.overdue, warning: task.warning }">
          <div class="task-name" :class="{ done: completingTaskId === task.id }">
            <span>{{ task.name }}</span>

            <span v-if="task.time">
              {{ task.time }}
              <span v-if="task.timeEnd" class="task-time">→ {{ task.timeEnd }}</span>
            </span>

            <span v-if="task.dateEnd" class="task-end-date">
              (Ends {{ new Date(task.dateEnd).toLocaleDateString() }})
            </span>

            <span v-if="task.details" class="task-details">- {{ task.details }}</span>
          </div>
          <div class="task-actions">
            <button class="undo-complete-btn" @click="completeTask(task.id)">undo complete</button>
            <button class="complete-btn" @click="completeTask(task.id)">✅</button>
            <button class="delete-btn" @click="deleteTask(task.id)">🗑</button>
          </div>
        </div>
      </TransitionGroup>
      <!-- LINES     -->
      <div v-for="n in 20 - filteredTasks.length" :key="'empty-' + n" class="paper-line empty" />
      <!-- POPUP  -->
      <Transition name="fade">
        <div v-if="showUndo" class="undo-popup">
        Task deleted
        <button @click="undoDelete">Undo: {{undoCountdown}}</button>
        </div>
      </Transition>

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
.undo-complete-btn {
  background-color: lightgrey;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
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

.paper-grid {
  display: flex;
  flex-direction: column;
}

.paper-line {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 2.5rem;
  max-height: 2.5rem;
  padding: 4px 10px 4px 48px; /* aligns with red margin */
  border-bottom: 1px dotted #aaa;
  position: relative;
  overflow: hidden;
}

.paper-line.empty {
  pointer-events: none;
}

/* ✅ Task Content */
.task-name {
  display: inline-flex;
  align-items: flex-end;
  gap: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 78%;
  font-size: 1.05rem;
  font-weight: 600;
  line-height: 1.15;
  padding-bottom: 0;
}


.task-time {
  opacity: 0.75;
  font-size: 0.85rem;
}

.task-end-date {
  font-size: 0.8rem;
  opacity: 0.7;
}

.task-details {
  font-style: italic;
  opacity: 0.85;
  overflow: hidden;
  text-overflow: ellipsis;
}


/* ✅ Actions */
.task-actions {
  display: flex;
  gap: 6px;
  margin-top: 2px;
}


.paper-line.warning {
  background: rgba(255, 165, 0, 0.15);
  border-left: 4px solid orange;
}
/* Overdue notification */
.paper-line.overdue {
  background: rgba(255, 0, 0, 0.1);
  border-left: 4px solid red;
}

.task-name.done {
  text-decoration: line-through;
  opacity: 0.5;
  transition: all 0.6s ease;
}

.undo-popup {
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: darkblue;
  color: white;
  padding: 12px 18px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.9rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  z-index: 999;
}

.undo-popup button {
  background: white;
  color: black;
  border: none;
  padding: 4px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
}

.undo-popup button:hover {
  background: lightgray;
}


.task-actions {
  display: flex;
  gap: 8px;
}

.delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  opacity: 0.6;
}

.delete-btn:hover {
  opacity: 1;
  color: red;
}

/* Task animations */
.task-enter-active,
.task-leave-active {
  transition: all 0.3s ease;
}

.task-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}

.task-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}


</style>