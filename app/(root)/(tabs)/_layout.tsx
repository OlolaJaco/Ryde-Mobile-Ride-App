import { Tabs } from "expo-router";
import { icons } from "@/constants";
import { Image, StyleSheet } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ 
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
            backgroundColor: '#333333',
            borderRadius: 50,
            paddingTop: 10,
            overflow: "hidden",
            marginHorizontal: 20,
            marginBottom: 20,
            height: 70,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: "absolute"
        },
        }}
    >
      <Tabs.Screen 
        name="home" 
        options={{
          title: "Home",
          tabBarIcon: ({ color }:any) => (
            <Image source={icons.home} style={[styles.iconStyle, { tintColor: color }]} />
          )
        }}
      />
      <Tabs.Screen 
        name="rides" 
        options={{
          title: "Rides",
          tabBarIcon: ({ color }:any) => (
            <Image source={icons.list} style={[styles.iconStyle, { tintColor: color }]} />
          )
        }}
      />
      <Tabs.Screen 
        name="chat" 
        options={{
          title: "Chat",
          tabBarIcon: ({ color }:any) => (
            <Image source={icons.chat} style={[styles.iconStyle, { tintColor: color }]} />
          )
        }}
      />
      <Tabs.Screen 
        name="profile" 
        options={{
          title: "Profile",
          tabBarIcon: ({ color }:any) => (
            <Image source={icons.profile} style={[styles.iconStyle, { tintColor: color }]} />
          )
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconStyle: {
    width: 24,
    height: 24,
  }
});