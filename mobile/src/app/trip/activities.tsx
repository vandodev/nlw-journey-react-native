import { Keyboard, Text, View, Alert } from "react-native";
import { TripData } from "./[id]"
import { Button } from "@/components/button"

import { Modal } from "@/components/modal"
import {
  PlusIcon,
  Tag,
  Clock,
  Calendar as IconCalendar,
} from "lucide-react-native"
import { colors } from "@/styles/colors"
import { useState } from "react";
import { Input } from "@/components/input";
import dayjs from "dayjs"

import { Calendar } from "@/components/calendar"
import { activitiesServer } from "@/server/activities-server";

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

    // LOADING
  const [isCreatingActivity, setIsCreatingActivity] = useState(false)
  const [isLoadingActivities, setIsLoadingActivities] = useState(true)

  function resetNewActivityFields() {
    setActivityDate("")
    setActivityTitle("")
    setActivityHour("")
    setShowModal(MODAL.NONE)
  }

  async function handleCreateTripActivity() {
    try {
      if (!activityTitle || !activityDate || !activityHour) {
        return Alert.alert("Cadastrar atividade", "Preencha todos os campos!")
      }
  
      setIsCreatingActivity(true)
  
      await activitiesServer.create({
        tripId: tripDetails.id,
        occurs_at: dayjs(activityDate)
          .add(Number(activityHour), "h")
          .toString(),
        title: activityTitle,
      })
  
      Alert.alert("Nova Atividade", "Nova atividade cadastrada com sucesso!")
      resetNewActivityFields()
       
    } catch (error) {
      console.log(error)
    } finally {
      setIsCreatingActivity(false)
    }
  }
  
  
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

            <View className="w-full mt-2 flex-row gap-2">
              <Input variant="secondary" className="flex-1">
                <IconCalendar color={colors.zinc[400]} size={20} />
                <Input.Field
                  placeholder="Data"
                  onChangeText={setActivityTitle}
                  value={
                    activityDate ? dayjs(activityDate).format("DD [de] MMMM") : ""
                  }
                  onFocus={() => Keyboard.dismiss()}
                  showSoftInputOnFocus={false}
                  onPressIn={() => setShowModal(MODAL.CALENDAR)}
                />
              </Input>

              <Input variant="secondary" className="flex-1">
                <Clock color={colors.zinc[400]} size={20} />
                <Input.Field
                  placeholder="Horário?"
                  onChangeText={(text) =>
                    setActivityHour(text.replace(".", "").replace(",", ""))
                  }
                  value={activityHour}
                  keyboardType="numeric"
                  maxLength={2}
                />
              </Input>
            </View>

            <Button
              onPress={handleCreateTripActivity}
              isLoading={isCreatingActivity}
            >
              <Button.Title>Salvar atividade</Button.Title>
            </Button>

         </View>

      </Modal>

      <Modal
        title="Selecionar data"
        subtitle="Selecione a data da atividade"
        visible={showModal === MODAL.CALENDAR}
        onClose={() => setShowModal(MODAL.NONE)}
      >
        <View className="gap-4 mt-4">
          <Calendar
            onDayPress={(day) => setActivityDate(day.dateString)}
            markedDates={{ [activityDate]: { selected: true } }}
            initialDate={tripDetails.starts_at.toString()}
            minDate={tripDetails.starts_at.toString()}
            maxDate={tripDetails.ends_at.toString()}
          />

          <Button onPress={() => setShowModal(MODAL.NEW_ACTIVITY)}>
            <Button.Title>Confirmar</Button.Title>
          </Button>
        </View>
      </Modal>

    </View>
  )
}