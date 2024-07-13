import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Modal } from "@/components/modal";
import { colors } from "@/styles/colors";
import { Plus } from "lucide-react-native";
import { useState } from "react";
import { View, Text } from "react-native";

export function Details({ tripId }: { tripId: string }) {


    // MODAL
    const [showNewLinkModal, setShowNewLinkModal] = useState(false)

  
 
  return (
    <View className="flex-1 mt-10">
      <Text className="text-zinc-50 text-2xl font-semibold mb-2">
        Links importantes
      </Text>

      <View className="flex-1">
        <Button variant="secondary" onPress={() => setShowNewLinkModal(true)}>
            <Plus color={colors.zinc[200]} size={20} />
            <Button.Title>Cadastrar novo link</Button.Title>
        </Button>
      </View>

      <Modal
        title="Cadastrar link"
        subtitle="Todos os convidados podem visualizar os links importantes."
        visible={showNewLinkModal}
        onClose={() => setShowNewLinkModal(false)}
      >
        <View className="gap-2 mb-3">
          <Input variant="secondary">
            <Input.Field
              placeholder="Título do link"
            />
          </Input>

          <Input variant="secondary">
            <Input.Field placeholder="URL" />
          </Input>
        </View>

        <Button>
          <Button.Title>Salvar link</Button.Title>
        </Button>
      </Modal>
    </View>
  )
}