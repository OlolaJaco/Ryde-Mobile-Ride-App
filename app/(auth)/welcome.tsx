import CustomButton from "@/components/CustomButton";
import { onboarding } from "@/constants";
import { router } from "expo-router";
import { useState } from "react";
import { Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";

const Onboarding = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboarding.length - 1;
  const isFirstSlide = activeIndex === 0;

  const currentSlide = onboarding[activeIndex];

  const nextSlide = () => {
    if (activeIndex < onboarding.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else {
      router.replace("/(auth)/sign-up");
    }
  };

  const prevSlide = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-white">
      <TouchableOpacity
        onPress={() => router.replace("/(auth)/sign-up")}
        className="w-full flex justify-end items-end p-5"
      >
        <Text className="text-black font-bold">Skip</Text>
      </TouchableOpacity>

      <View className="flex-1 w-full items-center justify-center p-5">
        <Image
          source={currentSlide.image}
          className="w-full h-[200px]"
          resizeMode="contain"
        />
        <View className="flex flex-row items-center justify-center w-full mt-10">
          <Text className="text-black text-3xl font-bold mx-10 text-center">
            {currentSlide.title}
          </Text>
        </View>
        <Text className="text-lg font-JakartaSemiBold text-center text-[#858585] mx-10 mt-3">
          {currentSlide.description}
        </Text>
      </View>

      {/* Pagination dots */}
      <View className="flex flex-row justify-center my-4">
        {onboarding.map((_, index) => (
          <View
            key={index}
            className={`w-[32px] h-[4px] mx-1 rounded-full ${index === activeIndex ? 'bg-[#6ca4ed]' : 'bg-[#E2E8F0]'}`}
          />
        ))}
      </View>

      <View className="w-11/12 flex flex-row justify-between mb-5 gap-3">
        {!isFirstSlide && (
          <CustomButton
            title="Back"
            bgVariant="outline"
            textVariant="primary"
            className="flex-1 py-4"
            onPress={prevSlide}
          />
        )}
        <CustomButton
          title={isLastSlide ? "Get Started" : "Next"}
          className={`py-4 ${!isFirstSlide ? 'flex-1' : 'w-full'}`}
          onPress={nextSlide}
        />
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;