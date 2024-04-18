import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons"; // Import AntDesign for arrow keys

const CalendarScreen = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Default to current month
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState("This Week");
  const [selectedDay, setSelectedDay] = useState(null);

  // Function to change month
  const changeMonth = (increment) => {
    setSelectedMonth((prevMonth) => {
      let newMonth = prevMonth + increment;
      if (newMonth < 1)
        newMonth = 12; // If December, go to January of next year
      else if (newMonth > 12) newMonth = 1; // If January, go to December of previous year
      return newMonth;
    });
  };

  // Function to handle selecting option
  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setShowOptions(false);
    // Reset selected day when option changes
    setSelectedDay(null);
  };

  // Function to handle selecting a day
  const handleSelectDay = (day) => {
    setSelectedDay(day);
    // Logic to display tasks for the selected day
  };

  // Function to start creating task
  const handleCreateTask = () => {
    // Logic to navigate to task creation screen with selected option and day
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => changeMonth(-1)}>
          <AntDesign name="left" size={24} />
        </TouchableOpacity>
        <Text style={styles.monthText}>{months[selectedMonth - 1]}</Text>
        <TouchableOpacity onPress={() => changeMonth(1)}>
          <AntDesign name="right" size={24} />
        </TouchableOpacity>
      </View>
      {/* Sidebar Icon */}
      <TouchableOpacity
        onPress={() => setShowOptions(!showOptions)}
        style={styles.sidebarIcon}
      >
        <AntDesign name="menu-fold" size={24} color="black" />
      </TouchableOpacity>
      {/* Dropdown-like Options */}
      {showOptions && (
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            onPress={() => handleSelectOption("This Week")}
            style={styles.optionItem}
          >
            <Text style={styles.optionText}>This Week</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSelectOption("Next Week")}
            style={styles.optionItem}
          >
            <Text style={styles.optionText}>Next Week</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSelectOption("This Month")}
            style={styles.optionItem}
          >
            <Text style={styles.optionText}>This Month</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSelectOption("Today")}
            style={styles.optionItem}
          >
            <Text style={styles.optionText}>Today</Text>
          </TouchableOpacity>
        </View>
      )}
      {/* Display Selected Option */}
      <View style={styles.selectedOptionContainer}>
        <Text style={styles.selectedOptionText}>{selectedOption}</Text>
        {selectedDay && (
          <Text style={styles.selectedOptionText}>
            Selected Day: {selectedDay}
          </Text>
        )}
      </View>
      {/* Start Creating Task Button */}
      <TouchableOpacity
        onPress={handleCreateTask}
        style={styles.createTaskButton}
      >
        <Text style={styles.createTaskButtonText}>Start Creating Task</Text>
      </TouchableOpacity>
      {/* Calendar Tasks */}
      {/* Include your FlatList or other components here for displaying tasks */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  monthText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  sidebarIcon: {
    position: "absolute",
    top: 120,
    left: 20,
    zIndex: 1,
  },
  optionsContainer: {
    position: "absolute",
    top: 170,
    left: 20,
    zIndex: 1,
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 1,
    shadow: xxl,
    borderColor: "rgba(0, 0, 0, 0.1)",
    padding: 10,
    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  optionItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  optionText: {
    fontSize: 16,
  },
  selectedOptionContainer: {
    position: "absolute",
    top: 100,
    left: 20,
    zIndex: 1,
  },
  selectedOptionText: {
    fontSize: 16,
    marginBottom: 5,
  },
  createTaskButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    zIndex: 1,
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  createTaskButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default CalendarScreen;
