import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    console.log("test", newTaskTitle)
    const data: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    };

    setTasks(oldTasks => [...oldTasks, data]);
  }

  function handleToggleTaskDone(id: number) {
    const tasksFiltered = tasks.map(task => ({ ...task }));
    const taskToCheck = tasksFiltered.find(task => task.id === id);

    if(!taskToCheck)
      return;

    taskToCheck.done = !taskToCheck.done;

    setTasks(tasksFiltered);
  }

  function handleRemoveTask(id: number) {
    setTasks(tasks => tasks.filter(task => task.id !== id));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})