import { ReactNode } from "react"
import {
  TextInput,
  View,
} from "react-native"

type InputProps = {
    children: ReactNode
  }

function Input({children}: InputProps) {
  return (
    <View>{children}</View>
  )
}

function Field() {
  return (
    <TextInput/>
  )
}

Input.Field = Field

export { Input }