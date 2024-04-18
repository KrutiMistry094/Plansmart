import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Button,
} from "react-native";
import React, { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function HomeScreen() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [deletingTaskId, setDeletingTaskId] = useState(null);

  const changeHandler = (val) => {
    setText(val);
  };

  const submitHandler = () => {
    if (!text.trim()) {
      // Display warning if task name is empty
      alert("Please enter a task name!");
      return;
    }
    setTasks((prevTask) => {
      return [{ task_name: text, task_id: Math.random() }, ...prevTask];
    });
    setText("");
  };

  const clickHandler = (task_id) => {
    setDeletingTaskId(task_id);
    // You can add a delay to simulate the task being deleted
    setTimeout(() => {
      setTasks((prevTask) => {
        return prevTask.filter((task) => task.task_id !== task_id);
      });
      setDeletingTaskId(null);
    }, 150); // Adjust the delay as needed
  };

  const renderItem = ({ item }) => {
    const isDeleting = deletingTaskId === item.task_id;
    return (
      <TouchableOpacity onPress={() => clickHandler(item.task_id)}>
        <View style={styles.itemLeft}></View>
        <Text style={[styles.addTask, isDeleting ? styles.deletingTask : null]}>
          <View>
            <View style={styles.circular}></View>
          </View>
          {item.task_name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Text>Today's Tasks</Text>
      <TextInput
        placeholder="Enter Task"
        onChangeText={changeHandler}
        value={text}
      />
      <Button title="Add" onPress={submitHandler} />
      <FlatList
        keyboardShouldPersistTaps="handled"
        keyExtractor={(item) => item.task_id.toString()} // Ensure task_id is a string
        data={tasks}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  addTask: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    margin: 10,
  },
  deletingTask: {
    backgroundColor: "#9FD4A3",
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: "#55BCF6",
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
    justifyContent: "space-around",
    marginRight: 10,
  },
});
