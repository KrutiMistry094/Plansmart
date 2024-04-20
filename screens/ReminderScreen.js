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
  const [selectedDate, setSelectedDate] = useState("");
  const [reminderNotes, setNotes] = useState("");
  const [reminders, setReminders] = useState([]);

  const handleCreateReminder = () => {
    if (reminderText.trim() === "") {
      alert("Please enter a reminder text.");
      return;
    }
    const newReminder = {
      id: Date.now().toString(),
      text: reminderText,
      date: selectedDate,
      note: reminderNotes,
    };
    setReminders((prevReminders) => [...prevReminders, newReminder]);
    setReminderText("");
    setSelectedDate("");
    setNotes("");
  };

  const handleDeleteReminder = (id) => {
    setReminders((prevReminders) =>
      prevReminders.filter((reminder) => reminder.id !== id)
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Reminders</Text>
      <Text style={styles.subtitle}>Don't forget: You've got this!</Text>
      <View style={styles.horizontalRule} />
      <View style={styles.reminderForm}>
        <Text style={styles.label}>Create a new reminder:</Text>
        <View style={styles.horizontalRule} />
        <TextInput
          style={styles.input}
          value={reminderText}
          onChangeText={setReminderText}
          placeholder="Add a new reminder..."
        />
        <TextInput
          style={[styles.input]}
          value={selectedDate}
          onChangeText={setSelectedDate}
          placeholder="Enter deadline..."
        />
        <TextInput
          style={[styles.input, { marginBottom: 10 }]}
          value={reminderNotes}
          onChangeText={setNotes}
          placeholder="Add notes..."
        />
        <TouchableOpacity
          style={[styles.createButton, { backgroundColor: "#55a7f0" }]}
          onPress={handleCreateReminder}
        >
          <Text style={styles.buttonText}>Create reminder</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.header}>Upcoming</Text>
      <View style={styles.horizontalRule} />
      <FlatList
        data={reminders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.reminderItem}>
            <View style={styles.reminderInfo}>
              <Text style={styles.reminderHeader}>{item.text}</Text>
              <Text style={styles.reminderDetails}>Due: {item.date}</Text>
              <Text style={styles.reminderDetails}>Note: {item.note}</Text>
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteReminder(item.id)}
            >
              <Text style={styles.deleteButtonText}>X</Text>
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
    marginBottom: 10,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 5,
    backgroundColor: "#fff",
    paddingBottom: 5,
    fontSize: 14,
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
  createButton: {
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  reminderForm: {
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 5,
    backgroundColor: "#ffffff",
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  reminderInfo: {
    flex: 2,
    flexDirection: "column",
    marginVertical: 10,
  },
  reminderItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 5,
    backgroundColor: "#ffffff",
    paddingLeft: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  reminderHeader: {
    fontSize: 18,
    fontWeight: "500",
    paddingLeft: 10,
  },
  reminderDetails: {
    fontSize: 14,
    paddingLeft: 10,
  },
  deleteButton: {
    backgroundColor: "#B90E0A",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: "center",
    marginRight: 20,
    marginVertical: 20,
  },
  deleteButtonText: {
    color: "white",
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    paddingBottom: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    paddingTop: 20,
    paddingBottom: 10,
  },
  horizontalRule: {
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    marginBottom: 15,
  },
});

export default ReminderScreen;
