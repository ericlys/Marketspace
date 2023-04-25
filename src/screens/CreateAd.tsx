import { Header } from "@components/Header";
import { Input } from "@components/Input";
import { TextArea } from "@components/TextArea";
import { HStack, IconButton, ScrollView, Text, VStack, useTheme } from "native-base";
import sizes from "native-base/lib/typescript/theme/base/sizes";
import { Plus } from "phosphor-react-native";

export function CreateAd() {
  const theme = useTheme()

  return (
    <ScrollView 
      bg="gray.200" 
      showsVerticalScrollIndicator={false}
    >
      <Header 
        bg="gray.200"
        onBack={() => {}}
        title="Criar anúncio"
      />

      <VStack p={6}>
        <Text
          fontFamily="heading"
          fontSize="md"
          color="gray.600"
        >
          Imagens
        </Text>
        <Text 
          fontFamily="body"
          fontSize="sm"
          color="gray.500"
        >
          Escolha até 3 imagens para mostrar o quando o seu produto é incrível!
        </Text>

        <HStack mt={4}>
          <IconButton
            icon={
              <Plus color={theme.colors.gray[400]} size={24}/>
            }
            bg="gray.300"
            p={38}
            borderRadius={6}
          />
        </HStack>

        <Text
          fontFamily="heading"
          fontSize="md"
          color="gray.600"
          mt={8}
        >
          Sobre o produto
        </Text>

        <Input placeholder="Título do anúncio" mt={4}/>

        <TextArea placeholder="Descrição do produto" h={160}/>



      </VStack>
    </ScrollView>
  )
}