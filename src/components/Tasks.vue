<template>
  <div>
    <div :key="task.id" v-for="task in tasks">
      <Task
        @delete-task="$emit('delete-task',task.id)"
        :task="task"
        @toggle-reminder="$emit('toggleReminder',task.id)"
      />
    </div>
  </div>
</template>

<script>
import Task from './Task.vue'
export default {
  name: 'Tasks',
  components: {
    Task,
  },
  props: {
    tasks: Array,
  },
  emits: ['delete-task', 'toggleReminder'],
}
</script>
