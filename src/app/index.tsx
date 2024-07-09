import {View, Text, Image} from 'react-native'
import { Input } from "@/components/input"
export default function index(){
    return(
        <View className='flex-1 items-center justify-center'>
            <Image
                source={require("@/assets/logo.png")}
                className="h-8"
                resizeMode="contain"
            />
            <Image source={require("@/assets/bg.png")} className="absolute" />
            <Text className="text-zinc-400 font-regular text-center text-lg mt-3">
                Convide seus amigos e planeje sua{"\n"}próxima viagem
            </Text>

            <View>
                <Input>
                    <Input.Field/>
                </Input>
            </View>
        </View>
    )
}

