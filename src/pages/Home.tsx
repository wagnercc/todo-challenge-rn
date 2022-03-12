import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

type editTask = {
  id: number;
  title: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {

    const findDuplicatedTask = tasks.find(task => task.title.toLowerCase() === newTaskTitle.toLowerCase());
    if (findDuplicatedTask) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      )

      return;
    }

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
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          style: "cancel"
        },
        {
          text: "Sim",
          onPress: () => setTasks(tasks => tasks.filter(task => task.id !== id))
        }
      ]
    )
    
  }

  function handleEditTask(newTask: editTask) {
    const tasksCopy = tasks.map(task => ({ ...task }))
    const taskFiltered = tasksCopy.find(task => task.id === newTask.id);

    if(!taskFiltered) {
      return ;
    }

    taskFiltered.title = newTask.title;
    setTasks(tasksCopy);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
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