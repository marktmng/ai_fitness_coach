import { useSignIn } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import { Link, useRouter } from 'expo-router'
import React from 'react'
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import GoogleSignIn from '../components/GoogleSigIn'

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const [isLoading, setIsLoading] = React.useState(false)
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <SafeAreaView className='flex-1'>
        <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        className='flex-1'>
      <View className='flex-1 px-6'>
      {/* Header Section */}
      <View className='flex-1 justify-center'>
        {/* logo / branding */}
        <View className='items-center mb-8'>
          <View className='w-20 h-20 bg-gradient-t0-br from-blue-600 
          to-purple-600 rounded-2xl justify-center mb-4 shadow-lg'>
            <Ionicons name="fitness" size={40} color="white" />
          </View>
          <Text className='text-3xl font-bold text-gray-900 mb-2'>
          Fit Tracker</Text>
          <Text className='text-lg text-gray-600 text-center'>Track your fitness journey
          </Text>
        </View>
      

      {/* Sign in form */}

      <View className='bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6'>
        <Text className='text-lg font-medium text-gray-900 mb-4 text-center'>Welcome back</Text>

        {/* Email input */}
        <View className='mb-4'>
          <Text className='text-sm font-medium text-gray-700 mb-2'>Email</Text>
          <View className='flex-row items-center border bg-gray-50 rounded-xl px-4 py-4 border-gray-200'>
            <Ionicons name='mail-outline' size={20} color='#6b7280'/>
            <TextInput
              value={emailAddress}
              placeholder="Enter email"
              placeholderTextColor="#9CA3AF"
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={setEmailAddress}
              editable={!isLoading}
              style={{
                borderColor: '#ccc',
                padding: 5,
                marginVertical: 8,
                borderRadius: 8,
                color: 'black',
              }}
            />
          </View>
        </View>

        {/* password input */}
        <View className='mb-4'>
          <Text className='text-sm font-medium text-gray-700 mb-2'>Password</Text>
          <View className='flex-row items-center border bg-gray-50 rounded-xl px-4 py-4 border-gray-200'>
            <Ionicons name='lock-closed-outline' size={20} color='#6b7280'/>
            <TextInput
              value={password}
              placeholder="Enter password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={true}
              onChangeText={setPassword}
              style={{
                  borderColor: '#ccc',
                  padding: 5,
                  marginVertical: 8,
                  borderRadius: 8,
                  color: 'black',
              }}
              />
          </View>
        </View>
      </View>
          {/* sign in button */}
      <TouchableOpacity 
      onPress={onSignInPress}
      disabled={isLoading}
      className={`rounded-xl py-4 shadow-sm mb-4 ${
        isLoading ? 'bg-gray-400' : 'bg-blue-600'
      }`}
        activeOpacity={0.8}
        >
          <View className='flex-row items-center justify-center'>
        {isLoading ? (
          <Ionicons name="refresh" size={20} color="white" />
        ) : (
          <Ionicons name="log-in-outline" size={20} color="white" />
        )}
        <Text className='text-white font-semibold text-lg ml-2' >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Text>
          </View>
      </TouchableOpacity>

      {/* divider */}
      <View className='flex-row items-center mb-4'>
        <View className='flex-1 h-px bg-gray-300'/>
        <Text className='px-2 text-gray-400'>OR</Text>
        <View className='flex-1 h-px bg-gray-300'/>
      </View>

      {/* sign in with google */}
      <GoogleSignIn />
      {/* sign up link */}
      <View className='flex-row justify-center items-center mt-4'>
        <Text>Don't have an account? </Text>
        <Link href="/sign-up" asChild>
          <TouchableOpacity>
          <Text className='text-blue-600 font-semibold'>Sign Up</Text>
          </TouchableOpacity>
          </Link>
      </View>
      </View>

      

      {/* footer */}
      <View className='pb-4'>
        <Text className='text-center text-gray-500 text-sm'>
          Start your fitness journey today!
        </Text>
      </View>
      </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}