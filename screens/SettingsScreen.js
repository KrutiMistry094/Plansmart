import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        {/* Add account-related settings here */}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notification Settings</Text>
        {/* Add notification settings here */}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Theme</Text>
        {/* Add theme selection here */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0", // Background color
  },
  section: {
    backgroundColor: "#ffffff", // Section background color
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
});
