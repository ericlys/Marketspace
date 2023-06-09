import { Button } from "@components/Button"
import { Box, Center, HStack, Heading, Modal, Progress, Text, VStack, useTheme, useToast } from "native-base"
import { AdView } from "./components/AdView"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation, useRoute } from "@react-navigation/native"
import { ProductDTO } from "@dtos/ProductDTO"
import { useAuth } from "@hooks/useAuth"
import { useState } from "react"
import { api } from "@services/api"
import { AppError } from "@utils/AppError"
import { AppNavigatorRoutesProps } from "@routes/app.routes"

type RouteParamsProps = {
  product: ProductDTO,
  removedImages: string[]
}

export function AdPreview() {
  const {colors} = useTheme()
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const [isLoading, setIsLoading] = useState(false)
  const [uploadPercentage, setUploadPercentage] = useState(0)
  const toast = useToast()

  const route = useRoute()
  const { product, removedImages } = route.params as RouteParamsProps


  const { user } = useAuth()

  function handleGoBack() {
    navigation.goBack()
  }

  async function handlePublish() {
    setIsLoading(true)
    try {
      const response = await api.post('/products', product)

      const { id } = response.data

      const registerProductForm = new FormData()
      registerProductForm.append('product_id', id)

      product.product_images.map((image) => {
        const fileExtension = image.path.split('.').pop()

        const imageObject = {
          name: `${product.name}.${fileExtension}`.toLowerCase().replace(/\s/g,''),
          uri: image.path,
          type: `image/${fileExtension}`
        } as any

        registerProductForm.append('images', imageObject)
      })

            
      await api.post('/products/images', registerProductForm, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total!)
          setUploadPercentage(percentCompleted)
        },
      })

      setUploadPercentage(0)

      toast.show({
        title: 'Produto publicado com sucesso.',
        placement: 'top',
        bgColor: 'blue.500'
      })

      navigation.navigate("appTabRoutes")

    } catch (error) {    
      setUploadPercentage(0)

      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível criar o anúncio. Tente novamente mais tarde.'

      if(isAppError) {
        toast.show({
          title,
          placement: 'top',
          bgColor: 'red.500'
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  async function handleUpdate() {
    setIsLoading(true)

    try {
      await api.put(`/products/${product.id}`, product)

      const registerProductForm = new FormData()
      registerProductForm.append('product_id', product.id!)

      product.product_images.map((image) => {
        if(!image.id){
          const fileExtension = image.path.split('.').pop()

          const imageObject = {
            name: `${product.name}.${fileExtension}`.toLowerCase().replace(/\s/g,''),
            uri: image.path,
            type: `image/${fileExtension}`
          } as any

          registerProductForm.append('images', imageObject)
        }
      })

      if(registerProductForm.getAll('images').length > 0) {
        await api.post('/products/images', registerProductForm, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: progressEvent => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total!)
            setUploadPercentage(percentCompleted)
          },
        })
      }

      setUploadPercentage(0)

      if(removedImages.length > 0) {
        await api.delete('products/images', { data: {productImagesIds: removedImages}})
      }

      toast.show({
        title: 'Anúncio atualizado com sucesso.',
        placement: 'top',
        bgColor: 'blue.500'
      })

      navigation.navigate("appTabRoutes")

    } catch (error) {    
      setUploadPercentage(0)

      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi atualizar o anúncio. Tente novamente mais tarde.'

      if(isAppError) {
        toast.show({
          title,
          placement: 'top',
          bgColor: 'red.500'
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.blue[400] }} >
      <VStack flex={1} bg="gray.200">
        <Center bg="blue.400">
          <Heading 
            pt={2}
            fontFamily="heading"
            fontSize="md"
            color="gray.100"
          >
            Pré visualização do anúncio
          </Heading>
          <Text 
            pb={4}
            fontSize="sm"
            color="gray.100"
          >
            É assim que seu produto vai aparecer!
          </Text>
        </Center>

        <AdView
         user={user}
         product={product}
        />

        <HStack 
          bg="gray.100" 
          pt={5} 
          pb={6}
          px={6} 
          alignItems="center" 
          space={3}
        >
          <Button
            flex={1}
            variant="tertiary"
            icon="ArrowLeft"
            title="Voltar e editar"
            onPress={handleGoBack}
          />
          <Button
            flex={1}
            icon="Tag"
            title={product.id ? "Atualizar" : "Publicar"}
            onPress={product.id ? handleUpdate : handlePublish}
            isLoading={isLoading}
          />
        </HStack>
      </VStack>
      <Modal isOpen={uploadPercentage > 0}>
        <Modal.Content>
          <Modal.Body bg="gray.200">
            <Center>
              <Heading> {uploadPercentage}% </Heading>
              <Box w="100%" maxW="400" mt={4}>
                <Progress value={uploadPercentage} mx="4" colorScheme={"darkBlue"} bg="gray.400"/>
              </Box>
            </Center>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </SafeAreaView>
  )
}
