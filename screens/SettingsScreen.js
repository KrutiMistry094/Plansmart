import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useTheme } from "./theme";

export default function SettingsScreen() {
  const { theme, toggleTheme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme === "dark" ? "#333" : "#fff" },
      ]}
    >
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <TouchableOpacity style={styles.settingOption}>
          <Text style={styles.settingText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingOption}>
          <Text style={styles.settingText}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingOption}>
          <Text style={styles.settingText}>Privacy Settings</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notification Settings</Text>
        <TouchableOpacity style={styles.settingOption}>
          <Text style={styles.settingText}>Push Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingOption}>
          <Text style={styles.settingText}>Email Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingOption}>
          <Text style={styles.settingText}>Notification Sound</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Theme</Text>
        <TouchableOpacity style={styles.themeOption} onPress={toggleTheme}>
          <Text style={styles.themeText}>
            {theme === "dark"
              ? "Switch to Light Theme"
              : "Switch to Dark Theme"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  settingOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  settingText: {
    fontSize: 16,
    color: "#333",
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
});
