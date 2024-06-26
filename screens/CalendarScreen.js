import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "./theme.js"; // Import useTheme hook

const CalendarScreen = () => {
  const { theme } = useTheme(); // Get the current theme using useTheme hook

  const months = [
    { name: "January", days: 31 },
    { name: "February", days: 29 }, // Adjust for leap years
    { name: "March", days: 31 },
    { name: "April", days: 30 },
    { name: "May", days: 31 },
    { name: "June", days: 30 },
    { name: "July", days: 31 },
    { name: "August", days: 31 },
    { name: "September", days: 30 },
    { name: "October", days: 31 },
    { name: "November", days: 30 },
    { name: "December", days: 31 },
  ];

  const [selectedMonthIndex, setSelectedMonthIndex] = useState(
    new Date().getMonth()
  );
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleDatePress = (date) => {
    setSelectedDate(date);
  };

  const handleAddTask = () => {
    if (taskText.trim() === "") {
      alert("Please enter a task.");
      return;
    }

    const newTask = { id: Date.now(), date: selectedDate, task: taskText };
    setTasks([...tasks, newTask]);
    setTaskText("");
    setSelectedDate(null);
  };

  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const changeMonth = (increment) => {
    setSelectedMonthIndex((prevMonth) => {
      let newMonth = prevMonth + increment;
      if (newMonth < 0) {
        newMonth = 11; // If January, go to December of previous year
        setSelectedYear((prevYear) => prevYear - 1);
      } else if (newMonth > 11) {
        newMonth = 0; // If December, go to January of next year
        setSelectedYear((prevYear) => prevYear + 1);
      }
      return newMonth;
    });
  };

  const currentMonth = months[selectedMonthIndex];

  const {
    taskList,
    container,
    calendarWrapper,
    calendarContainer,
    header,
    monthText,
    calendar,
    dateButton,
    selectedDate: selectedDateStyle,
    dateText,
    taskInputContainer,
    taskInput,
    addButton,
    addButtonText,
    taskListWrapper,
    taskListTitle,
    taskItem,
    taskText: taskTextStyle,
    deleteButton,
  } = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === "dark" ? "#333" : "#fff", // Apply theme-based background color
    },
    calendarWrapper: {
      flex: 0.5, // Adjusted height
      justifyContent: "center",
      alignItems: "center",
    },
    calendarContainer: {
      width: "80%",
      borderRadius: 10,
      overflow: "hidden",
      backgroundColor: theme === "dark" ? "#444" : "#fff", // Apply theme-based background color
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 10,
      paddingVertical: 5,
      backgroundColor: theme === "dark" ? "#222" : "#55a7f0", // Apply theme-based background color
    },
    monthText: {
      fontSize: 18,
      color: theme === "dark" ? "#fff" : "#000", // Apply theme-based text color
    },
    calendar: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    dateButton: {
      width: "14.28%", // 7 days in a week, so 100% / 7 = 14.28%
      aspectRatio: 1, // Ensure each date button is a square
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: theme === "dark" ? "#555" : "#fff", // Apply theme-based border color
    },
    selectedDate: {
      backgroundColor: theme === "dark" ? "#555" : "#55a7f0", // Apply theme-based background color
    },
    dateText: {
      color: theme === "dark" ? "#fff" : "#000", // Apply theme-based text color
      fontSize: 16,
    },
    taskInputContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
      marginBottom: 10,
    },
    taskInput: {
      fontSize: 20,
      flex: 1,
      borderWidth: 1,
      borderColor: theme === "dark" ? "#555" : "#ccc", // Apply theme-based border color
      borderRadius: 5,
      padding: 10,
      fontStyle: "italic",
      color: theme === "dark" ? "#fff" : "#55a7f0", // Apply theme-based text color
    },
    addButton: {
      backgroundColor: theme === "dark" ? "#555" : "#55a7f0", // Apply theme-based background color
      padding: 10,
      borderRadius: 5,
      marginLeft: 10,
    },
    addButtonText: {
      color: theme === "dark" ? "#fff" : "#fff", // Apply theme-based text color
      fontWeight: "bold",
    },
    taskListWrapper: {
      paddingHorizontal: 20,
      marginBottom: 20, // Add margin bottom to separate from the next section
      backgroundColor: theme === "dark" ? "#444" : "#fff", // Apply theme-based background color
      borderRadius: 10, // Add borderRadius to create a box-like appearance
      overflow: "hidden", // Hide overflowing content
    },
    taskListTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
      color: theme === "dark" ? "#fff" : "#000", // Apply theme-based text color
      padding: 10,
      backgroundColor: theme === "dark" ? "#222" : "#55a7f0", // Apply theme-based background color
    },
    taskItem: {
      fontSize: 20,
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
      paddingHorizontal: 10,
    },
    taskTextStyle: {
      flex: 1,
      fontSize: 25,
      fontStyle: "italic",
      color: theme === "dark" ? "#fff" : "#55a7f0", // Apply theme-based text color
    },
    deleteButton: {},
  });

  return (
    <View style={container}>
      <View style={calendarWrapper}>
        <View style={calendarContainer}>
          <View style={header}>
            <TouchableOpacity onPress={() => changeMonth(-1)}>
              <AntDesign
                name="left"
                size={24}
                color={theme === "dark" ? "#fff" : "#fff"}
              />
            </TouchableOpacity>
            <Text style={monthText}>
              {currentMonth.name} {selectedYear}
            </Text>
            <TouchableOpacity onPress={() => changeMonth(1)}>
              <AntDesign
                name="right"
                size={24}
                color={theme === "dark" ? "#fff" : "#fff"}
              />
            </TouchableOpacity>
          </View>
          <View style={calendar}>
            {[...Array(currentMonth.days)].map((_, index) => {
              const date = index + 1;
              return (
                <TouchableOpacity
                  key={date}
                  style={[
                    dateButton,
                    date === selectedDate ? selectedDateStyle : null,
                  ]}
                  onPress={() => handleDatePress(date)}
                >
                  <Text style={dateText}>{date}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
      {selectedDate && (
        <View style={taskInputContainer}>
          <TextInput
            style={taskInput}
            value={taskText}
            onChangeText={setTaskText}
            placeholder="Enter task"
          />
          <TouchableOpacity style={addButton} onPress={handleAddTask}>
            <Text style={addButtonText}>Add Task</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={taskListWrapper}>
        <Text style={taskListTitle}>Select a date to enter tasks:</Text>
        <View style={taskList}>
          {tasks.map((task) => (
            <View key={task.id} style={taskItem}>
              <Text style={taskTextStyle}>⬛️ {task.task}</Text>
              <TouchableOpacity
                style={deleteButton}
                onPress={() => handleDeleteTask(task.id)}
              >
                <AntDesign name="delete" size={24} color="red" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default CalendarScreen;
