import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCountStore = defineStore('countStore', {
  state: () => ({
    tasks: ref([]),
    nextId: ref(1),
  }),
  actions: {
    addTask(taskName) {
      this.tasks.push({ id: this.nextId++, name: taskName, completed: false });
    },
    toggleTask(taskId) {
      const task = this.tasks.find(task => task.id === taskId);
      if (task) {
        task.completed = !task.completed;
      }
    },
    removeTask(taskId) {
      this.tasks = this.tasks.filter(task => task.id !== taskId);
    },
  },
  getters: {
    incompleteTasks: (state) => state.tasks.filter(task => !task.completed),
    completeTasks: (state) => state.tasks.filter(task => task.completed),
    incompleteCount: (state) => state.tasks.filter(task => !task.completed).length,
    completeCount: (state) => state.tasks.filter(task => task.completed).length,
    totalCount: (state) => state.tasks.length,
  },
});
