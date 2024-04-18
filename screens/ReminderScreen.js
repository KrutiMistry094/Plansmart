import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Button,
} from "react-native";

const ReminderScreen = () => {
  const [reminderText, setReminderText] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [reminders, setReminders] = useState([]);

  const handleCreateReminder = () => {
    if (reminderText.trim() === "") {
      alert("Please enter a reminder text.");
      return;
    }
    const newReminder = {
      id: Date.now().toString(),
      text: reminderText,
      color: selectedColor,
      time: selectedTime,
    };
    setReminders((prevReminders) => [...prevReminders, newReminder]);
    setReminderText("");
    setSelectedColor("");
    setSelectedTime("");
  };

  const handleDeleteReminder = (id) => {
    setReminders((prevReminders) =>
      prevReminders.filter((reminder) => reminder.id !== id)
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Reminder Text:</Text>
      <TextInput
        style={styles.input}
        value={reminderText}
        onChangeText={setReminderText}
        placeholder="Enter reminder text"
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: "#55a7f0", marginRight: 10 },
          ]}
          onPress={() => console.log("Open color picker")}
        >
          <Text style={styles.buttonText}>Select Color</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#55a7f0" }]}
          onPress={() => console.log("Open time picker")}
        >
          <Text style={styles.buttonText}>Select Time</Text>
        </TouchableOpacity>
      </View>
      <Button
        title="Create Reminder"
        onPress={handleCreateReminder}
        color="#55a7f0"
      />
      <FlatList
        data={reminders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.reminderItem}>
            <Text>{item.text}</Text>
            <Text>{item.color}</Text>
            <Text>{item.time}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteReminder(item.id)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  reminderItem: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: "#B90E0A",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: "flex-between",
    paddingLeft: 110,
    marginLeft: 30,
    marginRight: 30,
  },
  deleteButtonText: {
    color: "white",
    fontSize: 14,
  },
});

export default ReminderScreen;
