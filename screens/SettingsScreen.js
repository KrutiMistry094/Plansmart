import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  Switch,
} from "react-native";
import { useTheme } from "./theme";

export default function SettingsScreen() {
  const { theme, toggleTheme } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [accountSettings, setAccountSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    name: "John Doe",
    email: "johndoe@example.com",
  });
  const [tempName, setTempName] = useState(accountSettings.name);
  const [tempEmail, setTempEmail] = useState(accountSettings.email);
  const [dailyGoal, setDailyGoal] = useState(5); // Example: Initial daily study goal

  const toggleNotifications = () => {
    setNotificationsEnabled((prev) => !prev);
  };

  const toggleEmailNotifications = () => {
    setAccountSettings((prevSettings) => ({
      ...prevSettings,
      emailNotifications: !prevSettings.emailNotifications,
    }));
  };

  const togglePushNotifications = () => {
    setAccountSettings((prevSettings) => ({
      ...prevSettings,
      pushNotifications: !prevSettings.pushNotifications,
    }));
  };

  const handleNameChange = (name) => {
    setTempName(name);
  };

  const handleEmailChange = (email) => {
    setTempEmail(email);
  };

  const saveChanges = () => {
    // Validate name and email format
    if (!validateName(tempName)) {
      Alert.alert("Invalid Name", "Please enter a valid name.");
      return;
    }

    if (!validateEmail(tempEmail)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    setAccountSettings({
      ...accountSettings,
      name: tempName,
      email: tempEmail,
    });
    Alert.alert("Changes Saved", "Your account details have been updated.");
  };

  const validateName = (name) => {
    return /^[a-zA-Z\s]+$/.test(name);
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        theme === "dark" && styles.darkContainer,
      ]}
    >
      <View style={styles.content}>
        <View style={[styles.section, theme === "dark" && styles.darkSection]}>
          <Text
            style={[styles.sectionTitle, theme === "dark" && styles.darkText]}
          >
            Account
          </Text>
          <TextInput
            style={[styles.input, theme === "dark" && styles.darkInput]}
            value={tempName}
            onChangeText={handleNameChange}
            placeholder="Name"
            placeholderTextColor={theme === "dark" ? "#bbb" : "#888"}
          />
          <TextInput
            style={[styles.input, theme === "dark" && styles.darkInput]}
            value={tempEmail}
            onChangeText={handleEmailChange}
            placeholder="Email"
            keyboardType="email-address"
            placeholderTextColor={theme === "dark" ? "#bbb" : "#888"}
          />
        </View>
        <TouchableOpacity
          style={[styles.option, theme === "dark" && styles.darkOption]}
          onPress={() => {}}
        >
          <Text
            style={[styles.optionText, theme === "dark" && styles.darkText]}
          >
            Change Password
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.option, theme === "dark" && styles.darkOption]}
          onPress={() => {}}
        >
          <Text
            style={[styles.optionText, theme === "dark" && styles.darkText]}
          >
            Edit Profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.option, theme === "dark" && styles.darkOption]}
          onPress={() => {}}
        >
          <Text
            style={[styles.optionText, theme === "dark" && styles.darkText]}
          >
            Privacy Settings
          </Text>
        </TouchableOpacity>
        <View style={[styles.section, theme === "dark" && styles.darkSection]}>
          <Text
            style={[styles.sectionTitle, theme === "dark" && styles.darkText]}
          >
            Notification Settings
          </Text>
          <View style={styles.notificationSetting}>
            <Text style={[theme === "dark" && styles.darkText]}>
              Notifications
            </Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={toggleNotifications}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={notificationsEnabled ? "#f4f3f4" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
            />
          </View>
          <View style={styles.notificationSetting}>
            <Text style={[theme === "dark" && styles.darkText]}>
              Email Notifications
            </Text>
            <Switch
              value={accountSettings.emailNotifications}
              onValueChange={toggleEmailNotifications}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={
                accountSettings.emailNotifications ? "#f4f3f4" : "#f4f3f4"
              }
              ios_backgroundColor="#3e3e3e"
            />
          </View>
          <View style={styles.notificationSetting}>
            <Text style={[theme === "dark" && styles.darkText]}>
              Push Notifications
            </Text>
            <Switch
              value={accountSettings.pushNotifications}
              onValueChange={togglePushNotifications}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={
                accountSettings.pushNotifications ? "#f4f3f4" : "#f4f3f4"
              }
              ios_backgroundColor="#3e3e3e"
            />
          </View>
        </View>
        <View style={[styles.section, theme === "dark" && styles.darkSection]}>
          <Text
            style={[styles.sectionTitle, theme === "dark" && styles.darkText]}
          >
            Study Preferences
          </Text>
          <Text style={[theme === "dark" && styles.darkText]}>
            Daily Study Goal:
          </Text>
          <TextInput
            style={[styles.input, theme === "dark" && styles.darkInput]}
            value={String(dailyGoal)}
            onChangeText={(text) => setDailyGoal(parseInt(text))}
            keyboardType="numeric"
            placeholderTextColor={theme === "dark" ? "#bbb" : "#888"}
          />
        </View>
        <View style={[styles.section, theme === "dark" && styles.darkSection]}>
          <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.section, theme === "dark" && styles.darkSection]}>
          <Text
            style={[styles.sectionTitle, theme === "dark" && styles.darkText]}
          >
            Theme
          </Text>
          <TouchableOpacity style={styles.themeOption} onPress={toggleTheme}>
            <Text
              style={[styles.themeText, theme === "dark" && styles.darkText]}
            >
              {theme === "dark"
                ? "Switch to Light Theme"
                : "Switch to Dark Theme"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center", // Center content vertically
    padding: 20,
  },
  darkContainer: {
    backgroundColor: "#222", // Dark background color
  },
  content: {
    justifyContent: "center", // Center content horizontally
  },
  section: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  darkSection: {
    backgroundColor: "#333", // Dark background color
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333", // Default text color
  },
  darkText: {
    color: "#fff", // White text color in dark mode
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: "#333", // Default text color
  },
  darkInput: {
    color: "#fff", // White text color in dark mode
  },
  saveButton: {
    backgroundColor: "#55a7f0",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  themeOption: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
  },
  themeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  notificationSetting: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  option: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  darkOption: {
    backgroundColor: "#333", // Dark background color
  },
  optionText: {
    fontSize: 16,
    color: "#333", // Default text color
  },
});
