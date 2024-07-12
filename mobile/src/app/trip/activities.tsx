import { Text, View } from "react-native";
import { TripData } from "./[id]"
import { Button } from "@/components/button"
import {
  PlusIcon,
} from "lucide-react-native"
import { colors } from "@/styles/colors"

type Props = {
    tripDetails: TripData
}

export function Activities({ tripDetails }: Props) {
  
  return (
    <View className="flex-1">

      <View className="w-full flex-row mt-5 mb-6 items-center">
        <Text className="text-zinc-50 text-2xl font-semibold flex-1">
          Atividades
        </Text>

        <Button>
          <PlusIcon color={colors.lime[950]} />
          <Button.Title>Nova atividade</Button.Title>
        </Button>
      </View>
    </View>
  )
}