import { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { Box, HStack, IconButton, Image, ScrollView, Text, VStack, useTheme, useToast } from "native-base"
import { Plus, XCircle } from "phosphor-react-native"

import { Button } from "@components/Button"
import { Checkbox, Group } from "@components/CheckBox"
import { Header } from "@components/Header"
import { Input } from "@components/Input"
import { Radio } from "@components/Radio"
import { Switch } from "@components/Switch"
import { TextArea } from "@components/TextArea"

import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, useForm } from "react-hook-form"
import { formatCurrency } from "@utils/formmaters"
import * as ImagePicker from "expo-image-picker"
import * as FileSystem from 'expo-file-system'

type FormDataProps = {
  name: string
  description: string
  is_new: string
  price: string
  accept_trade: boolean
  payment_methods: string[]
}

const createAdSchema = yup.object({
  name: yup.string().required('Informe o nome.'),
  description: yup.string().required('Informe a descrição.'),
  is_new: yup.string().required('Informe o estado do produto.'),
  price: yup.string()
  .test(
    "price-test",
    "O valor é inválido", 
    (value) => value ? value[0] !== ',' : false
  )
  .required('Informe o preço'),
  accept_trade: yup.boolean().required('Informe se aceita troca.'),
  payment_methods: yup.array().min(1, "Selecione pelo menos um método de pagamento").of(
    yup.string().oneOf(['deposit', 'pix', 'cash', 'boleto', 'card'], "Método de pagamento inválido.")
  )
})

export function CreateAd() {
  const theme = useTheme()
  const toast = useToast()
  const navigation = useNavigation()

  const [productImages, setProductImages] = useState<string[]>([])

  function handleGoBack() {
    navigation.goBack()
  }

  const tradeMethods = [
    {label: 'Boleto', value: 'boleto'},
    {label: 'Pix', value: 'pix'},
    {label: 'Dinheiro', value: 'cash'},
    {label: 'Cartão de Crédito', value: 'card'},
    {label: 'Depósito Bancário', value: 'deposit'}
  ]

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(createAdSchema),
    defaultValues: {
      is_new: 'new',
      accept_trade: false,
      payment_methods: []
    }
  })

  async function handleProductIMages(){
    // setPhotoIsLoading(true)

    try {
      const selectedImages = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        allowsMultipleSelection: productImages.length < 2,
        selectionLimit: 3 - productImages.length,
        aspect: [4,4],
        base64: false
      })
      
      if(selectedImages.canceled) {
        return
      }

      const uris = await Promise.all(selectedImages.assets.map( 
        async photo => {
        const photoInfo = await FileSystem.getInfoAsync(photo.uri)

        if(photoInfo.exists && (photoInfo.size / 1024 / 1024) > 5){
          return toast.show({
            title: "Imagem muito grande. Escolha uma de até 5MB.",
            placement: 'top',
            bgColor: 'red.500'
          })     
         
        } else {
          return photo.uri
        }
      }))

      const photosAccepted = uris.slice(0,3 - productImages.length)

      setProductImages([...productImages, ...photosAccepted])
      
    } catch (error) {
      console.log(error)
    } finally {
      // setPhotoIsLoading(false)
    }
  }

  function handleRemoveProductImage(index: number) {
    const newListOfImages = [...productImages]
    newListOfImages.splice(index, 1)
    setProductImages(newListOfImages)
  }

  function handleCreateAd(data: FormDataProps){
    console.log(data)
  }


  return (
    <VStack flex={1}>
      <Header 
        bg="gray.200"
        onBack={handleGoBack}
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

        <HStack mt={4} space={2}>

          { productImages.map( (productImage, index) => (
            <Box>
              <Image 
                key={index.toString()}
                w={100}
                h={100}
                rounded="md"
                source={{ 
                  uri: productImage
                }}
                alt=""
              />

              <IconButton
                onPress={() => handleRemoveProductImage(index)}
                icon={
                  <XCircle color={theme.colors.gray[700]} weight="fill" size={16}/>
                }
                bg="gray.100"
                position="absolute"
                size={3}
                rounded="full"
                top="1"
                right="1"
              />
            </Box>

          ))}

          { productImages.length < 3 && (
            <IconButton
              onPress={handleProductIMages}
              icon={
                <Plus color={theme.colors.gray[400]} size={24}/>
              }
              bg="gray.300"
              p={38}
              borderRadius={6}
            />
          )}
        </HStack>

        <Text
          fontFamily="heading"
          fontSize="md"
          color="gray.600"
          mt={8}
        >
          Sobre o produto
        </Text>

      <Controller
        control={control}
        name="name"
        render={({ field: {onChange, value} }) => (
          <Input 
            placeholder="Título do anúncio" 
            mt={4}
            errorMessage={errors.name?.message}
            onChangeText={onChange}
            value={value}
          />
        )}
      />        

      <Controller
        control={control}
        name="description"
        render={({ field: {onChange, value} }) => (
          <TextArea 
            placeholder="Descrição do produto" 
            h={160}
            errorMessage={errors.description?.message}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Controller
        control={control}
        name="is_new"
        render={({ field: {onChange, value} }) => (
          <Radio 
            name="Estado do produto" 
            flexDir="row"
            value={value}
            onChange={onChange}
            options={[{label: "Produto novo", value: "new"}, {label: "Produto usado", value: "used"}]}
          />
      )}
      />

      <Text
        fontFamily="heading"
        fontSize="md"
        color="gray.600"
        mt={8}
      >
        Venda
      </Text>

      <Controller
        control={control}
        name="price"
        render={({ field: {onChange, value} }) => (
          <Input
            prefix={"R$"}
            placeholder="Valor do produto"
            mt={4}
            value={value}
            onChangeText={text => onChange(formatCurrency(text))}
            errorMessage={errors.price?.message}
            keyboardType="number-pad"
          />
        )}
        />

        <Text
          fontFamily="heading"
          fontSize="md"
          color="gray.600"
        >
          Aceita troca?
        </Text>
        
        <Controller
          control={control}
          name="accept_trade"
          render={({ field: {onChange, value} }) => (
          <Switch 
            mt={4}
            isChecked={value}
            value={value}
            onToggle={onChange}
          />
          )}
        />

        <Text
          fontFamily="heading"
          fontSize="md"
          color="gray.600"
          mt={4}
        >
          Meios de pagamento aceitos
        </Text>
        

        <Controller
          control={control}
          name="payment_methods"
          render={({ field: {onChange, value} }) => (
          <VStack mt="3">
            <Group 
              value={value} 
              onChange={onChange}
              accessibilityLabel="pick an item"
              errorMessage={errors.payment_methods?.message}
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
        )}
        />

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
        onPress={handleSubmit(handleCreateAd)}
      />
    </HStack>
    </VStack>
  )
}