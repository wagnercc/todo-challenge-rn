import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/pen.png'

export interface Tasks {
    id: number;
    title: string;
    done: boolean;
}

type TaskToEdit = {
    id: number;
    title: string;
}

interface TaskItemProps {
    task: Tasks,
    index: number,
    editTask: (task: TaskToEdit) => void;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
}

export function TasksItem({ task, index, toggleTaskDone, removeTask, editTask}: TaskItemProps ) {
    const [isEditing, setisEditing] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState(task.title);
    const textInputRef = useRef<TextInput>(null);
    useEffect(() => {
        if (textInputRef.current) {
            if(isEditing) {
                textInputRef.current.focus();
            } else {
                textInputRef.current.blur();
            }
        }
    }, [isEditing])

    function handleStartEditing() {
        setisEditing(true);
    }

    function handleCancelEditing(task: Tasks) {
        setNewTaskTitle(task.title);
        setisEditing(false);
    }

    function handleSubmitEditing(taskId: number) {
        editTask({ id: taskId, title: newTaskTitle });
        setisEditing(false);
    }

    return (
        <>
        <View>
            <TouchableOpacity
                testID={`button-${index}`}
                activeOpacity={0.7}
                style={styles.taskButton}
                onPress={() => toggleTaskDone(task.id)}
            >
                <View 
                    testID={`marker-${index}`}
                    style={task.done ? styles.taskMarkerDone : styles.taskMarker}
                >
                    { task.done && (
                        <Icon 
                            name="check"
                            size={12}
                            color="#FFF"
                        />
                    )}
                </View>

                <TextInput
                    ref={textInputRef}
                    style={task.done ? styles.taskTextDone : styles.taskText}
                    value={newTaskTitle}
                    editable={isEditing}
                    onChangeText={setNewTaskTitle}
                    onSubmitEditing={() => handleSubmitEditing(task.id)}
                />
            </TouchableOpacity>
        </View>

        <View style={styles.iconsContainer} >
            { isEditing ? (
                <TouchableOpacity onPress={() => handleCancelEditing(task)}>
                    <Icon name="x" size={24} color="#b2b2b2" />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={handleStartEditing}>
                    <Image source={editIcon} />
                </TouchableOpacity>
            )}
        

            <View style={ styles.iconDivider }/>

            <TouchableOpacity
                disabled={isEditing}
                onPress={() => removeTask(task.id)}
            >
                <Image source={trashIcon}  style={{ opacity: isEditing ? 0.2 : 1 }} />
            </TouchableOpacity>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    taskButton: {
      flex: 1,
      paddingHorizontal: 24,
      paddingVertical: 15,
      marginBottom: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center'
    },
    taskMarker: {
      height: 16,
      width: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#B2B2B2',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskText: {
      color: '#666',
      fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
      height: 16,
      width: 16,
      borderRadius: 4,
      backgroundColor: '#1DB863',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskTextDone: {
      color: '#1DB863',
      textDecorationLine: 'line-through',
      fontFamily: 'Inter-Medium'
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 14,
        paddingRight: 25,
    },
    iconDivider: {
        width: 1,
        height: 24,
        backgroundColor: 'rgba(196, 196, 196, 0.24)',
        marginHorizontal: 12
    }
});
