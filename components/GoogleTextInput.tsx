import { GoogleInputProps } from "@/types/types";
import { Text, View } from "react-native";

const GoogleTextInput = ({ icon, initialLocation, containerStyle, textInputBackgroundColor, handlePress}: GoogleInputProps) => (
    <View className={`flex flex-row items-center justify-center relative z-50 rounded-xl ${containerStyle}`}>
        <Text></Text>
    </View>
)

export default GoogleTextInput;