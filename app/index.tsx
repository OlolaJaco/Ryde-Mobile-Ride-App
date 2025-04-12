import { Redirect } from "expo-router";
import { SafeAreaView, Text } from "react-native";

export default function HomeScreen() {
  return <Redirect href="/(auth)/welcome" />;
}
