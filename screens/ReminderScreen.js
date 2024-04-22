import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Platform,
} from "react-native";
import { useTheme } from "./theme";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import PushNotification from "react-native-push-notification";

const ReminderScreen = () => {
  const [reminderText, setReminderText] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [reminderNotes, setNotes] = useState("");
  const [reminders, setReminders] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const { theme } = useTheme(); // Accessing theme from the context

  const handleConfirmDate = (date) => {
    setSelectedDate(date.toISOString());
    hideDatePicker();
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleCreateReminder = () => {
    if (reminderText.trim() === "" || selectedDate.trim() === "") {
      alert("Please enter a reminder text and select a date.");
      return;
    }
    const newReminder = {
      id: Date.now().toString(),
      text: reminderText,
      date: selectedDate,
      note: reminderNotes,
    };
    setReminders((prevReminders) => [...prevReminders, newReminder]);
    scheduleNotification(newReminder);
    setReminderText("");
    setSelectedDate("");
    setNotes("");
  };

  const scheduleNotification = (reminder) => {
    const fireDate = new Date(selectedDate).getTime();
    if (fireDate < Date.now()) {
      alert("Please select a future date for the reminder.");
      return;
    }
  };

  const handleDeleteReminder = (id) => {
    setReminders((prevReminders) =>
      prevReminders.filter((reminder) => reminder.id !== id)
    );
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme === "dark" ? "#333" : "#FFF" },
      ]}
    >
      <Text
        style={[
          styles.sectionTitle,
          { color: theme === "dark" ? "#FFF" : "#333" },
        ]}
      >
        Reminders
      </Text>
      <Text
        style={[styles.subtitle, { color: theme === "dark" ? "#FFF" : "#333" }]}
      >
        Don't forget: You've got this!
      </Text>
      <View
        style={[
          styles.horizontalRule,
          { borderBottomColor: theme === "dark" ? "#FFF" : "#000" },
        ]}
      />
      <View
        style={[
          styles.reminderForm,
          { backgroundColor: theme === "dark" ? "#444" : "#FFF" },
        ]}
      >
        <Text
          style={[styles.label, { color: theme === "dark" ? "#FFF" : "#333" }]}
        >
          Create a new reminder:
        </Text>
        <View
          style={[
            styles.horizontalRule,
            { borderBottomColor: theme === "dark" ? "#FFF" : "#000" },
          ]}
        />
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme === "dark" ? "#555" : "#EEE",
              color: theme === "dark" ? "#FFF" : "#333",
            },
          ]}
          value={reminderText}
          onChangeText={setReminderText}
          placeholder="Add a new reminder..."
        />
        <TouchableOpacity style={styles.input} onPress={showDatePicker}>
          <Text style={{ color: theme === "dark" ? "black" : "#333" }}>
            {selectedDate ? selectedDate : "Select deadline..."}
          </Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirmDate}
          onCancel={hideDatePicker}
        />
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme === "dark" ? "#555" : "#EEE",
              color: theme === "dark" ? "#FFF" : "#333",
            },
            { marginBottom: 10 },
          ]}
          value={reminderNotes}
          onChangeText={setNotes}
          placeholder="Add notes..."
        />
        <TouchableOpacity
          style={[styles.createButton, { backgroundColor: "#55a7f0" }]}
          onPress={handleCreateReminder}
        >
          <Text
            style={[
              styles.buttonText,
              { color: theme === "dark" ? "#FFF" : "#333" },
            ]}
          >
            Create reminder
          </Text>
        </TouchableOpacity>
      </View>
      <Text
        style={[styles.header, { color: theme === "dark" ? "#FFF" : "#333" }]}
      >
        Upcoming
      </Text>
      <View style={styles.horizontalRule} />
      <FlatList
        data={reminders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.reminderItem,
              { backgroundColor: theme === "dark" ? "#444" : "#FFF" },
            ]}
          >
            <View style={styles.reminderInfo}>
              <Text
                style={[
                  styles.reminderHeader,
                  { color: theme === "dark" ? "#FFF" : "#333" },
                ]}
              >
                {item.text}
              </Text>
              <Text
                style={[
                  styles.reminderDetails,
                  { color: theme === "dark" ? "#FFF" : "#333" },
                ]}
              >
                Due: {item.date}
              </Text>
              <Text
                style={[
                  styles.reminderDetails,
                  { color: theme === "dark" ? "#FFF" : "#333" },
                ]}
              >
                Note: {item.note}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteReminder(item.id)}
            >
              <Text
                style={[
                  styles.deleteButtonText,
                  { color: theme === "dark" ? "#FFF" : "#333" },
                ]}
              >
                X
              </Text>
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
    padding: 10,
    marginBottom: 10,
  },
  createButton: {
    backgroundColor: "#55a7f0",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
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
  reminderItem: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
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
  reminderHeader: {
    fontSize: 18,
    fontWeight: "500",
  },
  reminderDetails: {
    fontSize: 14,
  },
  deleteButton: {
    backgroundColor: "#B90E0A",
    padding: 10,
    borderRadius: 20,
    alignSelf: "center",
    marginLeft: 10,
  },
  deleteButtonText: {
    color: "white",
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
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
