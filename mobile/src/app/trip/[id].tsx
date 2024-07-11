import { useEffect, useState } from "react"
import {  View } from "react-native"
import { router, useLocalSearchParams } from "expo-router"
import { TripDetails, tripServer } from "@/server/trip-server"
import { Loading } from "@/components/loading"

export type TripData = TripDetails & { when: string }

export default function Trip() {
  // const tripId = useLocalSearchParams()
  // const tripId = useLocalSearchParams().id
  // const tripId = useLocalSearchParams<{id: string}>().id
  // console.log(tripId)

  const tripId = useLocalSearchParams<{id: string}>().id
  
  // LOADING
  const [isLoadingTrip, setIsLoadingTrip] = useState(true)

  // DATA
  const [tripDetails, setTripDetails] = useState({} as TripData)

  async function getTripDetails() {
    try {
      setIsLoadingTrip(true)
        
      if(!tripId){
        return router.back()
      } 
        
      const trip = await tripServer.getById(tripId)
      console.log(trip)
        
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
      
    </View>
  )
}