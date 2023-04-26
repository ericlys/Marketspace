import { Header } from "@components/Header";
import { Input } from "@components/Input";
import { Radio } from "@components/Radio";
import { Switch } from "@components/Switch";
import { TextArea } from "@components/TextArea";
import { HStack, IconButton, ScrollView, Text, VStack, useTheme } from "native-base";
import { Plus } from "phosphor-react-native";
import { useState } from "react";

export function CreateAd() {
  const theme = useTheme()
  const [productState, setProductState] = useState('new')
  const [isExchangeable, setIsExchangeable] = useState(false)

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

        <Radio 
          name="Estado do produto" 
          flexDir="row"
          value={productState}
          onChange={setProductState}
          options={[{label: "Produto novo", value: "new"}, {label: "Produto usado", value: "used"}]}
        />

        <Text
          fontFamily="heading"
          fontSize="md"
          color="gray.600"
          mt={8}
        >
          Venda
        </Text>

        <Input
          prefix={"R$"}
          placeholder="Valor do produto"
          mt={4}
        />

        <Text
          fontFamily="heading"
          fontSize="md"
          color="gray.600"
        >
          Aceita troca?
        </Text>
        
        <Switch value={isExchangeable} onValueChange={setIsExchangeable}/>

      </VStack>
    </ScrollView>
  )
}