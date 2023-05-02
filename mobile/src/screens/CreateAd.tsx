import { Button } from "@components/Button";
import { Checkbox, Group } from "@components/CheckBox";
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
  const [checkGroup, setCheckGroup] = useState([])

  const tradeMethods = [
    {label: 'Boleto', value: 'bank_slip'},
    {label: 'Pix', value: 'pix'},
    {label: 'Dinheiro', value: 'cash'},
    {label: 'Cartão de Crédito', value: 'credit_card'},
    {label: 'Depósito Bancário', value: 'bank_deposit'}
  ]

  return (
    <VStack flex={1}>
      <Header 
        bg="gray.200"
        onBack={() => {}}
        title="Criar anúncio"
      />
    <ScrollView 
      bg="gray.200" 
      showsVerticalScrollIndicator={false}
    >


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
        
        <Switch 
          mt={4}
          isChecked={isExchangeable}
          value={isExchangeable}
          onToggle={() => setIsExchangeable(!isExchangeable)}
        />

        <Text
          fontFamily="heading"
          fontSize="md"
          color="gray.600"
          mt={4}
        >
          Meios de pagamento aceitos
        </Text>
        
        <VStack mt="3">
          <Group 
            defaultValue={checkGroup} 
            value={checkGroup} 
            onChange={(values) => {
              setCheckGroup(values || [])
            }}
            accessibilityLabel="pick an item"
          >
          { tradeMethods.map( method =>
              <Checkbox 
                key={method.value}
                label={method.label}
                value={method.value} 
                mb={2}
              />
          )}
          </Group>
        </VStack>

      </VStack>
    </ScrollView>

    <HStack 
      bg="gray.100" 
      py={25.5} px={6} 
      alignItems="center" 
      justifyContent="space-between"
      space={3}
    >
      <Button
        flex={1}
        title="Cancelar"
        variant="tertiary"
      />

      <Button
        flex={1}
        title="Avançar"
        variant="primary"
      />
    </HStack>
    </VStack>
  )
}