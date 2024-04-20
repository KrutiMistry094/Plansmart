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
import { useTheme } from "./theme"; // Import useTheme hook from your theme file

export default function HomeScreen() {
  const { theme } = useTheme(); // Get current theme

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
        <View
          style={[
            styles.addTask,
            { backgroundColor: theme === "dark" ? "#333" : "#FFF" },
            isDeleting ? styles.deletingTask : null,
          ]}
        >
          <View style={styles.itemLeft}></View>
          <Text
            style={[
              styles.taskText,
              { color: theme === "dark" ? "#FFF" : "#333" },
            ]}
          >
            <View
              style={[
                styles.circular,
                { borderColor: theme === "dark" ? "#FFF" : "#55BCF6" },
              ]}
            ></View>
            {item.task_name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme === "dark" ? "#222" : "#FFF" },
      ]}
    >
      <Text
        style={[styles.title, { color: theme === "dark" ? "#FFF" : "#333" }]}
      >
        Today's Tasks
      </Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme === "dark" ? "#444" : "#EEE",
            color: theme === "dark" ? "#FFF" : "#333",
          },
        ]}
        placeholder="Enter Task"
        onChangeText={changeHandler}
        value={text}
      />
      <Button
        title="Add"
        onPress={submitHandler}
        color={theme === "dark" ? "#007bff" : "#007bff"}
      />
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
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  addTask: {
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
  taskText: {
    fontSize: 16,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  circular: {
    width: 12,
    height: 12,
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
    marginRight: 10,
  },
});
