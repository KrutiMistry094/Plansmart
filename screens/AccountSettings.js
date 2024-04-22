// AccountSettings.js

import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const AccountSettings = ({ navigation }) => {
  const handleEditProfile = () => {
    navigation.navigate("EditProfile");
  };

  const handleChangePassword = () => {
    navigation.navigate("ChangePassword");
  };

  const handlePrivacySettings = () => {
    navigation.navigate("PrivacySettings");
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.settingOption}
        onPress={handleEditProfile}
      >
        <Text style={styles.settingText}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingOption}
        onPress={handleChangePassword}
      >
        <Text style={styles.settingText}>Change Password</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingOption}
        onPress={handlePrivacySettings}
      >
        <Text style={styles.settingText}>Privacy Settings</Text>
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

export default AccountSettings;
