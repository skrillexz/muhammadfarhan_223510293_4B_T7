<template>
  <div class="app">
    <header>
      <h1>Tambah Kegiatan</h1>
      <button @click="toggleFilter">{{ showCompletedTasks ? 'Tampilkan Belum Selesai' : 'Tampilkan Sudah Selesai' }}</button>
      <nav>
        <ul>
          <li><a @click="showTodos" href="#">Todos</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <div id="content">
        <template v-if="showing === 'todos'">
          <div class="todos-section">
            <h2>Todos</h2>
            <div class="add-task">
              <input v-model="newTask" type="text" placeholder="Tambahkan kegiatan baru" @keyup.enter="addTask">
              <button @click="addTask">Tambah</button>
            </div>
            <p v-if="incompleteCount > 0">Ada {{ incompleteCount }} tugas yang belum selesai</p>
            <p v-if="completeCount > 0">Ada {{ completeCount }} tugas yang sudah selesai</p>
            <div class="tasks">
              <div v-for="(task, index) in filteredTasks" :key="task.id" :class="{ 'completed': task.completed }">
                <span>{{ task.name }}</span>
                <button @click="toggleTask(task.id)">{{ task.completed ? 'Belum Selesai' : 'Selesai' }}</button>
                <button @click="cancelTask(task.id)">Batal</button>
              </div>
            </div>
          </div>
        </template>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useCountStore } from './stores/countStore';

const store = useCountStore();
const newTask = ref('');
const showCompletedTasks = ref(true);
const showing = ref('todos');

const addTask = () => {
  if (newTask.value.trim() !== '') {
    store.addTask(newTask.value.trim());
    newTask.value = '';
  }
};

const toggleTask = (taskId) => {
  store.toggleTask(taskId);
};

const cancelTask = (taskId) => {
  store.removeTask(taskId);
};

const toggleFilter = () => {
  showCompletedTasks.value = !showCompletedTasks.value;
};

const filteredTasks = computed(() => {
  return showCompletedTasks.value ? store.completeTasks : store.incompleteTasks;
});

const showTodos = () => {
  showing.value = 'todos';
};

// Get the number of incomplete and complete tasks
const incompleteCount = computed(() => store.incompleteCount);
const completeCount = computed(() => store.completeCount);
</script>

<style scoped>
.app {
  font-family: 'Roboto', sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f7f7f7;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

header {
  text-align: center;
  margin-bottom: 20px;
}

h1 {
  color: #333;
  font-size: 2.5em;
  margin-bottom: 10px;
}

nav ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

nav ul li {
  display: inline;
  margin-right: 10px;
}

nav ul li a {
  color: #007BFF;
  text-decoration: none;
  font-weight: bold;
}

nav ul li a:hover {
  text-decoration: underline;
}

.todos-section {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.todos-section h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.add-task {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.add-task input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 10px;
  flex: 1;
  max-width: 300px;
}

.add-task button {
  padding: 10px 20px;
  border: none;
  background-color: #28a745;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
}

.add-task button:hover {
  background-color: #218838;
}

.tasks {
  list-style: none;
  padding: 0;
}

.tasks div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f9f9f9;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
}

.tasks .completed {
  text-decoration: line-through;
  color: #999;
}

.tasks button {
  margin-left: 10px;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.tasks button:first-of-type {
  background-color: #007bff;
  color: #fff;
}

.tasks button:first-of-type:hover {
  background-color: #0056b3;
}

.tasks button:last-of-type {
  background-color: #dc3545;
  color: #fff;
}

.tasks button:last-of-type:hover {
  background-color: #c82333;
}
</style>
