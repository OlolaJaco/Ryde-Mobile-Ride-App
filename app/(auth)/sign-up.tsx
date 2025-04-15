import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { useSignUp } from '@clerk/clerk-expo'
import { Link } from "expo-router";
import { useState } from "react";
import { Image, SafeAreaView, Text, View } from "react-native";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [verification, setVerification] = useState({
    state: 'success', //*i added success here manually to test the modal result, although i have noot implemented the modal yet
    error: '',
    code: ''
  })


  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      })

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setVerification({
        ...verification,
        state: 'pending',
        error: ''
      })
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      })

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        // Todo: Create a database User!

        await setActive({ session: signUpAttempt.createdSessionId })
        setVerification({ ...verification, state: "success"})
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        setVerification({
          ...verification,
          error: "Verification failed.",
          state: "failed",
        })
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      setVerification({
        ...verification,
        error: err.errors[0].longMessage,
        state: "failed",
      })
      console.error(JSON.stringify(err, null, 2))
    }
  }

  // if (pendingVerification) {
  //   return (
  //     <>
  //       <Text>Verify your email</Text>
  //       <TextInput
  //         value={code}
  //         placeholder="Enter your verification code"
  //         onChangeText={(code)=> setCode(code)}
  //       />
  //       <TouchableOpacity onPress={onVerifyPress}>
  //         <Text>Verify</Text>
  //       </TouchableOpacity>
  //     </>
  //   )
  
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">Create Your Account</Text>
        </View>

        <View className="p-5">
          <InputField label="Name" placeholder="Enter your name" icon={icons.person} value={form.name} onChangeText={(value) => setForm({ ...form, name:value})} />

          <InputField label="Email" placeholder="Enter Your email" icon={icons.email} value={form.email} onChangeText={(value) => setForm({ ...form, name:value})} />

          <InputField label="Password" placeholder="Enter your password" icon={icons.lock} secureTextEntry={true} value={form.password} onChangeText={(value) => setForm({ ...form, password:value})} />

          <CustomButton title="Sign Up" onPress={onSignUpPress} className="mt-6" />

          {/* OAuth */}
          <OAuth />

          <Link href="/sign-in" className="text-lg text-center text-general-200 mt-10">
            <Text>Already have an account?</Text>
            <Text className="text-primary-500"> Log In</Text>
          </Link>
        </View>

        {/* Verification modal here */}
        if (verification.state === 'success') {
          <View>
            <Text>Verification successful!</Text>
          </View>
        }
      </View>
    </SafeAreaView>
  );
}

export default SignUp;