import { useEffect, useState } from "react"
import { TouchableOpacity, View } from "react-native"
import { router, useLocalSearchParams } from "expo-router"
import { TripDetails, tripServer } from "@/server/trip-server"
import { Loading } from "@/components/loading"
import { Input } from "@/components/input"

import {
  MapPin,
  Settings2,
} from "lucide-react-native"

import dayjs from "dayjs"
import { colors } from "@/styles/colors"


export type TripData = TripDetails & { when: string }

export default function Trip() {

  const tripId = useLocalSearchParams<{id: string}>().id
  
  // LOADING
  const [isLoadingTrip, setIsLoadingTrip] = useState(true)

  // DATA
  const [tripDetails, setTripDetails] = useState({} as TripData)
  const [destination, setDestination] = useState("")

  async function getTripDetails() {
    try {
      setIsLoadingTrip(true)
        
      if(!tripId){
        return router.back()
      } 
        
      const trip = await tripServer.getById(tripId)
      // console.log(trip)
      const maxLengthDestination = 14

      const destination =
      trip.destination.length > maxLengthDestination
        ? trip.destination.slice(0, maxLengthDestination) + "..."
        : trip.destination

      const starts_at = dayjs(trip.starts_at).format("DD")
      const ends_at = dayjs(trip.ends_at).format("DD")
      const month = dayjs(trip.starts_at).format("MMM")

      setTripDetails({
        ...trip,
        when: `${destination} de ${starts_at} a ${ends_at} de ${month}.`,
      })
        
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoadingTrip(false)
    }
  }

  useEffect(() => {
    getTripDetails()
  }, [])

  if (isLoadingTrip) {
  return <Loading />
  }

  return (
    <View className="flex-1 px-5 pt-16">
       <Input variant="tertiary">
        <MapPin color={colors.zinc[400]} size={20} />
        <Input.Field value={tripDetails.when} readOnly />

        <TouchableOpacity
          activeOpacity={0.6}
          className="w-9 h-9 bg-zinc-800 items-center justify-center rounded"
          // onPress={() => setShowModal(MODAL.UPDATE_TRIP)}
        >
          <Settings2 color={colors.zinc[400]} size={20} />
        </TouchableOpacity>
      </Input>
    </View>
  )
}