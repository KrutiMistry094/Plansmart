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
import React from "react";
import { useState } from "react";

export default function HomeScreen() {
  const [tasks, setTasks] = useState([
    { task_name: "Wake up at 7am", task_id: 1 },
  ]);

  const [text, setText] = useState();

  const changeHandler = (val) => {
    setText(val);
  };

  const submitHandler = () => {
    setTasks((prevTask) => {
      return [{ task_name: text, task_id: Math.random() }, ...prevTask];
    });
  };

  const clickHandler = (task_id) => {
    setTasks((prevTask) => {
      return prevTask.filter((task) => task.task_id != task_id);
    });
  };

  return (
    <View>
      <Text>Today's Tasks</Text>
      <TextInput placeholder="Enter Task" onChangeText={changeHandler} />
      <Button title="Add" onPress={submitHandler} />
      <FlatList
        keyExtractor={(item) => item.task_id}
        data={tasks}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => clickHandler(item.task_id)}>
            <Text>{item.task_name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
