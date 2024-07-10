import { useState } from "react"
import {View, Text, Image, Alert, Keyboard} from 'react-native'
import { Input } from "@/components/input"
import {
    MapPin,
    Calendar as IconCalendar,
    Settings2,
    UserRoundPlus,
    ArrowRight,
  } from "lucide-react-native"

  import dayjs from "dayjs"
  import { DateData } from "react-native-calendars"
  
import { DatesSelected, calendarUtils } from "@/utils/calendarUtils"

import { Button } from "@/components/button"
import { Calendar } from "@/components/calendar"

import { colors } from "@/styles/colors"
import { Modal } from "@/components/modal"

  enum StepForm {
    TRIP_DETAILS = 1,
    ADD_EMAIL = 2,
  }

  enum MODAL {
    NONE = 0,
    CALENDAR = 1,
  }

export default function index(){
    const [destination, setDestination] = useState("")
    const [stepForm, setStepForm] = useState(StepForm.TRIP_DETAILS)

    const [selectedDates, setSelectedDates] = useState({} as DatesSelected)

    // MODAL
    const [showModal, setShowModal] = useState(MODAL.NONE)

    function handleNextStepForm() {    
        
        if (
            destination.trim().length === 0 ||
            !selectedDates.startsAt ||
            !selectedDates.endsAt
          ) {
            return Alert.alert(
              "Detalhes da viagem",
              "Preencha todos as informações da viagem para seguir."
            )
          }
      
          if (destination.length < 4) {
            return Alert.alert(
              "Detalhes da viagem",
              "O destino deve ter pelo menos 4 caracteres."
            )
          }
        
        if (stepForm === StepForm.TRIP_DETAILS) {
          return setStepForm(StepForm.ADD_EMAIL)
        }    
    }

    function handleSelectDate(selectedDay: DateData) {
        const dates = calendarUtils.orderStartsAtAndEndsAt({
          startsAt: selectedDates.startsAt,
          endsAt: selectedDates.endsAt,
          selectedDay,
        })
    
        setSelectedDates(dates)
    }
    

    return(
        <View className="flex-1 items-center justify-center px-5">
            <Image
                source={require("@/assets/logo.png")}
                className="h-8"
                resizeMode="contain"
            />
            <Image source={require("@/assets/bg.png")} className="absolute" />
            <Text className="text-zinc-400 font-regular text-center text-lg mt-3">
                Convide seus amigos e planeje sua{"\n"}próxima viagem
            </Text>

            <View className="w-full bg-zinc-900 p-4 rounded-xl my-8 border border-zinc-800">
                <Input variant='tertiary'>
                    <MapPin color={colors.zinc[400]} size={20} />
                    <Input.Field 
                        onChangeText={setDestination}
                        value={destination}
                        placeholder='Para onde?'
                        editable={stepForm === StepForm.TRIP_DETAILS}                    
                    />
                </Input>

                <Input variant='tertiary'>
                    <IconCalendar color={colors.zinc[400]} size={20} />
                    <Input.Field
                        placeholder='Quando?'
                        editable={stepForm === StepForm.TRIP_DETAILS}
                        onFocus={() => Keyboard.dismiss()}
                        showSoftInputOnFocus={false}
                        onPressIn={() =>
                          stepForm === StepForm.TRIP_DETAILS && setShowModal(MODAL.CALENDAR)
                        }
                        value={selectedDates.formatDatesInText}
                     />
                </Input>

                {stepForm === StepForm.ADD_EMAIL && (
                    <>
                        <View className="border-b py-3 border-zinc-800">
                            <Button
                                variant='secondary'
                                onPress={() => setStepForm(StepForm.TRIP_DETAILS)}
                            >
                                <Button.Title>
                                    Alterar local/data
                                </Button.Title>
                                <Settings2 color={colors.zinc[200]} size={20} />
                            </Button>
                        </View>     

                        <Input variant='tertiary'>
                            <UserRoundPlus color={colors.zinc[400]} size={20} />
                            <Input.Field placeholder="Quem estará na viagem?"/>
                        </Input>

                    </>
                )}

                <Button onPress={handleNextStepForm}>
                    <Button.Title>
                        {stepForm === StepForm.TRIP_DETAILS
                            ? "Continuar"
                            : "Confirmar Viagem"
                        }
                    </Button.Title>
                    <ArrowRight color={colors.lime[950]} size={20} />
                </Button>

            </View>

            <Text className="text-zinc-500 font-regular text-center text-base">
                Ao planejar sua viagem pela plann.er você automaticamente concorda com
                nossos{" "}
                <Text className="text-zinc-300 underline">
                termos de uso e políticas de privacidade.
                </Text>
            </Text>

            <Modal
                title="Selecionar datas"
                subtitle="Selecione a data de ida e volta da viagem"
                visible={showModal === MODAL.CALENDAR}
                 onClose={() => setShowModal(MODAL.NONE)}
            >

            < View className="gap-4 mt-4">
                <Calendar
                    minDate={dayjs().toISOString()}
                    onDayPress={handleSelectDate}
                    markedDates={selectedDates.dates}
                />

                <Button onPress={() => setShowModal(MODAL.NONE)}>
                    <Button.Title>Confirmar</Button.Title>
                </Button>
                </View>

            </Modal>

        </View>
    )
}

