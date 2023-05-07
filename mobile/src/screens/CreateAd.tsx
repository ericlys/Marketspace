import { useEffect, useState } from "react"
import { useNavigation, useRoute } from "@react-navigation/native"
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
import { formatCurrency } from "@utils/formatters"
import * as ImagePicker from "expo-image-picker"
import * as FileSystem from 'expo-file-system'
import { AppNavigatorRoutesProps } from "@routes/app.routes"
import { SafeAreaView } from "react-native-safe-area-context"
import { ProductDTO } from "@dtos/ProductDTO"
import { api } from "@services/api"

type RouteParamsProps = {
  productEditable?: ProductDTO
}

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
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const route = useRoute()
  const params = route.params as RouteParamsProps
  const product = params?.productEditable

  const [productImages, setProductImages] = useState<{path: string, id?: string}[]>([])
  const [imagesUploadedRemoved, setImagesUploadedRemoved] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (product && productImages.length === 0) {
      const formattedImagesPaths = product.product_images.map( image => 
      image.path.includes("file:") ?
      image : { path: `${api.getUri()}/images/${image.path}`, id: image.id }
      )

      setProductImages(formattedImagesPaths)
    }
  }, [product])

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
      name: product?.name ?? '',
      description: product?.description ?? '',
      is_new: product?.is_new ? 'new' : 'used',
      price: product ? formatCurrency(product?.price.toString()) : '',
      accept_trade: product?.accept_trade ?? false,
      payment_methods: product?.payment_methods ?? [],
    }
  })

  async function handleProductIMages(){

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

      const photosPathFormatted = photosAccepted.map( photo => {
        return{path: photo}}
      )

      setProductImages([...productImages, ...photosPathFormatted])
      
    } catch (error) {
      console.log(error)
    }
  }

  function handleRemoveProductImage(index: number) {
    const newListOfImages = [...productImages]
    
    if(newListOfImages[index]?.id){
      setImagesUploadedRemoved([...imagesUploadedRemoved, newListOfImages[index].id!])
    }

    newListOfImages.splice(index, 1)
    setProductImages(newListOfImages)
  }

  function handleCreateAd( data: FormDataProps){
    setIsLoading(true)

    if(productImages.length < 1) {
      setIsLoading(false)
     
      return toast.show({
        title: "É necessário inserir imagem no anúncio.",
        placement: 'top',
        bgColor: 'red.500'
      })     
    }

    const dataFormatted = {
      id: product?.id,
      name: data.name,
      description: data.description,
      is_new: data.is_new === 'new',
      price: parseInt(data.price.replace(".", "").replace(",", ""), 10),
      accept_trade: data.accept_trade,
      payment_methods: data.payment_methods as Array<'boleto' | 'pix' | 'cash' | 'card' | 'deposit'>,
      product_images: productImages,
      is_active: true
    }


    navigation.navigate("adPreview", { product: dataFormatted, removedImages: imagesUploadedRemoved  })

    setIsLoading(false)
  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.gray[200] }} >
      <Header 
        pt={4}
        bg="gray.200"
        onBack={handleGoBack}
        title={product ? "Editar anúncio" : "Criar anúncio"}
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
            <Box key={index.toString()}>
              <Image 
                w={100}
                h={100}
                rounded="md"
                source={{ 
                  uri: productImage.path
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
        onPress={handleGoBack}
      />

      <Button
        flex={1}
        title="Avançar"
        variant="primary"
        isLoading={isLoading}
        onPress={handleSubmit(handleCreateAd)}
      />
    </HStack>
    </SafeAreaView>
  )
}