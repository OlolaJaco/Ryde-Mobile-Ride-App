import { Tabs } from "expo-router";
import { icons } from "@/constants";
import { Image } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarShowLabel: false }}>
      <Tabs.Screen 
        name="home" 
        options={{
          title: "Home",
          tabBarIcon: ({ color }:any) => <Image source={icons.home} style={{ width: 24, height: 24, tintColor: color }} />
        }}
      />
      <Tabs.Screen 
        name="rides" 
        options={{
          title: "Rides",
          tabBarIcon: ({ color }:any) => <Image source={icons.list} style={{ width: 24, height: 24, tintColor: color }} />
        }}
      />
      <Tabs.Screen 
        name="chat" 
        options={{
          title: "Chat",
          tabBarIcon: ({ color }:any) => <Image source={icons.chat} style={{ width: 24, height: 24, tintColor: color }} />
        }}
      />
      <Tabs.Screen 
        name="profile" 
        options={{
          title: "Profile",
          tabBarIcon: ({ color }:any) => <Image source={icons.profile} style={{ width: 24, height: 24, tintColor: color }} />
        }}
      />
    </Tabs>
  );
}