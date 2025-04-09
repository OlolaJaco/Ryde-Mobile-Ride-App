// I don't know what this file is for, but it is required by Expo.

import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function App() {
    return (
        <View className="flex-1 items-center justify-center bg-white">
            <StatusBar style="auto" />
            <Text className="text-xl font-bold text-blue-500">Are you there</Text>
        </View>
    )
}