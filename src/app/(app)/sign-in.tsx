import { useSignIn } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function SignInScreen() {
  const { isLoaded, signIn, setActive } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)

  const onSignInPress = async () => {
    if (!isLoaded) return
    setIsLoading(true)

    try {
      const attempt = await signIn.create({ identifier: emailAddress, password })

      if (attempt.status === 'complete') {
        await setActive({ session: attempt.createdSessionId })
        router.replace('/')
      } else {
        console.error(JSON.stringify(attempt, null, 2))
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="flex-1 px-6">
          {/* Header Section */}
          <View className="flex-1 justify-center">
            <View className="items-center mb-8">
              <View className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl items-center justify-center mb-4 shadow-lg">
                <Ionicons name="fitness" size={40} color="white" />
              </View>
              <Text className="text-3xl font-bold text-gray-900 mb-2">
                Fit Tracker
              </Text>
              <Text className="text-lg text-gray-600 text-center">
                Welcome back! Sign in to continue.
              </Text>
            </View>

            {/* Sign in form */}
            <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
              <Text className="text-lg font-medium text-gray-900 mb-4 text-center">
                Sign in to your account
              </Text>

              {/* Email input */}
              <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Email
                </Text>
                <View className="flex-row items-center border bg-gray-50 rounded-xl px-4 py-4 border-gray-200">
                  <Ionicons name="mail-outline" size={20} color="#6b7280" />
                  <TextInput
                    value={emailAddress}
                    placeholder="Enter email"
                    placeholderTextColor="#9CA3AF"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    onChangeText={setEmailAddress}
                    editable={!isLoading}
                    className="flex-1 ml-2 text-gray-900"
                  />
                </View>
              </View>

              {/* Password input */}
              <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Password
                </Text>
                <View className="flex-row items-center border bg-gray-50 rounded-xl px-4 py-4 border-gray-200">
                  <Ionicons name="lock-closed-outline" size={20} color="#6b7280" />
                  <TextInput
                    value={password}
                    placeholder="Enter password"
                    placeholderTextColor="#9CA3AF"
                    secureTextEntry={true}
                    onChangeText={setPassword}
                    editable={!isLoading}
                    className="flex-1 ml-2 text-gray-900"
                  />
                </View>
              </View>
            </View>

            {/* Sign in button */}
            <TouchableOpacity
              onPress={onSignInPress}
              disabled={isLoading}
              className={`rounded-xl py-4 shadow-sm mb-4 ${
                isLoading ? 'bg-gray-400' : 'bg-blue-600'
              }`}
              activeOpacity={0.8}
            >
              <View className="flex-row items-center justify-center">
                {isLoading ? (
                  <Ionicons name="refresh" size={20} color="white" />
                ) : (
                  <Ionicons name="log-in-outline" size={20} color="white" />
                )}
                <Text className="text-white font-semibold text-lg ml-2">
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Text>
              </View>
            </TouchableOpacity>

            {/* Sign up link */}
            <View className="flex-row justify-center items-center mt-4">
              <Text>Don’t have an account? </Text>
              <Pressable
                onPress={() => router.push('/sign-up')}
                accessibilityRole="link"
              >
                {({  pressed }) => (
                  <Text
                    className="font-semibold"
                    style={{
                      color: pressed ? '#2563EB' : '#4B5563',
                    }}
                  >
                    Sign Up
                  </Text>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
