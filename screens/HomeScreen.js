import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Button,
  Image,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useTheme } from "./theme";

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
            styles.taskItem,
            { backgroundColor: theme === "dark" ? "#444" : "#FFF" },
            isDeleting ? styles.deletingTask : null,
          ]}
        >
          <View style={styles.itemLeft}>
            <View
              style={[
                styles.circular,
                { borderColor: theme === "dark" ? "#FFF" : "#55BCF6" },
              ]}
            ></View>
            <Text
              style={[
                styles.taskText,
                { color: theme === "dark" ? "#FFF" : "#333" },
              ]}
            >
              {item.task_name}
            </Text>
          </View>
          <AntDesign name="delete" size={24} color="red" />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme === "dark" ? "#222" : "#FFF" },
      ]}
    >
      <Image
        source={require("./study_planner_logo.jpeg")}
        style={styles.logo}
      />
      <Text
        style={[
          styles.welcomeText,
          { color: theme === "dark" ? "#FFF" : "#333" },
        ]}
      >
        Welcome to PlanSmart
      </Text>
      <Text
        style={[styles.subtitle, { color: theme === "dark" ? "#FFF" : "#333" }]}
      >
        Your personal study assistant
      </Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme === "dark" ? "white" : "#EEE",
            color: theme === "dark" ? "white" : "#333",
          },
        ]}
        placeholder="Let's plan your today's tasks...."
        onChangeText={changeHandler}
        value={text}
      />
      <Button
        title="Add Task"
        onPress={submitHandler}
        color={theme === "dark" ? "#007bff" : "#007bff"}
      />
      <FlatList
        keyboardShouldPersistTaps="handled"
        keyExtractor={(item) => item.task_id.toString()} // Ensure task_id is a string
        data={tasks}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: "100%",
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: "100%",
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
    borderWidth: 2,
    borderRadius: 5,
    marginRight: 10,
  },
  taskText: {
    fontSize: 20,
  },
});
