// NotificationSettings.js

import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

const NotificationSettings = ({ navigation }) => {
  const handlePushNotifications = () => {
    navigation.navigate("PushNotifications");
  };

  const handleEmailNotifications = () => {
    navigation.navigate("EmailNotifications");
  };

  const handleNotificationSound = () => {
    navigation.navigate("NotificationSound");
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.settingOption}
        onPress={handlePushNotifications}
      >
        <Text style={styles.settingText}>Push Notifications</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingOption}
        onPress={handleEmailNotifications}
      >
        <Text style={styles.settingText}>Email Notifications</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingOption}
        onPress={handleNotificationSound}
      >
        <Text style={styles.settingText}>Notification Sound</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  settingOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  settingText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});

export default NotificationSettings;
