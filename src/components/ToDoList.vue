<script setup>

</script>

<template>
  <div class="notepad-container">
    <div class="notepad-header">
      <div class="notepad-ring-holder">
        <div class="ring"></div>
        <div class="ring"></div>
        <div class="lis-name">To-Do-List *Date* </div>
        <div class="ring"></div>
        <div class="ring"></div>
      </div>
    </div>
    <div class="notepad-paper">
      <input class="line">
      <input class="line">
      <input class="line">
      <input class="line">
      <input class="line">
      <input class="line">
      <input class="line">
      <input class="line">
      <input class="line">
      <input class="line">
      <input class="line">
      <input class="line">
      <input class="line">
    </div>
  </div>
  <div class="notepad-container-2">
    <div class="notepad-header">
      <div class="notepad-ring-holder">
        <div class="ring"></div>
        <div class="ring"></div>
        <div class="lis-name">To-Do-List *Date*</div>
        <div class="ring"></div>
        <div class="ring"></div>
      </div>
    </div>
    <div class="notepad-paper">
      <input class="line">
      <input class="line">
      <input class="line">
      <input class="line">
      <input class="line">
      <input class="line">
      <input class="line">
      <input class="line">
      <input class="line">
      <input class="line">
      <input class="line">
      <input class="line">
      <input class="line">
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
  width: 30vw;
  height: 550px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  top: 10rem;
  left: 15vw;
}

.notepad-container-2 {
  width: 30vw;
  height: 550px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  top: -24.5rem;
  left: 50vw;
}

.notepad-header {
  background-color: #f8f8f8;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: center;
  position: relative;
}

.notepad-ring-holder {
  display: flex;
  gap: 30px;
}

.ring {
  width: 15px;
  height: 15px;
  background-color: #aaa;
  border-radius: 50%;
  border: 1px solid #888;
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