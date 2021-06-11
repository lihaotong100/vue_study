<template>
  <div>
    <AddTask :v-show="showAddTask" @add-task="addTask" />
    <Tasks v-bind:tasks="tasks" @delete-task="deleteTask" @toggle-reminder="toggleReminder" />
  </div>
</template>

<script>
import Tasks from '../components/Tasks.vue'
import AddTask from '../components/AddTask.vue'

export default {
  name: 'Home',

  components: {
    Tasks,
    AddTask,
  },

  props: {
    showAddTask: Boolean,
  },

  data() {
    return {
      tasks: [],
    }
  },

  methods: {
    async deleteTask(id) {
      console.log(this.tasks)
      if (confirm('are you sure?')) {
        const res = await fetch(`/api/tasks/${id}`, {
          method: 'DELETE',
        })
        res.status == 200
          ? (this.tasks = this.tasks.filter((task) => task.id !== id))
          : alert('error')
      }
    },
    async toggleReminder(id) {
      const taskToToggle = await this.fetchTask(id)
      const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

      const res = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(updTask),
      })

      const data = await res.json()
      this.tasks = this.tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    },
    async addTask(task) {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(task),
      })

      console.log(task)
      const data = await res.json()
      console.log(data)
      this.tasks = [...this.tasks, data]
    },
    async fetchTasks() {
      const res = await fetch('/api/tasks')
      const data = await res.json()
      console.log(data)
      return data
    },
    async fetchTask(id) {
      const res = await fetch(`/api/tasks/${id}`)
      const data = await res.json()
      return data
    },
  },

  async created() {
    this.tasks = await this.fetchTasks()
  },
}
</script>