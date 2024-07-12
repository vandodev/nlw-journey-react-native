import { View, Text } from "react-native";

export function Details({ tripId }: { tripId: string }) {
 
  return (
    <View className="flex-1 mt-10">
        <Text className="text-white">{tripId}</Text>
    </View>
  )
}