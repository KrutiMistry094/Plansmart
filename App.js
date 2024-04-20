import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ThemeProvider } from "./screens/theme.js";
import HomeScreen from "./screens/HomeScreen";
import CalendarScreen from "./screens/CalendarScreen";
import ReminderScreen from "./screens/ReminderScreen.js";
import SettingScreen from "./screens/SettingsScreen.js";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarLabelPosition: "below-icon",
            tabBarShowLabel: false,
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarLabel: "",
              tabBarIcon: () => <FontAwesome name="home" size={22} />,
            }}
          />
          <Tab.Screen
            name="Calendar"
            component={CalendarScreen}
            options={{
              tabBarLabel: "",
              tabBarIcon: () => (
                <FontAwesome6 name="calendar-check" size={22} />
              ),
            }}
          />
          <Tab.Screen
            name="Reminder"
            component={ReminderScreen}
            options={{
              tabBarLabel: "",
              tabBarIcon: () => <FontAwesome name="bell" size={22} />,
            }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingScreen}
            options={{
              tabBarLabel: "",
              tabBarIcon: () => <Ionicons name="settings-sharp" size={22} />,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
