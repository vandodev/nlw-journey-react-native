import { Text, View } from "react-native";
import { TripData } from "./[id]"
import { Button } from "@/components/button"

import { Modal } from "@/components/modal"
import {
  PlusIcon,
  Tag,
} from "lucide-react-native"
import { colors } from "@/styles/colors"
import { useState } from "react";
import { Input } from "@/components/input";

type Props = {
    tripDetails: TripData
}

enum MODAL {
  NONE = 0,
  CALENDAR = 1,
  NEW_ACTIVITY = 2,
}

export function Activities({ tripDetails }: Props) {

    // MODAL
    const [showModal, setShowModal] = useState(MODAL.NONE)

    // DATA
    const [activityTitle, setActivityTitle] = useState("")
    const [activityDate, setActivityDate] = useState("")
    const [activityHour, setActivityHour] = useState("")
  
  return (
    <View className="flex-1">

      <View className="w-full flex-row mt-5 mb-6 items-center">
        <Text className="text-zinc-50 text-2xl font-semibold flex-1">
          Atividades
        </Text>

        <Button onPress={() => setShowModal(MODAL.NEW_ACTIVITY)}>
          <PlusIcon color={colors.lime[950]} />
          <Button.Title>Nova atividade</Button.Title>
        </Button>

      </View>

      <Modal
        visible={showModal === MODAL.NEW_ACTIVITY}
        title="Cadastrar atividade"
        subtitle="Todos os convidados podem visualizar as atividades"
        onClose={() => setShowModal(MODAL.NONE)}
      >
         <View className="mt-4 mb-3">
            <Input variant="secondary">
                <Tag color={colors.zinc[400]} size={20} />
                <Input.Field
                  placeholder="Qual atividade?"
                  onChangeText={setActivityTitle}
                  value={activityTitle}
                />
            </Input>
         </View>

      </Modal>

    </View>
  )
}