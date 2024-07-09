import "@/styles/global.css"

import { View, StatusBar } from "react-native"
import { Slot } from "expo-router"


export default function Layout() {
  return (
    <View className="flex-1 bg-zinc-950">
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Slot />
    </View>
  )
}